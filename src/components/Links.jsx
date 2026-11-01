import { useEffect, useRef, useState } from "react";
import { EMAIL, LINKS } from "../data";
import { hoverAccent, unhoverAccent } from "../lib/accent";
import TypeTitle from "./TypeTitle";

const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / insecure contexts: fall back to a hidden textarea.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * The bottom section. Every control here is a real <button>:
 * the three profile cards open in a new tab and recolor the page on hover / focus,
 * and the action row emails, copies the address, or opens the resume page.
 */
export default function Links({ onResume }) {
  const [copy, setCopy] = useState("idle"); // idle | ok | fail
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const doCopy = async () => {
    setCopy((await copyText(EMAIL)) ? "ok" : "fail");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 2200);
  };

  return (
    <section id="links">
      <div className="wrap">
        <TypeTitle>Links</TypeTitle>
        <p className="sub">Hover one and the whole page takes its color. Let's build something that ships.</p>

        <div className="links">
          {LINKS.map((l) => (
            <button
              key={l.name}
              type="button"
              className="lk"
              data-c={l.color}
              onClick={() => openExternal(l.url)}
              onMouseEnter={() => hoverAccent(l.color)}
              onFocus={() => hoverAccent(l.color)}
              onMouseLeave={unhoverAccent}
              onBlur={unhoverAccent}
            >
              <strong>{l.name}</strong>
              <span className="h">{l.handle}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </button>
          ))}
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn main"
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
            }}
          >
            Email me
          </button>
          <button type="button" className="btn" onClick={doCopy}>
            {copy === "ok" ? "Copied ✓" : "Copy email"}
          </button>
          <button type="button" className="btn" onClick={onResume}>
            Resume
          </button>
          <span className={`status${copy === "fail" ? " err" : ""}`} role="status" aria-live="polite">
            {copy === "ok" && EMAIL}
            {copy === "fail" && `couldn't copy, it's ${EMAIL}`}
          </span>
        </div>
      </div>
    </section>
  );
}
