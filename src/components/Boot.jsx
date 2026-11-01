import { useCallback, useEffect, useRef, useState } from "react";
import { BOOT_LINES } from "../data";
import { useCountUp } from "../lib/hooks";

function Progress() {
  const pct = useCountUp(100, true, 750);
  const blocks = Math.min(20, Math.round((pct / 100) * 20));
  return (
    <div className="b-bar">
      {"  rustc  pytorch  tensorflow  xtensa-gcc  scikit-learn  ["}
      <i>{"█".repeat(blocks)}</i>
      {"░".repeat(20 - blocks)}
      {`] ${pct}%`}
    </div>
  );
}

/** Fake kernel boot. Click, press any key, or hit skip to dismiss. */
export default function Boot({ onDone }) {
  const [n, setN] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (n < BOOT_LINES.length) {
      const t = setTimeout(() => setN((v) => v + 1), BOOT_LINES[n].delay ?? 130);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finish, 600);
    return () => clearTimeout(t);
  }, [n, finish]);

  useEffect(() => {
    window.addEventListener("keydown", finish);
    return () => window.removeEventListener("keydown", finish);
  }, [finish]);

  return (
    <div id="boot" role="dialog" aria-label="Boot sequence" onClick={finish}>
      <div className="bl">
        {BOOT_LINES.slice(0, n).map((line, i) =>
          line.tag === "progress" ? (
            <Progress key={i} />
          ) : (
            <div key={i} className={`b-${line.tag}`}>
              {line.text}
            </div>
          ),
        )}
        <span className="cur" aria-hidden="true" />
        <div className="skip">
          <button
            type="button"
            className="chip"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
          >
            skip
          </button>
          <span>or tap anywhere</span>
        </div>
      </div>
    </div>
  );
}
