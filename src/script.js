const GH = "https://github.com/death7654/";
const SEGS = [
  [
    "Emulators & virtual machines",
    [
      ["CHIP8-Emulator-CPP", "Chip8 Emulator built in C++", "C++"],
      ["Chip8-Emulator-Rust", "Chip8 Emulator built in Rust", "Rust"],
      [
        "Gameboy-Emulator-Rust",
        "A cycle accurate Gameboy emulator built in Rust",
        "Rust",
      ],
      ["Intel-8080-Emulator", "A Space Invaders emulator built in C++", "C++"],
      ["NES-Emulator-Rust", "A NES emulator made in Rust", "Rust"],
      ["XO-Chip-Emulator-Zig", "An XO Chip emulator built in Zig", "Zig"],
    ],
  ],
  [
    "Compilers & JIT engines",
    [
      ["BrainFuck-Jit", "A hands-on journey into JIT compilation", "Rust"],
      [
        "Chip8-JIT-Rust",
        "A high-performance CHIP-8 emulator in Rust featuring an x86-64 just-in-time compiler",
        "Rust",
      ],
    ],
  ],
  [
    "Operating systems & low-level",
    [
      [
        "ASCII-Cinema",
        "Terminal movie booking system in C with a hand-written BMP parser",
        "C",
      ],
      [
        "FAT32-Reader-Windows",
        "A FAT32 raw disk parser written in C using Windows-level APIs",
        "C",
      ],
      ["null32", "An operating system for the ESP32 built from scratch", "C"],
      ["GfxLess", "", "Rust"],
      ["Quantization-Engine", "", "Rust"],
    ],
  ],
  [
    "Chromebook ecosystem tools",
    [
      [
        "Chrultrabook-Tools",
        "User-friendly configuration utility for Chromebooks running an alternate OS",
        "TypeScript",
        "117",
      ],
      [
        "Chromebook-Driver-Installer",
        "A one click Windows driver installer for modified Chromebooks",
        "Rust",
        "29",
      ],
      [
        "ChromebookDatabase",
        "General database for Chromebooks and what drivers they require for audio",
        "Rust",
      ],
      [
        "AntiPop-For-Chromebooks",
        "Prevents popping sound when audio starts playing",
        "C++",
      ],
      [
        "chromium-tools",
        "Various Chromium tools for Chromebooks running Linux",
        "",
      ],
      [
        "crosskb-config-generator",
        "A repository to program and test a keyboard remapper for Chromebooks",
        "Rust",
      ],
      ["Driver-Installer-Links", "", ""],
    ],
  ],
  [
    "Machine learning & AI",
    [
      [
        "ML-Algorithms",
        "My implementation of machine learning algorithms without any libraries",
        "C++",
      ],
      [
        "News-Bias-Classifier",
        "Bias detection project using NLP techniques",
        "Jupyter",
      ],
      [
        "Stock-Market-Predictor-ML",
        "A stock market predictor using an LSTM based neural network",
        "Python",
        ,
        1,
      ],
      [
        "Pothole_Detection_ML_Model",
        "A machine learning algorithm to detect potholes",
        "Python",
      ],
    ],
  ],
  [
    "Finance & trading",
    [
      [
        "SentinelDeFi",
        "End-to-end streaming pipeline for detecting anomalous DeFi transactions in real time",
        "Python",
      ],
      ["Stock-Market-Predictor-Frontend", "", "TypeScript"],
    ],
  ],
  [
    "Web apps & frontends",
    [
      [
        "RumbleGuard",
        "An application that uses your phone's mic to cancel out a car's cabin sounds",
        "Rust",
      ],
      ["Cherry-Labs", "A frontend for Gemini built in C#", "C#"],
      ["death7654", "My public profile", ""],
      [
        "death7654.github.io",
        "A website documenting my journey into programming",
        "HTML",
      ],
    ],
  ],
  [
    "Hackathon & misc",
    [["OpenVoice-Open5ox", "A project for FOSSHACK 1.0", "TypeScript"]],
  ],
];
const segs = document.getElementById("segs"),
  chips = document.getElementById("chips"),
  q = document.getElementById("q");
const langs = [
  ...new Set(SEGS.flatMap((s) => s[1].map((r) => r[2])).filter(Boolean)),
].sort();
let lang = "";
const esc = (s) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
chips.innerHTML = ["All", ...langs]
  .map(
    (l) =>
      `<button class="chip" aria-pressed="${l === "All"}" data-l="${l === "All" ? "" : l}">${l}</button>`,
  )
  .join("");
