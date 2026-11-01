import { useState } from "react";
import { FEATURED, asset } from "../data";
import { calmNow } from "../lib/hooks";
import TypeTitle from "./TypeTitle";

/** Screen recording that tilts toward the cursor. Falls back to text if the clip is missing. */
function Media({ video, fallback }) {
  const [state, setState] = useState(video ? "loading" : "none");

  const tilt = (e) => {
    if (calmNow()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };
  const reset = (e) => (e.currentTarget.style.transform = "");

  return (
    <div className="media" onPointerMove={tilt} onPointerLeave={reset}>
      {video && state !== "error" && (
        <video
          src={asset(video)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedData={() => setState("ok")}
          onError={() => setState("error")}
        />
      )}
      {state !== "ok" && <span>{fallback}</span>}
    </div>
  );
}

export default function Featured() {
  return (
    <section id="featured">
      <div className="wrap">
        <TypeTitle>Featured</TypeTitle>
        <p className="sub">
          Built from datasheets, technical manuals and research papers rather than tutorials: kernels,
          cartridges, real-time signal pipelines and trained models.
        </p>
        {FEATURED.map((p) => (
          <article className="feat" key={p.id}>
            <div className="txt">
              <h3>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              <p>{p.description}</p>
              <div className="meta">{p.meta}</div>
            </div>
            <Media video={p.video} fallback={p.video ?? p.url.replace(/^https?:\/\//, "")} />
          </article>
        ))}
      </div>
    </section>
  );
}
