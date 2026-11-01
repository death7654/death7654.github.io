import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES, setTheme } from "../lib/accent";

const SECTIONS = ["about", "featured", "experience", "repos", "links"];

/** Press / anywhere (or use the nav button) to open. Esc closes. */
export default function Terminal({ open, onClose, groups, crittersRef, setQuery, onGoto, onResume }) {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const hist = useRef([]);
  const hi = useRef(0);
  const uid = useRef(0);
  const seeded = useRef(false);
  const inRef = useRef(null);
  const outRef = useRef(null);
  const lastFocus = useRef(null);

  const say = useCallback((t, c) => setLines((l) => [...l, { id: uid.current++, t, c }]), []);

  // focus handling + first-open hint
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      if (!seeded.current) {
        seeded.current = true;
        say("type help for commands. esc closes.");
      }
      inRef.current?.focus();
    } else if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, [open, say]);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const all = groups.flatMap((g) => g.repos);
  const cr = () => crittersRef.current;

  const cmds = {
    help: () =>
      say(
        "ls [n] | open <repo> | goto <about|featured|experience|repos|links|top> | search <text> | theme <github|linkedin|instagram|pink|mint|reset> | resume | mess (call the bug) | fix (call the fixer) | stats | strike | sprite (hide/show both) | whoami | clear | exit",
      ),
    ls: (a) => {
      if (!a) groups.forEach((g, i) => say(`${i + 1}  ${g.label} (${g.repos.length})`));
      else {
        const g = groups[Number(a) - 1];
        if (g) g.repos.forEach((r) => say(r.name));
        else say("no such group. run ls");
      }
    },
    open: (a) => {
      const r = all.find((x) => x.name.toLowerCase() === (a || "").toLowerCase());
      if (r) {
        say("opening " + r.name);
        window.open(r.url, "_blank", "noopener,noreferrer");
      } else say("repo not found. run ls n to see names");
    },
    goto: (a) => {
      if (a === "top" || SECTIONS.includes(a)) {
        onClose();
        onGoto(a);
      } else say("sections: " + SECTIONS.join(" ") + " top");
    },
    search: (a) => {
      setQuery(a || "");
      onClose();
      onGoto("repos");
    },
    theme: (a) => {
      if (a === "reset") {
        setTheme("");
        say("theme reset");
      } else if (THEMES[a]) {
        setTheme(THEMES[a]);
        say("accent set to " + a);
      } else say("themes: " + Object.keys(THEMES).join(" ") + " reset");
    },
    resume: () => {
      onClose();
      onResume();
    },
    whoami: () => say("robinson george arysseril. systems programmer, B.Tech AI & DS, Chrultrabook contributor."),
    strike: () => {
      cr()?.strike();
      say("tak!");
    },
    eskrima: () => {
      cr()?.strike();
      say("tak tak!");
    },
    sprite: () => say(cr()?.toggle() ? "sprites hidden" : "sprites are back"),
    mess: () => {
      cr()?.mess();
      onClose();
    },
    fix: () => {
      cr()?.fix();
      onClose();
    },
    stats: () => {
      const s = cr()?.stats();
      if (s)
        say(`bugs squashed: ${s.squashed} | missed swings: ${s.missed} | things broken: ${s.broken} | things fixed: ${s.fixed}`);
    },
    clear: () => setLines([]),
    exit: () => onClose(),
  };

  const run = (raw) => {
    const [c, ...r] = raw.split(/\s+/);
    const k = c.toLowerCase();
    if (Object.hasOwn(cmds, k)) cmds[k](r.join(" "));
    else say(`unknown command: ${c}. try help`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const v = value.trim();
      setValue("");
      if (!v) return;
      hist.current.push(v);
      hi.current = hist.current.length;
      say("$ " + v, "u");
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      hi.current = Math.max(0, hi.current - 1);
      setValue(hist.current[hi.current] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hi.current = Math.min(hist.current.length, hi.current + 1);
      setValue(hist.current[hi.current] || "");
    }
  };

  return (
    <div
      id="term"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="tbox">
        <div id="tout" ref={outRef} aria-live="polite">
          {lines.map((l) => (
            <div key={l.id} className={l.c}>
              {l.t}
            </div>
          ))}
        </div>
        <div className="trow">
          <span aria-hidden="true">$</span>
          <input
            id="tin"
            ref={inRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Command"
          />
        </div>
      </div>
    </div>
  );
}