chips.onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  lang = b.dataset.l;
  chips
    .querySelectorAll("button")
    .forEach((x) => x.setAttribute("aria-pressed", x === b));
  render();
};
q.oninput = render;
const open = new Set([0]);
function render() {
  const t = q.value.trim().toLowerCase(),
    filtering = t || lang;
  let total = 0,
    html = "";
  SEGS.forEach((s, i) => {
    const rs = s[1].filter(
      (r) =>
        (!lang || r[2] === lang) &&
        (!t || (r[0] + " " + r[1]).toLowerCase().includes(t)),
    );
    if (!rs.length) return;
    total += rs.length;
    const isOpen = filtering || open.has(i);
    html +=
      `<div class="seg${isOpen ? " open" : ""}" data-i="${i}"><button aria-expanded="${isOpen}"><span class="addr">0x${(i * 0x1000).toString(16).padStart(4, "0")}</span><h3>${s[0]}</h3><span class="cnt">${rs.length}</span><span class="tog">&gt;</span></button><ul>` +
      rs
        .map(
          (r) =>
            `<li><a class="repo" href="${r[4] ? GH + "?tab=repositories" : GH + r[0]}" target="_blank" rel="noopener"><b>${esc(r[0])}</b><span class="d">${esc(r[1] || "No description yet.")}</span><span class="l">${r[2]}</span><span class="s">${r[3] ? "★ " + r[3] : ""}</span></a></li>`,
        )
        .join("") +
      `</ul></div>`;
  });
  segs.innerHTML =
    html ||
    `<div class="empty">No repo matches. Clear the search or pick All.</div>`;
}
segs.onclick = (e) => {
  const b = e.target.closest(".seg>button");
  if (!b) return;
  const s = b.parentElement,
    i = +s.dataset.i;
  open.has(i) ? open.delete(i) : open.add(i);
  s.classList.toggle("open");
  b.setAttribute("aria-expanded", s.classList.contains("open"));
};
render();

/* hero typewriter */
const lines = [
  "systems programmer",
  "emulators, JITs, operating systems",
  "embedded + machine learning",
];
const tw = document.getElementById("tw");
if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
  tw.textContent = lines.join(" / ");
} else {
  let l = 0,
    c = 0,
    del = false;
  (function tick() {
    const w = lines[l];
    c += del ? -1 : 1;
    tw.textContent = w.slice(0, c);
    let d = del ? 25 : 60;
    if (!del && c === w.length) {
      del = true;
      d = 1600;
    } else if (del && c === 0) {
      del = false;
      l = (l + 1) % lines.length;
      d = 300;
    }
    setTimeout(tick, d);
  })();
}

/* section titles type in once as they scroll into view */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target,
        t = el.dataset.type;
      if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
        el.textContent = t;
        return;
      }
      let i = 0;
      (function s() {
        el.innerHTML = t.slice(0, i) + '<span class="c"></span>';
        if (i++ < t.length) setTimeout(s, 55);
        else setTimeout(() => (el.textContent = t), 1500);
      })();
    }),
  { threshold: 0.6 },
);
document.querySelectorAll("[data-type]").forEach((h) => {
  h.dataset.type = h.textContent;
  h.setAttribute("aria-label", h.textContent);
  h.textContent = "";
  io.observe(h);
});

/* videos: hide the placeholder label once a clip loads, drop broken ones */
document.querySelectorAll(".media").forEach((m) => {
  const v = m.querySelector("video"),
    lab = m.querySelector("span");
  v.addEventListener("loadeddata", () => lab.remove());
  v.querySelector("source").addEventListener("error", () => v.remove());
});

/* hero: a CHIP-8 style pixel field. Pixels light up under the cursor and fade; click sends a ring */
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
const cv = document.getElementById("px"),
  hero = cv.parentElement;
if (!calm) {
  const cx = cv.getContext("2d"),
    S = 20;
  let W,
    H,
    cols,
    rows,
    I,
    mx = -1,
    my = -1,
    rip = [],
    vis = true;
  const size = () => {
    H = cv.height = hero.getBoundingClientRect().height;
    W = cv.width = innerWidth;
    cols = Math.ceil(W / S);
    rows = Math.ceil(H / S);
    I = new Float32Array(cols * rows);
  };
  size();
  addEventListener("resize", size);
  const rel = (e) => ({
    x: e.clientX,
    y: e.clientY - hero.getBoundingClientRect().top,
  });
  hero.addEventListener("pointermove", (e) => {
    const p = rel(e);
    mx = p.x;
    my = p.y;
  });
  hero.addEventListener("pointerleave", () => (mx = -1));
  hero.addEventListener("pointerdown", (e) => rip.push({ ...rel(e), r: 0 }));
  new IntersectionObserver((e) => (vis = e[0].isIntersecting)).observe(hero);
  (function f() {
    requestAnimationFrame(f);
    if (!vis) return;
    for (let i = 0; i < 6; i++) I[(Math.random() * I.length) | 0] = 0.3;
    if (mx >= 0) {
      const c = (mx / S) | 0,
        r = (my / S) | 0;
      for (let dy = -3; dy <= 3; dy++)
        for (let dx = -3; dx <= 3; dx++) {
          const x = c + dx,
            y = r + dy;
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
          const v = 1 - Math.hypot(dx, dy) / 4;
          if (v > 0 && Math.random() < 0.7)
            I[y * cols + x] = Math.max(I[y * cols + x], v);
        }
    }
    rip.forEach((p) => {
      p.r += 14;
      for (let a = 0; a < 6.28; a += 0.04) {
        const x = ((p.x + Math.cos(a) * p.r) / S) | 0,
          y = ((p.y + Math.sin(a) * p.r) / S) | 0;
        if (x >= 0 && y >= 0 && x < cols && y < rows) I[y * cols + x] = 1;
      }
    });
    rip = rip.filter((p) => p.r < 900);
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const k = y * cols + x,
          v = I[k];
        if (v > 0.02) {
          cx.globalAlpha = v * 0.4;
          cx.fillRect(x * S + 2, y * S + 2, S - 4, S - 4);
          I[k] = v * 0.92;
        }
      }
    cx.globalAlpha = 1;
  })();
}

