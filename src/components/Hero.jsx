import { useEffect, useRef, useState } from "react";
import { calmNow } from "../lib/hooks";

const LINES = ["systems programmer", "emulators, JITs, operating systems", "embedded + machine learning"];

function Typewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    if (calmNow()) {
      setText(LINES.join(" / "));
      return;
    }
    let l = 0;
    let c = 0;
    let del = false;
    let id;
    const tick = () => {
      const w = LINES[l];
      c += del ? -1 : 1;
      setText(w.slice(0, c));
      let d = del ? 25 : 60;
      if (!del && c === w.length) {
        del = true;
        d = 1600;
      } else if (del && c === 0) {
        del = false;
        l = (l + 1) % LINES.length;
        d = 300;
      }
      id = setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(id);
  }, []);

  return (
    <p className="tw">
      <span className="sr-only">Systems programmer. Emulators, operating systems, embedded and ML.</span>
      <span aria-hidden="true">{text}</span>
    </p>
  );
}

/** CHIP-8 style pixel field: pixels light up under the cursor and fade; click sends a ring. */
function PixelField() {
  const ref = useRef(null);

  useEffect(() => {
    if (calmNow()) return;
    const cv = ref.current;
    const hero = cv.parentElement;
    const cx = cv.getContext("2d");
    const S = 20;
    let W, H, cols, rows, I;
    let mx = -1;
    let my = -1;
    let rip = [];
    let vis = true;
    let raf;

    const size = () => {
      H = cv.height = hero.getBoundingClientRect().height;
      W = cv.width = innerWidth;
      cols = Math.ceil(W / S);
      rows = Math.ceil(H / S);
      I = new Float32Array(cols * rows);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(hero);

    const rel = (e) => ({ x: e.clientX, y: e.clientY - hero.getBoundingClientRect().top });
    const move = (e) => {
      const p = rel(e);
      mx = p.x;
      my = p.y;
    };
    const leave = () => (mx = -1);
    const down = (e) => rip.push({ ...rel(e), r: 0 });
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    hero.addEventListener("pointerdown", down);

    const io = new IntersectionObserver((e) => (vis = e[0].isIntersecting));
    io.observe(hero);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      for (let i = 0; i < 6; i++) I[(Math.random() * I.length) | 0] = 0.3;
      if (mx >= 0) {
        const c = (mx / S) | 0;
        const r = (my / S) | 0;
        for (let dy = -3; dy <= 3; dy++)
          for (let dx = -3; dx <= 3; dx++) {
            const x = c + dx;
            const y = r + dy;
            if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
            const v = 1 - Math.hypot(dx, dy) / 4;
            if (v > 0 && Math.random() < 0.7) I[y * cols + x] = Math.max(I[y * cols + x], v);
          }
      }
      rip.forEach((p) => {
        p.r += 14;
        for (let a = 0; a < 6.28; a += 0.04) {
          const x = ((p.x + Math.cos(a) * p.r) / S) | 0;
          const y = ((p.y + Math.sin(a) * p.r) / S) | 0;
          if (x >= 0 && y >= 0 && x < cols && y < rows) I[y * cols + x] = 1;
        }
      });
      rip = rip.filter((p) => p.r < 900);
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const k = y * cols + x;
          const v = I[k];
          if (v > 0.02) {
            cx.globalAlpha = v * 0.4;
            cx.fillRect(x * S + 2, y * S + 2, S - 4, S - 4);
            I[k] = v * 0.92;
          }
        }
      cx.globalAlpha = 1;
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointerdown", down);
    };
  }, []);

  return <canvas id="px" ref={ref} aria-hidden="true" />;
}

export default function Hero({ onGo, onResume }) {
  return (
    <div className="wrap">
      <header className="hero">
        <PixelField />
        <h1>
          Robinson
          <br />
          George <i>Arysseril</i>
        </h1>
        <Typewriter />
        <p className="lede">
          I'm a student who loves everything computers. I write low-level code, build emulators and
          operating systems, and maintain tools used by tens of thousands of Chromebook owners.
        </p>
        <div className="cta">
          <button type="button" className="btn main" onClick={() => onGo("featured")}>
            See my projects
          </button>
          <button type="button" className="btn" onClick={() => onGo("links")}>
            Find me online
          </button>
          <button type="button" className="btn" onClick={onResume}>
            Resume
          </button>
        </div>
      </header>
    </div>
  );
}
