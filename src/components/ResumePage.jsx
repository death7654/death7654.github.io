import { useEffect, useRef, useState } from "react";
import { EMAIL, RESUME_VARIANTS, asset } from "../data";
import Footer from "./Footer";

/**
 * Downloads a PDF through a real button. It fetches the file first and checks it is
 * actually a PDF, so a missing file shows a message instead of saving an HTML error page.
 */
function DownloadButton({ variant }) {
  const [state, setState] = useState("idle"); // idle | busy | done | missing
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const run = async () => {
    setState("busy");
    try {
      const res = await fetch(asset(variant.url));
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.includes("pdf")) throw new Error("missing");
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = variant.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 4000);
      setState("done");
      timer.current = setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("missing");
    }
  };

  return (
    <>
      <button type="button" className="btn main" onClick={run} disabled={state === "busy"}>
        {state === "busy" ? "Fetching…" : state === "done" ? "Saved ✓" : "Download"}
      </button>
      {state === "missing" && (
        <p className="status" role="status">
          That PDF isn't uploaded yet. Email me and I'll send it directly.
        </p>
      )}
    </>
  );
}

export default function ResumePage({ onBack, onTerminal }) {
  return (
    <>
      <nav aria-label="Resume">
        <div className="wrap">
          <b>~/robinson/resume</b>
          <button type="button" className="nv" onClick={onBack}>
            ← Back to portfolio
          </button>
          <button type="button" id="tbtn" className="chip" aria-label="Open terminal" onClick={onTerminal}>
            &gt;_<span className="lbl"> terminal</span>
          </button>
        </div>
      </nav>

      <main className="rpage">
        <div className="wrap">
          <header className="hero">
            <h1>
              Four resumes, <i>one engineer.</i>
            </h1>
            <p className="lede">
              Same experience, weighted differently depending on the role. Pick whichever matches what
              you're hiring for, or grab them all.
            </p>
          </header>

          <div className="rgrid">
            {RESUME_VARIANTS.map((v) => (
              <article className="rcard" key={v.key}>
                <h3>{v.label}</h3>
                <p>{v.description}</p>
                <div className="foot">
                  <span className="fn">{v.fileName}</span>
                  <DownloadButton variant={v} />
                </div>
              </article>
            ))}
          </div>

          <div className="actions" style={{ paddingBottom: 72 }}>
            <span className="sub" style={{ margin: 0 }}>
              Not sure which one?
            </span>
            <button
              type="button"
              className="btn"
              onClick={() => {
                window.location.href = `mailto:${EMAIL}`;
              }}
            >
              Email me
            </button>
          </div>
        </div>
      </main>
      <Footer onTerminal={onTerminal} />
    </>
  );
}