/* featured screens tilt toward the cursor */
if (!calm)
  document.querySelectorAll(".media").forEach((m) => {
    m.addEventListener("pointermove", (e) => {
      const r = m.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      m.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    m.addEventListener("pointerleave", () => (m.style.transform = ""));
  });

/* terminal: press / or use the nav button */
const term = document.getElementById("term"),
  tin = document.getElementById("tin"),
  tout = document.getElementById("tout");
const hist = [],
  all = SEGS.flatMap((s) => s[1]),
  themes = {
    github: "#e6edf3",
    linkedin: "#4da3d9",
    instagram: "#e1306c",
    pink: "#ffb3ba",
    mint: "#baffc9",
  };
let hi = 0;
const say = (t, c) => {
  const d = document.createElement("div");
  if (c) d.className = c;
  d.textContent = t;
  tout.appendChild(d);
  tout.scrollTop = tout.scrollHeight;
};
const toggle = (on) => {
  term.hidden = !on;
  if (on) {
    tin.focus();
    if (!tout.children.length) say("type help for commands. esc closes.");
  }
};
document.getElementById("tbtn").onclick = () => toggle(true);
term.onclick = (e) => {
  if (e.target === term) toggle(false);
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggle(false);
  else if (
    e.key === "/" &&
    term.hidden &&
    !/INPUT|TEXTAREA/.test(document.activeElement.tagName)
  ) {
    e.preventDefault();
    toggle(true);
  }
});
const cmds = {
  help: () =>
    say(
      "ls [n] | open <repo> | goto <about|featured|repos|links> | search <text> | theme <github|linkedin|instagram|pink|mint|reset> | mess (call the bug) | fix (call the fixer) | stats | strike | sprite (hide/show both) | whoami | clear | exit",
    ),
  ls: (a) => {
    if (!a) SEGS.forEach((s, i) => say(`${i + 1}  ${s[0]} (${s[1].length})`));
    else {
      const s = SEGS[a - 1];
      s ? s[1].forEach((r) => say(r[0])) : say("no such group. run ls");
    }
  },
  open: (a) => {
    const r = all.find((r) => r[0].toLowerCase() === (a || "").toLowerCase());
    if (r) {
      say("opening " + r[0]);
      window.open(r[4] ? GH : GH + r[0], "_blank", "noopener");
    } else say("repo not found. run ls n to see names");
  },
  goto: (a) => {
    const el = document.getElementById(a);
    if (el && el.tagName === "SECTION") {
      toggle(false);
      el.scrollIntoView();
    } else say("sections: about featured repos links");
  },
  search: (a) => {
    q.value = a || "";
    render();
    toggle(false);
    document.getElementById("repos").scrollIntoView();
  },
  theme: (a) => {
    if (a === "reset") {
      window.__t = "";
      root.style.removeProperty("--accent");
      say("theme reset");
    } else if (themes[a]) {
      window.__t = themes[a];
      root.style.setProperty("--accent", window.__t);
      say("accent set to " + a);
    } else say("themes: " + Object.keys(themes).join(" ") + " reset");
  },
  whoami: () =>
    say(
      "robinson george arysseril. systems programmer, B.Tech AI & DS, Chrultrabook contributor.",
    ),
  strike: () => {
    sprite.st = 14;
    say("tak!");
  },
  eskrima: () => {
    sprite.st = 14;
    say("tak tak!");
  },
  sprite: () => {
    show(off);
    say(off ? "sprites hidden" : "sprites are back");
  },
  mess: () => {
    if (off) show(true);
    bug.spawn(true);
    bug.wait = 0;
    if (bug.mode === "wander") bug.tx = bug.x;
    toggle(false);
  },
  fix: () => {
    if (off) show(true);
    sprite.force = "fix";
    sprite.wait = 0;
    if (sprite.mode === "wander") sprite.tx = sprite.x;
    toggle(false);
  },
  stats: () =>
    say(
      `bugs squashed: ${STAT.squashed} | missed swings: ${STAT.missed} | things broken: ${STAT.broken} | things fixed: ${STAT.fixed}`,
    ),
  clear: () => {
    tout.textContent = "";
  },
  exit: () => toggle(false),
};
tin.onkeydown = (e) => {
  if (e.key === "Enter") {
    const v = tin.value.trim();
    tin.value = "";
    if (!v) return;
    hist.push(v);
    hi = hist.length;
    say("$ " + v, "u");
    const [c, ...r] = v.split(/\s+/),
      k = c.toLowerCase();
    Object.hasOwn(cmds, k)
      ? cmds[k](r.join(" "))
      : say("unknown command: " + c + ". try help");
  } else if (e.key === "ArrowUp") {
    hi = Math.max(0, hi - 1);
    tin.value = hist[hi] || "";
  } else if (e.key === "ArrowDown") {
    hi = Math.min(hist.length, hi + 1);
    tin.value = hist[hi] || "";
  }
};

/* two characters: a bug that breaks things, and an eskrima fighter that hunts it and fixes what it broke */
const rnd = (a, b) => a + Math.random() * (b - a),
  pickOf = (a) => a[(Math.random() * a.length) | 0],
  AC = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
const SEL = ".seg,.lk,.media,.facts>div,.repo,h2,.btn,.chip,.feat .txt",
  messy = new Map();
const HIT_CHANCE = 0.5; /* odds that the fighter's leap actually lands on the bug */
const DODGE_CHANCE = 0.35; /* odds that the bug sees a leap coming and bolts instead of freezing */
const WALL_REACH = 380,
  WALL_HIT_CHANCE = 0.4; /* how high (px above the floor) the fighter can jump up a wall, and his odds of connecting there */
const STAT = { squashed: 0, missed: 0, broken: 0, fixed: 0 };
/* tiny pixel-particle layer: sparks, dust, trails */
const fxc = document.createElement("canvas"),
  fxg = fxc.getContext("2d"),
  PT = [];
let fxDirty = 0;
fxc.style.cssText =
  "position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:3";
document.body.append(fxc);
const fxSize = () => {
  fxc.width = innerWidth;
  fxc.height = innerHeight;
};
fxSize();
addEventListener("resize", fxSize);
const P = (x, y, vx, vy, g, l, c, sz) => {
  if (PT.length < 500) PT.push({ x, y, vx, vy, g, l, m: l, c, s: sz });
};
function burst(x, y, n, cols, sp, sz = 3) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.283,
      v = rnd(0.3, 1) * sp;
    P(
      x,
      y,
      Math.cos(a) * v,
      Math.sin(a) * v - sp * 0.4,
      0.25,
      rnd(22, 42) | 0,
      pickOf(cols),
      sz,
    );
  }
}
function scatter(el, n, cols, up) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < n; i++)
    P(
      r.left + rnd(0, r.width),
      r.top + rnd(0, r.height),
      rnd(-0.6, 0.6),
      up ? rnd(-1.8, -0.5) : rnd(-0.4, 1.2),
      up ? -0.015 : 0.12,
      rnd(24, 44) | 0,
      pickOf(cols),
      up ? 3 : 4,
    );
}
function fxStep() {
  if (!PT.length) {
    if (fxDirty) {
      fxg.clearRect(0, 0, fxc.width, fxc.height);
      fxDirty = 0;
    }
    return;
  }
  fxg.clearRect(0, 0, fxc.width, fxc.height);
  fxDirty = 1;
  for (let i = PT.length - 1; i >= 0; i--) {
    const q = PT[i];
    q.x += q.vx;
    q.y += q.vy;
    q.vy += q.g;
    if (--q.l <= 0) {
      PT.splice(i, 1);
      continue;
    }
    fxg.globalAlpha = Math.min(1, q.l / (q.m * 0.5));
    fxg.fillStyle = q.c;
    fxg.fillRect(q.x | 0, q.y | 0, q.s, q.s);
  }
  fxg.globalAlpha = 1;
}
let off = false;
function speak(a, t, ms = 2200) {
  a.sy.textContent = t;
  a.sy.className = "say on";
  clearTimeout(a.tid);
  a.tid = setTimeout(() => (a.sy.className = "say"), ms);
}
function mess(el, by) {
  el.classList.add("mess");
  const s = Math.random() < 0.5 ? -1 : 1,
    k = Math.random(),
    w = el.getBoundingClientRect().width,
    st = el.style;
  if (k < 0.22) st.rotate = s * rnd(3, 9) + "deg";
  else if (k < 0.42) {
    st.translate = rnd(-34, 34) + "px " + rnd(6, 16) + "px";
    st.rotate = s * rnd(2, 5) + "deg";
  } else if (k < 0.57) {
    st.translate = "0 " + rnd(14, 26) + "px";
    st.rotate = s * rnd(3, 7) + "deg";
  } else if (k < 0.7) {
    st.scale = String(rnd(0.8, 0.93));
    st.rotate = s * rnd(1, 4) + "deg";
  } else if (k < 0.82) st.rotate = w < 260 ? "180deg" : s * rnd(5, 9) + "deg";
  else if (k < 0.92) {
    st.filter = "hue-rotate(" + (rnd(90, 270) | 0) + "deg) saturate(2.4)";
    st.translate = rnd(-14, 14) + "px 0";
    st.rotate = s * rnd(1, 3) + "deg";
  } else {
    st.filter = "blur(2.5px) grayscale(1)";
    st.rotate = s * rnd(1, 3) + "deg";
  }
  messy.set(el, 1);
  STAT.broken++;
  scatter(el, 16, ["#ff5d5d", "#2b1d22", "#fff"], false);
  speak(by, pickOf(["bzzt!", "bug!", "hehe."]));
}
function fix(el, by, quiet) {
  const st = el.style;
  st.rotate = "0deg";
  st.translate = "0 0";
  st.scale = "1";
  st.filter = "none";
  messy.delete(el);
  setTimeout(() => {
    if (messy.has(el)) return;
    el.classList.remove("mess");
    st.rotate = "";
    st.translate = "";
    st.scale = "";
    st.filter = "";
  }, 600);
  if (!quiet) {
    STAT.fixed++;
    scatter(el, 20, [AC(), "#fff"], true);
    speak(by, pickOf(["fixed.", "back in place.", "neat."]));
  }
}
function pick(ok) {
  const v = [...document.querySelectorAll(SEL)].filter((e) => {
    const r = e.getBoundingClientRect();
    return (
      r.width > 40 &&
      r.height > 14 &&
      r.top > 70 &&
      r.top < innerHeight - 110 &&
      r.left >= 0 &&
      r.right <= innerWidth &&
      ok(e)
    );
  });
  return pickOf(v);
}

