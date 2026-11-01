import { useEffect, useMemo, useState } from "react";
import { inferDomain } from "../data";

/* ---------- tiny stale-while-revalidate cache ---------- */

const CACHE_TTL_MS = 20 * 60 * 1000;

function readCache(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.savedAt !== "number") return null;
    return { data: parsed.data, isStale: Date.now() - parsed.savedAt > CACHE_TTL_MS };
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    /* private mode / quota: the cache is a nicety, not a requirement */
  }
}

const HEADERS = { Accept: "application/vnd.github.v3+json" };

const fail = (res) => new Error(res.status === 403 ? "rate_limit" : `http_${res.status}`);

/* ---------- repos ---------- */

export function useGithubRepos(username) {
  const cacheKey = `rga:repos:${username}`;
  const cached = useMemo(() => readCache(cacheKey), [cacheKey]);

  const [state, setState] = useState(() =>
    cached
      ? { status: "ready", ...cached.data, error: null }
      : { status: "loading", repos: [], totalStars: 0, totalForks: 0, error: null },
  );

  useEffect(() => {
    if (cached && !cached.isStale) return;
    let cancelled = false;

    (async () => {
      try {
        let all = [];
        for (let page = 1; page <= 5; page++) {
          const res = await fetch(
            `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
            { headers: HEADERS },
          );
          if (!res.ok) throw fail(res);
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          all = all.concat(data);
          if (data.length < 100) break;
        }

        // Paginating sorted-by-updated can repeat a repo across pages.
        const seen = new Set();
        all = all.filter((r) => (seen.has(r.id) ? false : seen.add(r.id)));

        // Totals count every owned repo; the list shows original work only.
        const totalStars = all.reduce((n, r) => n + (r.stargazers_count || 0), 0);
        const totalForks = all.reduce((n, r) => n + (r.forks_count || 0), 0);

        const repos = all
          .filter((r) => !r.fork)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || "",
            language: r.language,
            domain: inferDomain({
              name: r.name,
              description: r.description,
              topics: r.topics,
              language: r.language,
            }),
            stars: r.stargazers_count || 0,
            url: r.html_url,
          }))
          .sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));

        if (cancelled) return;
        setState({ status: "ready", repos, totalStars, totalForks, error: null });
        writeCache(cacheKey, { repos, totalStars, totalForks });
      } catch (err) {
        if (cancelled) return;
        if (cached) setState({ status: "ready", ...cached.data, error: null });
        else setState({ status: "error", repos: [], totalStars: 0, totalForks: 0, error: err.message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username, cacheKey, cached]);

  return state;
}

/* ---------- profile (followers) ---------- */

export function useGithubProfile(username) {
  const cacheKey = `rga:profile:${username}`;
  const cached = useMemo(() => readCache(cacheKey), [cacheKey]);

  const [state, setState] = useState(() =>
    cached
      ? { status: "ready", profile: cached.data, error: null }
      : { status: "loading", profile: null, error: null },
  );

  useEffect(() => {
    if (cached && !cached.isStale) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, { headers: HEADERS });
        if (!res.ok) throw fail(res);
        const data = await res.json();
        const profile = { followers: data.followers || 0, publicRepos: data.public_repos || 0 };
        if (cancelled) return;
        setState({ status: "ready", profile, error: null });
        writeCache(cacheKey, profile);
      } catch (err) {
        if (cancelled) return;
        if (cached) setState({ status: "ready", profile: cached.data, error: null });
        else setState({ status: "error", profile: null, error: err.message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username, cacheKey, cached]);

  return state;
}
