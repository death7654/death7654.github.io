import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <button
      type="button"
      className={`totop${show ? " show" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}

export default function Footer({ onTerminal }) {
  return (
    <footer>
      <div className="wrap">
        <span>Robinson George Arysseril · death7654.github.io · press / for the terminal</span>
        <button type="button" className="chip" onClick={onTerminal}>
          &gt;_ terminal
        </button>
      </div>
    </footer>
  );
}