/* pixel art */
const SP_HEAD = [
    "...hhhhh....",
    "..hhhhhhh...",
    "..hsssss....",
    "..hsesss....",
    "...sssss....",
  ],
  SP_TORSO = ["..aaaaaa....", ".aaaaaaass..", "..aaaaaa...."];
const SP_LEGS = [
  ["..pp..pp....", ".pp....pp...", ".bb....bb..."],
  ["...pppp.....", "...pp.pp....", "...bb.bb...."],
  ["..pppppp....", "..pp..pp....", "..bb..bb...."],
];
const SP_COL = {
  h: "#2b1d22",
  s: "#f1c9a5",
  e: "#130f12",
  p: "#3b4a8c",
  b: "#f6ecee",
};
function plot(g, rows, col) {
  rows.forEach((r, y) =>
    [...r].forEach((c, x) => {
      const f = col[c];
      if (!f) return;
      g.fillStyle = f;
      g.fillRect(x, y, 1, 1);
    }),
  );
}
function drawSprite(g, f, sw, ac) {
  plot(g, [...SP_HEAD, ...SP_TORSO, ...SP_LEGS[f]], { ...SP_COL, a: ac });
  g.fillStyle = "#b5763a";
  if (sw) {
    g.fillRect(10, 6, 4, 1);
    g.fillStyle = "#fff";
    g.fillRect(13, 4, 1, 1);
    g.fillRect(13, 8, 1, 1);
  } else g.fillRect(10, 0, 1, 8);
  g.fillStyle = "#b5763a";
  g.fillRect(0, 5, 1, 3);
}
const BG_BODY = ["........a.", "..rrrrr.a.", ".rrdrdrrr.", ".rrdrdrrwr"],
  BG_LEGS = [
    [".l..l..l..", "l..l..l..."],
    ["..l..l..l.", ".l..l..l.."],
  ];
