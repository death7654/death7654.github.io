import { useEffect, useState } from "react";

/* =========================================================================
   Pull a representative image for a GitHub repo, in this order:

     1. the first real screenshot in the repo's README (badges are skipped)
     2. GitHub's generated social-preview card for the repo

   Both come from raw.githubusercontent.com / opengraph.githubassets.com,
   which are CDNs, not the REST API, so they don't touch the 60/hour limit.
   The result is cached in localStorage for a day.
   ========================================================================= */

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_TRIES = 4;

const cacheKey = (owner, repo) => `rga:img:${owner}/${repo}`;

function readCache(key) {
  try {
    const v = JSON.parse(window.localStorage.getItem(key) || "null");
    return v && Date.now() - v.savedAt < TTL_MS ? v.src : null;
  } catch {
    return null;
  }
}
function writeCache(key, src) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ src, savedAt: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function parseRepo(url) {
  const m = (url || "").match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, "") } : null;
}

/** Forget a cached image (called when the <img> fails to load). */
export function forgetRepoImage(url) {
  const r = parseRepo(url);
  if (!r) return;
  try {
    window.localStorage.removeItem(cacheKey(r.owner, r.repo));
  } catch {
    /* ignore */
  }
}

/* ---------- README parsing ---------- */

const NOT_A_SCREENSHOT =
  /shields\.io|badge|badgen|codecov|travis|circleci|actions\/workflows|visitor|hits\.|komarev|star-history|contrib\.rocks|capsule-render|readme-stats|buymeacoffee|ko-fi|\.(mp4|webm|mov)(\?|$)/i;

function extractImageUrls(md) {
  const found = [];
  const mdImg = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g;
  const htmlImg = /<img\b[^>]*?\bsrc=["']([^"']+)["']/gi;
  for (const re of [mdImg, htmlImg]) {
    let m;
    while ((m = re.exec(md))) found.push({ at: m.index, url: m[1] });
  }
  return found.sort((a, b) => a.at - b.at).map((f) => f.url);
}

function resolveUrl(raw, { owner, repo }) {
  let u = raw.trim();
  if (u.startsWith("//")) return `https:${u}`;
  if (/^https?:\/\//i.test(u)) {
    // github.com/o/r/blob/branch/path  ->  raw.githubusercontent.com/o/r/branch/path
    const blob = u.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+?)(?:\?.*)?$/i);
    return blob ? `https://raw.githubusercontent.com/${blob[1]}/${blob[2]}/${blob[3]}` : u;
  }
  u = u.replace(/^\.?\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${encodeURI(decodeURI(u))}`;
}

function canLoad(src) {
  return new Promise((resolve) => {
    const img = new Image();
    const done = (ok) => {
      clearTimeout(t);
      img.onload = img.onerror = null;
      resolve(ok);
    };
    const t = setTimeout(() => done(false), 7000);
    img.onload = () => done(true);
    img.onerror = () => done(false);
    img.src = src;
  });
}

async function fetchReadme(owner, repo) {
  for (const name of ["README.md", "readme.md", "Readme.md"]) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${name}`);
      if (res.ok) return await res.text();
    } catch {
      /* try the next name */
    }
  }
  return "";
}

async function findImage(repoInfo) {
  const { owner, repo } = repoInfo;
  const md = await fetchReadme(owner, repo);
  const candidates = extractImageUrls(md)
    .filter((u) => !NOT_A_SCREENSHOT.test(u))
    .map((u) => resolveUrl(u, repoInfo))
    .slice(0, MAX_TRIES);

  for (const src of candidates) {
    if (await canLoad(src)) return { src, kind: "readme" };
  }
  const card = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
  if (await canLoad(card)) return { src: card, kind: "card" };
  return null;
}

/**
 * useRepoImage(repoUrl, enabled) -> { status: "idle"|"loading"|"ready"|"none", src, kind }
 * Does nothing until `enabled` is true (so repos with a working video never hit the network).
 */
export function useRepoImage(repoUrl, enabled) {
  const [state, setState] = useState({ status: "idle", src: null, kind: null });

  useEffect(() => {
    if (!enabled) return;
    const info = parseRepo(repoUrl);
    if (!info) {
      setState({ status: "none", src: null, kind: null });
      return;
    }
    const key = cacheKey(info.owner, info.repo);
    const hit = readCache(key);
    if (hit) {
      setState({ status: "ready", src: hit, kind: "cached" });
      return;
    }

    let cancelled = false;
    setState({ status: "loading", src: null, kind: null });
    findImage(info).then((found) => {
      if (cancelled) return;
      if (found) {
        writeCache(key, found.src);
        setState({ status: "ready", ...found });
      } else setState({ status: "none", src: null, kind: null });
    });
    return () => {
      cancelled = true;
    };
  }, [repoUrl, enabled]);

  return state;
}
