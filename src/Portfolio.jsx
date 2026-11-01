import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GITHUB_URL, GH_USERNAME, LINKEDIN_URL, STATIC_REPOS, groupByDomain } from "./data";
import { calmNow } from "./lib/hooks";
import { useGithubProfile, useGithubRepos } from "./lib/github";
import { startCritters } from "./lib/critters";

import Boot from "./components/Boot";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Featured from "./components/Featured";
import Experience from "./components/Experience";
import Repos from "./components/Repos";
import Links from "./components/Links";
import Footer, { BackToTop } from "./components/Footer";
import Terminal from "./components/Terminal";
import ResumePage from "./components/ResumePage";

/* ---------- routing: just home and /resume, using the hash so it survives
   a refresh on any static host (GitHub Pages included) ---------- */

const RESUME_HASH = "#/resume";
const readRoute = () => (window.location.hash === RESUME_HASH ? "resume" : "home");

/* ---------- document title + social meta ---------- */

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function useDocumentMeta(route) {
  useEffect(() => {
    const resume = route === "resume";
    const title = resume
      ? "Resume — Robinson George Arysseril"
      : "Robinson George Arysseril — Systems & Intelligence";
    const description = resume
      ? "Download a role-tailored resume for Robinson George Arysseril: systems & embedded, software engineering, machine learning, or data science."
      : "Portfolio of Robinson George Arysseril: bare-metal kernels, cycle-accurate emulators, and NLP research, built from the register up and the model down.";

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let ld = document.getElementById("rga-person-ld");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "rga-person-ld";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Robinson George Arysseril",
      url: GITHUB_URL,
      sameAs: [GITHUB_URL, LINKEDIN_URL],
      jobTitle: "Systems & AI Engineer",
      alumniOf: "Vimal Jyothi Engineering College",
    });
  }, [route]);
}

/* ---------- boot only once per browser session ---------- */

const BOOT_KEY = "rga:booted";
function shouldBoot() {
  if (calmNow() || readRoute() !== "home") return false;
  try {
    return !window.sessionStorage.getItem(BOOT_KEY);
  } catch {
    return true;
  }
}

/* ========================================================================= */

export default function Portfolio() {
  const [route, setRoute] = useState(readRoute);
  const [phase, setPhase] = useState(() => (shouldBoot() ? "boot" : "ready"));
  const [query, setQuery] = useState("");
  const [termOpen, setTermOpen] = useState(false);
  const [active, setActive] = useState("");
  const critters = useRef(null);

  const repoState = useGithubRepos(GH_USERNAME);
  const profileState = useGithubProfile(GH_USERNAME);

  // Live data when we have it, the saved list from the original site otherwise.
  const repos = repoState.status === "ready" ? repoState.repos : STATIC_REPOS;
  const groups = useMemo(() => groupByDomain(repos), [repos]);

  useDocumentMeta(route);

  /* ----- route changes (back/forward, manual hash edits) ----- */
  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const goToResume = useCallback(() => {
    setTermOpen(false);
    window.location.hash = RESUME_HASH; // fires hashchange -> setRoute
    setRoute("resume");
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setRoute("home");
    window.scrollTo(0, 0);
  }, []);

  /* ----- scrolling to sections (also works from the resume page) ----- */
  const scrollTo = (id) => {
    if (id === "top") window.scrollTo({ top: 0, behavior: calmNow() ? "auto" : "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: calmNow() ? "auto" : "smooth" });
  };
  const go = useCallback(
    (id) => {
      if (route !== "home") {
        goHome();
        setTimeout(() => scrollTo(id), 80);
      } else scrollTo(id);
    },
    [route, goHome],
  );

  /* ----- boot ----- */
  const finishBoot = useCallback(() => {
    try {
      window.sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("ready");
  }, []);

  /* ----- sprite + bug start once the page is visible ----- */
  useEffect(() => {
    if (phase !== "ready") return;
    const api = startCritters();
    critters.current = api;
    return () => {
      api.destroy();
      critters.current = null;
    };
  }, [phase]);

  /* ----- keyboard: / opens the terminal, Esc closes it ----- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setTermOpen(false);
      else if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.activeElement;
        const typing = el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
        if (!typing) {
          e.preventDefault();
          setTermOpen(true);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ----- highlight the nav item for the section in view ----- */
  useEffect(() => {
    if (route !== "home" || phase !== "ready") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [route, phase]);

  const openTerminal = useCallback(() => setTermOpen(true), []);
  const closeTerminal = useCallback(() => setTermOpen(false), []);

  return (
    <>
      {phase === "boot" && <Boot onDone={finishBoot} />}

      {phase === "ready" &&
        (route === "resume" ? (
          <ResumePage onBack={goHome} onTerminal={openTerminal} />
        ) : (
          <>
            <Nav active={active} onGo={go} onResume={goToResume} onTerminal={openTerminal} />
            <main>
              <Hero onGo={go} onResume={goToResume} />
              <Marquee />
              <About repoState={repoState} profileState={profileState} />
              <Featured />
              <Experience />
              <Repos
                repos={repos}
                status={repoState.status}
                error={repoState.error}
                query={query}
                setQuery={setQuery}
              />
              <Links onResume={goToResume} />
            </main>
            <Footer onTerminal={openTerminal} />
          </>
        ))}

      <Terminal
        open={termOpen}
        onClose={closeTerminal}
        groups={groups}
        crittersRef={critters}
        setQuery={setQuery}
        onGoto={go}
        onResume={goToResume}
      />
      <BackToTop />
    </>
  );
}