function drawBug(g, f) {
  plot(g, [...BG_BODY, ...BG_LEGS[f === 0 ? 0 : 1]], {
    a: "#2b1d22",
    r: "#ff5d5d",
    d: "#7a1f24",
    w: "#fff",
    l: "#2b1d22",
  });
}

/* a roaming character: runs along the bottom, leaps onto things, and acts on them */
function agent(o) {
  const box = document.createElement("div"),
    cv = document.createElement("canvas"),
    sy = document.createElement("div"),
    g = cv.getContext("2d");
  const Wd = o.w * 4,
    H = o.h * 4,
    SX = H - 3;
  box.className = "ag";
  cv.width = o.w;
  cv.height = o.h;
  cv.style.width = Wd + "px";
  cv.style.height = H + "px";
  sy.className = "say";
  box.append(cv, sy);
  document.body.append(box);
  const a = {
    x: o.x,
    y: 0,
    dir: 1,
    fr: 0,
    tk: 0,
    st: 0,
    frozen: 0,
    rt: 0,
    wall: 0,
    wy: 0,
    vd: -1,
    wt: 0,
    wgo: 0,
    wpause: 0,
    dash: 0,
    panic: 0,
    spin: 0,
    mode: "wander",
    tx: o.x,
    wait: 90,
    mv: null,
    hit: 0,
    job: null,
    tid: 0,
    hid: false,
    force: "",
    drawn: "",
    sy,
    cv,
    box,
  };
  const ground = () => innerHeight - H - 6,
    reach = () => innerWidth - Wd,
    cl = (v) => Math.min(reach(), Math.max(0, v));
  const tween = (bx, by, dur, arc, next) => {
    a.mv = { ax: a.x, ay: a.y, bx, by, dur, arc, t: 0, next };
  };
  const drop = () =>
    tween(cl(a.x + a.dir * rnd(60, 140)), ground, 34, 24, () => {
      a.mode = "wander";
      a.job = null;
      a.wait = o.pace ? o.pace() : rnd(o.gap[0], o.gap[1]) | 0;
      a.tx = rnd(40, reach());
    });
  a.flip = () => {
    if (a.mv || a.mode !== "wander" || a.wall) return;
    a.dir = a.dir || 1;
    tween(a.x, ground, 28, 38, () => {});
    a.spin = 28;
  };
  a.escape = () => {
    const f = o.foe();
    a.panic = 1;
    a.job = { kind: "wall", side: a.x >= f.x ? 1 : -1 };
    a.mode = "run";
    a.tx = a.job.side > 0 ? reach() : 0;
  };
  a.hop = (d) =>
    tween(cl(a.x + d * rnd(150, 230)), ground, 24, 30, () => {
      a.mode = "wander";
      a.job = null;
      a.wait = 50;
      a.tx = a.x;
      if (o.flee) a.escape();
    });
  /* wall crawling: the character turns 90 degrees, sticks to the left or right edge of the screen and scurries up and down it */
  const climb = () => {
    const sd = a.job.side,
      pn = a.panic,
      lo = 70 + Wd / 2;
    a.panic = 0;
    a.job = null;
    a.wall = sd;
    a.mode = "wall";
    a.wy = ground() + H / 2;
    a.vd = -1;
    a.wt = rnd(240, 480) | 0;
    a.wgo = pn
      ? rnd(lo, Math.max(lo, innerHeight - WALL_REACH - 60))
      : rnd(lo, innerHeight - 260);
    a.wpause = 0;
    a.dash = pn ? 90 : 60;
    speak(a, pn ? "eek!" : "bzzt.", 900);
  };
  const leave = () => {
    const sd = a.wall;
    a.wall = 0;
    a.mode = "jump";
    const j = Math.random() < 0.6 ? o.decide() : null;
    if (j && j.kind === "mess") {
      a.job = j;
      speak(a, "dive!", 900);
      land();
      return;
    }
    tween(cl(a.x - sd * rnd(140, 260)), ground, 36, 40, () => {
      a.mode = "wander";
      a.job = null;
      a.wait = rnd(o.gap[0], o.gap[1]) | 0;
      a.tx = a.x;
    });
  };
  /* the fighter leaps at the bug; whether the strike connects is a dice roll */
  const leap = (t) => {
    if (Math.random() < DODGE_CHANCE) {
      speak(t, pickOf(["nope!", "eek!"]), 800);
      t.hop(t.x >= a.x ? 1 : -1);
    } else {
      t.frozen = 40;
      speak(t, "!", 600);
    }
    tween(cl(t.x - a.dir * Wd * 0.55), ground, 30, 50, () => {
      t.frozen = 0;
      a.mode = "wander";
      a.job = null;
      a.tx = a.x;
      if (t.hid) {
        a.wait = 40;
        return;
      }
      a.st = 10;
      if (Math.abs(t.x - a.x) < Wd * 1.3 && Math.random() < HIT_CHANCE) {
        speak(a, "got it.");
        t.die();
        a.wait = 24;
      } else {
        STAT.missed++;
        speak(a, pickOf(["missed!", "tch.", "so close."]));
        if (!t.mv && !t.panic) {
          speak(t, "hehe.", 1000);
          t.hop(t.x >= a.x ? 1 : -1);
        }
        a.wait = rnd(80, 140) | 0;
      }
    });
    a.mv.swing = 1;
  };
  /* bug bolts along the wall, away from where it was struck at */
  a.scurry = () => {
    const lo = 70 + Wd / 2;
    a.wgo = rnd(lo, Math.max(lo, innerHeight - WALL_REACH - 70));
    a.dash = 70;
    a.wpause = 0;
  };
  /* the fighter springs off the floor at a bug on the wall */
  const leapWall = (t) => {
    const sd = t.wall,
      ax = sd > 0 ? innerWidth - Wd - 16 : 16,
      dg = Math.random() < DODGE_CHANCE;
    if (dg) {
      speak(t, pickOf(["nope!", "eek!"]), 800);
      t.scurry();
    } else {
      t.frozen = 50;
      speak(t, "!", 600);
    }
    a.dir = sd;
    tween(ax + sd * 6, t.wy - H / 2, 34, 40, () => {
      t.frozen = 0;
      a.st = 10;
      if (!dg && !t.hid && t.wall && Math.random() < WALL_HIT_CHANCE) {
        speak(a, "got it.");
        t.die();
        a.wait = 24;
      } else {
        STAT.missed++;
        speak(a, pickOf(["missed!", "so close.", "too slippery."]));
        if (!t.hid && t.wall) {
          if (!dg) speak(t, "hehe.", 1000);
          t.scurry();
        }
        a.wait = rnd(80, 140) | 0;
      }
      a.job = null;
      a.mode = "wander";
      tween(cl(a.x - sd * rnd(20, 50)), ground, 24, 0, () => {
        a.mode = "wander";
        a.job = null;
        a.tx = a.x;
      });
    });
    a.mv.swing = 1;
  };
  const land = () => {
    const el = a.job.el,
      r = el.getBoundingClientRect();
    tween(
      cl(r.left + r.width / 2 - Wd / 2 + rnd(-30, 30)),
      () => el.getBoundingClientRect().top - SX,
      40,
      o.arc,
      () => {
        a.mode = "hit";
        a.hit = 30;
      },
    );
  };
  a.decide = () => {
    for (const e of messy.keys()) if (!e.isConnected) messy.delete(e);
    a.panic = 0;
    const f = a.force;
    a.force = "";
    const j = o.decide(f);
    if (!j) {
      a.wait = 60;
      return;
    }
    a.job = j;
    if (j.kind === "whack") {
      a.mode = "chase";
      return;
    }
    if (j.kind === "wall") {
      a.mode = "run";
      a.tx = j.side > 0 ? reach() : 0;
      return;
    }
    const r = j.el.getBoundingClientRect();
    a.mode = "run";
    a.tx = cl(r.left + r.width / 2 - Wd / 2 + rnd(-20, 20));
  };
  a.die = () => {
    a.panic = 0;
    if (o.respawn) {
      STAT.squashed++;
      burst(
        a.x + Wd / 2,
        a.y + H / 2,
        30,
        ["#ff5d5d", "#fff", "#7a1f24", "#2b1d22"],
        5,
      );
    }
    a.hid = true;
    a.frozen = 0;
    a.wall = 0;
    a.rt = Date.now();
    box.style.display = "none";
    a.mv = null;
    a.job = null;
    a.mode = "wander";
    if (o.respawn) setTimeout(a.spawn, rnd(4000, 7000));
  };
  a.spawn = (force) => {
    if (off || !a.hid) return;
    if (!force && messy.size && Date.now() - a.rt < 9000) {
      setTimeout(a.spawn, 700);
      return;
    } /* let the fixer finish cleaning first */
    a.hid = false;
    box.style.display = "";
    a.x = Math.random() < 0.5 ? 0 : reach();
    a.mode = "wander";
    a.wait = 40;
    a.tx = a.x;
    a.mv = null;
    a.job = null;
  };
  a.step = () => {
    if (a.hid) return;
    a.tk++;
    let air = false,
      mov = false;
    const m = a.mv;
    if (m) {
      const p = Math.min(1, ++m.t / m.dur),
        by = typeof m.by === "function" ? m.by() : m.by;
      if (m.swing && !m.sw && p > 0.5) {
        m.sw = 1;
        a.st = 14;
      }
      if (m.swing && a.tk % 2 === 0)
        P(a.x + Wd / 2, a.y + H / 2, 0, 0, 0, 16, AC(), 4);
      a.dir = m.bx >= m.ax ? 1 : -1;
      a.x = m.ax + (m.bx - m.ax) * p;
      a.y = m.ay + (by - m.ay) * p - m.arc * 4 * p * (1 - p);
      air = true;
      if (p >= 1) {
        if (Math.abs(by - ground()) < 2)
          for (let i = 0; i < 7; i++)
            P(
              a.x + Wd / 2,
              a.y + H - 2,
              rnd(-1.5, 1.5),
              rnd(-1.1, -0.2),
              0.08,
              rnd(14, 24) | 0,
              "#9a8f94",
              3,
            );
        a.mv = null;
        m.next();
      }
    } else if (a.mode === "wall") {
      const lo = 70 + Wd / 2,
        hi = innerHeight - Wd / 2 - 4;
      a.wy = Math.min(hi, Math.max(lo, a.wy));
      const sp = o.foe();
      if (
        a.frozen <= 0 &&
        !a.dash &&
        o.flee &&
        sp.mode === "chase" &&
        !sp.hid &&
        a.wy > innerHeight - WALL_REACH - 30 &&
        Math.random() < 0.1
      ) {
        a.scurry();
        speak(a, "eek!", 700);
      }
      if (a.frozen > 0) a.frozen--;
      else if (a.wpause > 0) a.wpause--;
      else {
        const d = a.wgo - a.wy,
          dsh = a.dash > 0,
          v = dsh ? o.run * 2.2 : o.run * 0.8;
        if (dsh) a.dash--;
        if (Math.abs(d) > v) {
          a.vd = d > 0 ? 1 : -1;
          a.wy += a.vd * v;
          mov = true;
          if (a.tk % (dsh ? 2 : 4) === 0)
            P(
              a.x + Wd / 2,
              a.wy,
              rnd(-0.3, 0.3),
              rnd(-0.2, 0.4),
              0.03,
              rnd(18, 30) | 0,
              pickOf(["#ff5d5d", "#2b1d22"]),
              3,
            );
        } else {
          a.wgo = rnd(lo, hi);
          a.wpause = rnd(0, 40) | 0;
          a.dash = 0;
        }
      }
      a.x = a.wall > 0 ? innerWidth - H / 2 - 2 - Wd / 2 : H / 2 + 2 - Wd / 2;
      a.y = a.wy - H / 2;
      if (a.frozen <= 0 && --a.wt <= 0) leave();
    } else if (a.mode === "hit") {
      const el = a.job.el,
        r = el.getBoundingClientRect();
      a.y = r.top - SX;
      if (!el.isConnected || r.bottom < 0 || r.top > innerHeight) drop();
      else {
        if (a.hit === 24) a.st = 14;
        if (a.hit === 17) (a.job.kind === "mess" ? mess : fix)(el, a);
        if (--a.hit <= 0) drop();
      }
    } else {
      a.y = ground();
      const foe = o.foe();
      if (a.frozen > 0) a.frozen--;
      else if (a.mode === "chase") {
        const t = foe;
        if (t.hid || t.mv || t.mode === "hit") {
          a.mode = "wander";
          a.job = null;
          a.wait = 40;
        } else if (t.wall) {
          if (t.wy < innerHeight - WALL_REACH) {
            speak(a, "too high.", 900);
            a.mode = "wander";
            a.job = null;
            a.wait = 90;
          } else {
            const sx = t.wall > 0 ? innerWidth - Wd - 16 : 16,
              d = sx - a.x;
            if (Math.abs(d) > 6) {
              a.dir = d > 0 ? 1 : -1;
              a.x += a.dir * 5;
              mov = true;
            } else leapWall(t);
          }
        } else {
          const d = t.x - a.x;
          a.dir = d > 0 ? 1 : -1;
          if (Math.abs(d) > Wd * 3.3) {
            a.x += a.dir * 5;
            mov = true;
          } else leap(t);
        }
      } else if (
        o.flee &&
        !a.panic &&
        (a.mode === "wander" || a.mode === "run") &&
        foe.mode === "chase" &&
        !foe.hid &&
        !foe.mv &&
        Math.abs(foe.x - a.x) < 260 &&
        Math.random() < 0.12
      ) {
        a.escape();
        speak(a, pickOf(["eek!", "bzzt!!", "nope."]), 800);
      } else if (
        o.flee &&
        a.mode === "wander" &&
        !foe.hid &&
        !foe.mv &&
        Math.abs(foe.x - a.x) < 170
      ) {
        a.dir = a.x >= foe.x ? 1 : -1;
        a.x = cl(a.x + a.dir * o.flee);
        mov = true;
      } else {
        const d = a.tx - a.x;
        if (Math.abs(d) > 3) {
          a.dir = d > 0 ? 1 : -1;
          a.x +=
            a.dir *
            (a.mode === "run" ? (a.panic ? o.flee + 0.9 : o.run) : o.walk);
          mov = true;
        } else if (a.mode === "run") {
          if (a.job && a.job.kind === "wall") climb();
          else land();
        } else if (--a.wait <= 0) a.decide();
      }
    }
    if (mov) {
      if (a.tk % 6 === 0) a.fr ^= 1;
    } else a.fr = 0;
    if (a.st > 0) a.st--;
    const f = air ? 2 : a.fr,
      ac = AC(),
      sw = a.st > 0,
      k = f + ac + sw;
    if (k !== a.drawn) {
      a.drawn = k;
      g.clearRect(0, 0, o.w, o.h);
      o.draw(g, f, sw, ac);
    }
    box.style.transform = `translate(${a.x}px,${a.y}px)`;
    const wl = a.wall,
      bob = mov && a.fr ? -2 : 0,
      ang = a.spin > 0 ? (1 - a.spin-- / 28) * 360 : 0;
    cv.style.transform = wl
      ? `rotate(${wl > 0 ? -90 : 90}deg) scaleX(${(wl > 0 ? a.vd < 0 : a.vd > 0) ? 1 : -1}) translateY(${bob}px)`
      : `translateY(${bob}px) scaleX(${a.dir}) rotate(${ang}deg)`;
    sy.style.marginBottom = wl ? Wd / 2 - H / 2 + 8 + "px" : "";
    if (sy.className === "say on") {
      const w = sy.offsetWidth,
        l = a.x + Wd / 2 - w / 2,
        sh = l < 6 ? 6 - l : Math.min(0, innerWidth - 6 - (l + w));
      sy.style.transform = `translateX(calc(-50% + ${sh}px))`;
    }
  };
  return a;
}

