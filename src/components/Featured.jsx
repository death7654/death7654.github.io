import { useState } from "react";
import { FEATURED, asset } from "../data";
import { calmNow } from "../lib/hooks";
import { forgetRepoImage, useRepoImage } from "../lib/repoImage";
import TypeTitle from "./TypeTitle";

/**
 * Project media, shown whole (never cropped). Order of preference:
 *   1. the local screen recording (.mp4) or animated image (.gif/.webp), if there is one and it loads
 *   2. an image pulled from the project's GitHub repo (README screenshot, else social card)
 *   3. a text placeholder
 * The frame takes the media's own aspect ratio once it is known.
 */
function Media({ video, repoUrl, title, fallback }) {
  // A .gif/.webp can't go in a <video>; play it straight from /assets with an <img>.
  const isAnimatedImage = !!video && /\.(gif|webp|apng)$/i.test(video);
  const [vState, setVState] = useState(video && !isAnimatedImage ? "loading" : "none"); // loading | ok | error | none
  const [localBad, setLocalBad] = useState(false);
  const [imgBad, setImgBad] = useState(false);
  const [ratio, setRatio] = useState(null);

  const showLocalImage = isAnimatedImage && !localBad;
  const needImage = !showLocalImage && (vState === "none" || vState === "error");
  const gh = useRepoImage(repoUrl, needImage);
  const showImage = needImage && gh.status === "ready" && !imgBad;
  const showVideo = video && !isAnimatedImage && vState !== "error";
  const placeholder = !(vState === "ok" || ((showImage || showLocalImage) && ratio));

  const setFrom = (w, h) => w && h && setRatio(w / h);

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
    <div
      className="media"
      style={ratio ? { aspectRatio: String(ratio) } : undefined}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      {showVideo && (
        <video
          src={asset(video)}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            setFrom(e.currentTarget.videoWidth, e.currentTarget.videoHeight);
            setVState("ok");
          }}
          onLoadedData={() => setVState("ok")}
          onCanPlay={() => setVState("ok")}
          onError={() => setVState("error")}
        />
      )}
      {showLocalImage && (
        <img
          src={asset(video)}
          alt={`${title} demo`}
          decoding="async"
          onLoad={(e) => setFrom(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
          onError={() => setLocalBad(true)}
        />
      )}
      {showImage && (
        <img
          src={gh.src}
          alt={`${title} screenshot from GitHub`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={(e) => setFrom(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
          onError={() => {
            forgetRepoImage(repoUrl);
            setImgBad(true);
          }}
        />
      )}
      {placeholder && <span>{fallback}</span>}
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
            <Media video={p.video} repoUrl={p.url} title={p.title} fallback={p.url.replace(/^https?:\/\//, "")} />
          </article>
        ))}
      </div>
    </section>
  );
}