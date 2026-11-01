import { useMemo, useState } from "react";
import { DOMAIN_LIST, GITHUB_URL, GH_USERNAME, groupByDomain } from "../data";
import TypeTitle from "./TypeTitle";

/**
 * Repositories grouped by category. `repos` is whatever list the parent decided to show
 * (live GitHub data, or the saved static list while loading / offline).
 */
export default function Repos({ repos, status, error, query, setQuery }) {
  const [lang, setLang] = useState("");
  const [domain, setDomain] = useState("");
  const [open, setOpen] = useState(() => new Set(["emu"]));

  const langs = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [repos],
  );

  const t = query.trim().toLowerCase();
  const filtering = Boolean(t || lang || domain);

  const groups = useMemo(() => {
    const filtered = repos.filter(
      (r) =>
        (!lang || r.language === lang) &&
        (!domain || r.domain === domain) &&
        (!t || `${r.name} ${r.description}`.toLowerCase().includes(t)),
    );
    return groupByDomain(filtered);
  }, [repos, lang, domain, t]);

  const total = groups.reduce((n, g) => n + g.repos.length, 0);

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  let note = null;
  if (status === "loading") note = { text: "fetching the live list from github, showing the saved one meanwhile…" };
  else if (status === "error")
    note = {
      err: true,
      text:
        error === "rate_limit"
          ? "github's anonymous rate limit was hit, showing the saved list."
          : "couldn't reach the github api, showing the saved list.",
    };

  return (
    <section id="repos">
      <div className="wrap">
        <TypeTitle>Repositories</TypeTitle>
        <p className="sub">
          Everything on{" "}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            github.com/{GH_USERNAME}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          , grouped by what it does. Open a group, or search across all of them.
        </p>

        <div className="tools">
          <input
            id="q"
            type="search"
            placeholder="Search repos or descriptions"
            aria-label="Search repositories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="tools" role="group" aria-label="Filter by category">
          <span className="lab">category</span>
          <button type="button" className="chip" aria-pressed={domain === ""} onClick={() => setDomain("")}>
            All
          </button>
          {DOMAIN_LIST.map((d) => (
            <button
              key={d.key}
              type="button"
              className="chip"
              aria-pressed={domain === d.key}
              onClick={() => setDomain(domain === d.key ? "" : d.key)}
            >
              <span className="dot" style={{ background: d.hex }} aria-hidden="true" />
              {d.short}
            </button>
          ))}
        </div>

        <div className="tools" role="group" aria-label="Filter by language">
          <span className="lab">language</span>
          <button type="button" className="chip" aria-pressed={lang === ""} onClick={() => setLang("")}>
            All
          </button>
          {langs.map((l) => (
            <button
              key={l}
              type="button"
              className="chip"
              aria-pressed={lang === l}
              onClick={() => setLang(lang === l ? "" : l)}
            >
              {l}
            </button>
          ))}
        </div>

        <p className={`note${note?.err ? " err" : ""}`} aria-live="polite">
          {total} {total === 1 ? "repository" : "repositories"}
          {note ? ` · ${note.text}` : ""}
        </p>

        <div id="segs">
          {groups.length === 0 ? (
            <div className="empty">No repo matches. Clear the search or pick All.</div>
          ) : (
            groups.map((g) => {
              const isOpen = filtering || open.has(g.key);
              return (
                <div className={`seg${isOpen ? " open" : ""}`} key={g.key}>
                  <button type="button" aria-expanded={isOpen} onClick={() => toggle(g.key)}>
                    <span className="addr">0x{(g.index * 0x1000).toString(16).padStart(4, "0")}</span>
                    <span className="gt">{g.label}</span>
                    <span className="cnt">{g.repos.length}</span>
                    <span className="tog" aria-hidden="true">
                      &gt;
                    </span>
                  </button>
                  <ul>
                    {g.repos.map((r) => (
                      <li key={r.id}>
                        <a className="repo" href={r.url} target="_blank" rel="noopener noreferrer">
                          <b>{r.name}</b>
                          <span className="d">{r.description || "No description yet."}</span>
                          <span className="l">{r.language || ""}</span>
                          <span className="s">{r.stars > 0 ? `★ ${r.stars}` : ""}</span>
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