const sprite = agent({
  w: 14,
  h: 11,
  x: 40,
  arc: 70,
  walk: 2.4,
  run: 4,
  gap: [50, 150],
  draw: drawSprite,
  foe: () => bug,
  pace: () => (bug.hid && messy.size ? 12 : rnd(50, 150) | 0),
  decide: (f) => {
    if (f !== "fix" && !bug.hid) {
      if (messy.size >= 5 && Math.random() < 0.5) {
        const e5 = pick((e) => messy.has(e));
        if (e5) return { el: e5, kind: "fix" };
      }
      if (bug.wall) {
        if (!bug.mv && bug.wy > innerHeight - WALL_REACH && Math.random() < 0.4)
          return { kind: "whack" };
        const e6 = pick((e) => messy.has(e));
        if (e6) return { el: e6, kind: "fix" };
        if (Math.random() < 0.3)
          speak(
            sprite,
            pickOf(["get down here.", "i can't reach you.", "coward."]),
          );
        return null;
      }
      return !bug.mv && bug.mode !== "hit" && Math.random() < 0.3
        ? { kind: "whack" }
        : null;
    }
    const el = pick((e) => messy.has(e));
    if (!el && !sprite.mv && sprite.mode === "wander") {
      const r = Math.random();
      if (r < 0.12) sprite.flip();
      else if (r < 0.35) {
        sprite.st = 14;
        speak(sprite, pickOf(["tak.", "tak tak.", "hup."]), 900);
      }
    }
    return el ? { el, kind: "fix" } : null;
  },
});
const bug = agent({
  w: 10,
  h: 6,
  x: Math.max(0, innerWidth - 200),
  arc: 44,
  walk: 1.6,
  run: 3.2,
  flee: 3.6,
  gap: [70, 200],
  respawn: 1,
  draw: drawBug,
  foe: () => sprite,
  decide: () => {
    if (Math.random() < 0.25)
      return { kind: "wall", side: Math.random() < 0.5 ? -1 : 1 };
    if (messy.size >= 7) return null;
    const el = pick((e) => !messy.has(e));
    return el ? { el, kind: "mess" } : null;
  },
});

sprite.cv.addEventListener("mouseenter", () =>
  speak(sprite, pickOf(["hi!", "i fix the bugs.", "don't mind me."])),
);
sprite.cv.addEventListener("click", () => {
  sprite.st = 14;
  sprite.flip();
  speak(sprite, pickOf(["tak!", "hi-yah!", "hup!"]), 900);
});
bug.cv.addEventListener("mouseenter", () => speak(bug, "bzzt!", 1200));
bug.cv.addEventListener("click", () => {
  bug.die();
  sprite.wait = Math.min(sprite.wait, 20);
  speak(sprite, "nice one. thanks.");
});
function show(on) {
  off = !on;
  [sprite, bug].forEach((a) => {
    a.hid = off;
    a.box.style.display = off ? "none" : "";
  });
  if (off) {
    messy.forEach((_, e) => fix(e, null, true));
    sprite.mv = bug.mv = null;
    bug.wall = 0;
    bug.panic = 0;
    sprite.mode = bug.mode = "wander";
    sprite.job = bug.job = null;
  }
}
(function loop() {
  requestAnimationFrame(loop);
  sprite.step();
  bug.step();
  fxStep();
})();
if (calm) show(false);
else {
  setTimeout(() => speak(sprite, "hi. i fix the bugs."), 1200);
  setTimeout(() => speak(bug, "bzzt."), 3200);
}

/* nav highlight */
const links = [...document.querySelectorAll("nav a")];
const so = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        links.forEach((a) =>
          a.classList.toggle("on", a.hash === "#" + e.target.id),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("section").forEach((s) => so.observe(s));

/* link hover recolors the page (kept from the original site) */
const root = document.documentElement;
document.querySelectorAll(".lk").forEach((a) => {
  const on = () => root.style.setProperty("--accent", a.dataset.c),
    off = () =>
      window.__t
        ? root.style.setProperty("--accent", window.__t)
        : root.style.removeProperty("--accent");
  a.addEventListener("mouseenter", on);
  a.addEventListener("focus", on);
  a.addEventListener("mouseleave", off);
  a.addEventListener("blur", off);
});
