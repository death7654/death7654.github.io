import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Search,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  Brain,
  Code2,
  GraduationCap,
  ArrowUpRight,
  Star,
  GitFork,
  Users,
  Download,
  ArrowUp,
  ArrowLeft,
  FileText,
} from "lucide-react";

/* =========================================================================
   DATA
   ========================================================================= */

const DOMAINS = {
  systems: {
    key: "systems",
    label: "Low-Level & Embedded",
    short: "Systems / Emulation",
    hex: "#22D3EE",
    text: "text-cyan-300",
    borderStrong: "border-cyan-400/70",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/15",
    dot: "bg-cyan-400",
    glowShadow: "0 0 40px -8px rgba(34,211,238,0.35)",
  },
  ai: {
    key: "ai",
    label: "Machine Learning & AI",
    short: "AI / ML",
    hex: "#34D399",
    text: "text-emerald-300",
    borderStrong: "border-emerald-400/70",
    border: "border-emerald-400/25",
    bg: "bg-emerald-400/15",
    dot: "bg-emerald-400",
    glowShadow: "0 0 40px -8px rgba(52,211,153,0.35)",
  },
  web: {
    key: "web",
    label: "Fullstack & Systems Tooling",
    short: "Web / Tooling",
    hex: "#CBD5E1",
    text: "text-slate-300",
    borderStrong: "border-slate-300/70",
    border: "border-slate-300/25",
    bg: "bg-slate-300/15",
    dot: "bg-slate-300",
    glowShadow: "0 0 40px -8px rgba(203,213,225,0.25)",
  },
};

const SKILLS = {
  systems: [
    "C/C++", "Rust", "Zig", "Xtensa Assembly", "SPI", "UART", "GPIO",
    "FAT32", "MBR", "Memory-Mapped I/O", "Boot Stages", "DMA",
    "Interrupt Handling", "Make",
  ],
  ai: [
    "PyTorch", "TensorFlow", "Transformers", "Sentence-Transformers",
    "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "SciPy", "LSTM",
    "MinMax Scaling", "Prompt Engineering",
  ],
  web: [
    "Python", "Java", "JavaScript", "TypeScript", "MySQL", "SQL", "JSON",
    "REST APIs", "Tauri", "Angular", "Bootstrap", "HTML/CSS",
  ],
};

const FEATURED = [
  {
    id: "chrultrabook",
    index: "01",
    domain: "systems",
    title: "Chrultrabook Tools",
    languages: ["TypeScript", "Rust", "HTML", "SCSS", "Nix", "Shell"],
    stat: "45,000+ downloads",
    url: "https://github.com/death7654/Chrultrabook-Tools",
    description:
      "Restores lost functionality and adds powerful new features to all Chromebooks running Windows, Linux, and macOS. Cross-platform and actively maintained, serving a large community. Features direct hardware access via a Rust backend, low-latency sensor polling, and fan curve calculations exposed over IPC to a polished frontend.",
  },
  {
    id: "driver-installer",
    index: "02",
    domain: "systems",
    title: "Chromebook Driver Installer",
    languages: ["Rust", "JSON", "SQL"],
    stat: "5,000+ downloads",
    url: "https://github.com/death7654/Chromebook-Driver-Installer",
    description:
      "Automated driver installation system for Chromebook users. Combines a high-performance Rust CLI tool with a structured backend database cataloging 200+ models, built with a dynamic update mechanism that fetches metadata at runtime to eliminate application rebuilds.",
  },
  {
    id: "esp32-kernel",
    index: "03",
    domain: "systems",
    title: "Bare Metal ESP32 Kernel",
    languages: ["C", "Python", "Make", "Xtensa Assembly"],
    stat: "Built from the TRM up",
    url: "https://github.com/death7654/ESP32-Bare-Metal-Kernel",
    description:
      "A two-stage bootloader and kernel for the ESP32, built entirely from the Technical Reference Manual. Features a custom Xtensa assembly trampoline transferring a kernel binary from DRAM to IRAM, a register-level SPI/SD card driver, a FAT32 filesystem driver traversing cluster chains, and an interactive kernel shell running a domain-specific script interpreter for runtime reprogramming.",
  },
  {
    id: "gameboy",
    index: "04",
    domain: "systems",
    title: "Game Boy Emulator",
    languages: ["Rust"],
    stat: "Cycle-accurate DMG core",
    url: "https://github.com/death7654/Gameboy-Emulator-Rust",
    description:
      "A cycle-accurate Game Boy (DMG) emulator built from scratch. Implements accurate Sharp LR35902 CPU emulation, a pixel processing unit pipeline with scanline-based rendering, tile caching, sprite compositing, custom memory bank controllers (MBC1/MBC3), and exact OAM DMA timing.",
  },
  {
    id: "8080",
    index: "05",
    domain: "systems",
    title: "Space Invaders / Intel 8080",
    languages: ["C++"],
    stat: "1978 cabinet, faithfully",
    url: "https://github.com/death7654/Intel-8080-Emulator",
    description:
      "A faithful emulation of the classic 1978 arcade cabinet hardware. Implements a complete Intel 8080 instruction set with accurate flag arithmetic, memory-mapped I/O, bitwise shift registers, and hardware-driven interrupt loops synchronized tightly to cycle counts to reproduce alternating VBLANK intervals.",
  },
];

const EXPERIENCE = [
  {
    role: "Research Intern",
    org: "Amrita School of Artificial Intelligence",
    period: "May 2026 — Jun. 2026",
    domain: "ai",
    points: [
      "Investigated and mitigated linguistic gender bias in AI systems under Dr. Premjith B.",
      "Built an NLP pipeline using Sentence-BERT embeddings and a custom 5-layer feed-forward PyTorch architecture optimizing dual cross-entropy / contrastive loss functions.",
      "Designed a self-correcting two-step LLM prompting framework built on SmolLM2.",
    ],
  },
  {
    role: "Open Source Contributor",
    org: "Chrultrabook Project",
    period: "May 2023 — Present",
    domain: "systems",
    points: [
      "Maintain primary systems tooling and resolve upstream documentation gaps.",
      "Manage centralized hardware compatibility schemas across supported devices.",
      "Provide low-level support for thousands of alternate-OS desktop environments.",
    ],
  },
];

const GH_USERNAME = "death7654";

const LANGUAGE_COLORS = {
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Rust: "#dea584",
  Go: "#00ADD8",
  Zig: "#ec915c",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Makefile: "#427819",
  Nix: "#7e7eff",
  Dockerfile: "#384d54",
  Assembly: "#6E4C13",
};
const LANGUAGE_FALLBACK_COLOR = "#8b949e";

const SYSTEMS_LANGS = new Set([
  "C", "C++", "Rust", "Zig", "Assembly", "Makefile", "Shell", "Dockerfile", "Nix",
]);
const AI_LANGS = new Set(["Python", "Jupyter Notebook", "R", "MATLAB"]);

function inferDomain(language) {
  if (!language) return "web";
  if (SYSTEMS_LANGS.has(language)) return "systems";
  if (AI_LANGS.has(language)) return "ai";
  return "web";
}

const GITHUB_URL = `https://github.com/${GH_USERNAME}`;
const LINKEDIN_URL = "https://linkedin.com/in/robinsonarysseril";
const EMAIL = "robinsongeorgearysseril301@gmail.com";
// Four role-tailored resumes. Place each PDF at the matching path below (e.g. in /public/resumes/)
// for the download buttons on the /resume page to work.
const RESUME_VARIANTS = [
  {
    key: "systems",
    label: "Systems & Embedded",
    domain: "systems",
    description:
      "Bare-metal kernels, register-level drivers, and cycle-accurate emulators — for embedded, firmware, and low-level systems roles.",
    fileName: "Robinson-Arysseril-Resume-Systems.pdf",
    url: "/resumes/RobinsonResumeSystems.pdf",
  },
  {
    key: "ml",
    label: "Machine Learning & AI",
    domain: "ai",
    description:
      "NLP bias-classification research, contrastive representation learning, and applied ML — for AI/ML research and engineering roles.",
    fileName: "Robinson-Arysseril-Resume-ML.pdf",
    url: "/resumes/RobinsonResumeML.pdf",
  },
  {
    key: "data-science",
    label: "Data Science",
    domain: "ai",
    description:
      "Forecasting pipelines, statistical modeling, and data engineering — for data science and analytics roles.",
    fileName: "Robinson-Arysseril-Resume-DataScience.pdf",
    url: "/resumes/RobinsonResumeDataScience.pdf",
  },
  {
    key: "frontend",
    label: "Frontend & Fullstack",
    domain: "web",
    description:
      "Tauri/Angular desktop apps and full-stack tooling — for frontend and product engineering roles.",
    fileName: "Robinson-Arysseril-Resume-Frontend.pdf",
    url: "/resumes/RobinsonResumeFrontEnd.pdf",
  },
];

/* =========================================================================
   LOCAL CACHE (stale-while-revalidate for GitHub API calls)
   ========================================================================= */

const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

function readCache(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.savedAt !== "number") return null;
    return { data: parsed.data, isStale: Date.now() - parsed.savedAt > CACHE_TTL_MS };
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently, cache is a nice-to-have.
  }
}

/* =========================================================================
   REDUCED MOTION
   ========================================================================= */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);
  return reduced;
}


/* =========================================================================
   SEO / DOCUMENT META
   ========================================================================= */

function setMetaTag(attr, key, content) {
  if (typeof document === "undefined") return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function useDocumentMeta(route) {
  useEffect(() => {
    const isResume = route === "resume";
    const title = isResume
      ? "Resume — Robinson George Arysseril"
      : "Robinson George Arysseril — Systems & Intelligence";
    const description = isResume
      ? "Download a role-tailored resume for Robinson George Arysseril: systems & embedded, machine learning, data science, or frontend & fullstack."
      : "Portfolio of Robinson George Arysseril: bare-metal kernels, cycle-accurate emulators, and NLP research, built from the register up and the model down.";

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    let ld = document.getElementById("rga-person-ld");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "rga-person-ld";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Robinson George Arysseril",
      url: GITHUB_URL,
      sameAs: [GITHUB_URL, LINKEDIN_URL],
      jobTitle: "Systems & AI Engineer",
      alumniOf: "Vimal Jyothi Engineering College",
    });
  }, [route]);
}

/* =========================================================================
   BOOT SEQUENCE
   ========================================================================= */

const BOOT_LINES = [
  { text: "\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510", tag: "art", delay: 35 },
  { text: "\u2502          R . G . A .   S Y S T E M S          \u2502", tag: "art", delay: 35 },
  { text: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518", tag: "art", delay: 60 },
  { text: "", tag: "blank", delay: 90 },
  { text: "robinson_os v2.6.0-arysseril (rustc 1.79.0, xtensa-gcc 12.2)", tag: "info", delay: 110 },
  { text: "Copyright (c) 2024\u20132026 R.G.A. Systems. All rights reserved.", tag: "muted", delay: 90 },
  { text: "", tag: "blank", delay: 70 },
  { text: "[    0.000000] Booting kernel \u2026", tag: "ok", delay: 130 },
  { text: "[    0.014221] CPU0: dual-core detected \u2014 LR35902 + Xtensa LX6", tag: "ok", delay: 140 },
  { text: "[    0.032108] Initializing SPI0, UART1, GPIO bank A/B \u2026", tag: "ok", delay: 140 },
  { text: "[    0.048873] Mounting root filesystem (FAT32) \u2026 done", tag: "ok", delay: 140 },
  { text: "[    0.066932] Probing memory-mapped I/O regions", tag: "ok", delay: 130 },
  { text: "[    0.081410] DMA controller: 4 channels online", tag: "ok", delay: 130 },
  { text: "[    0.093003] Loading kernel modules:", tag: "info", delay: 110 },
  { text: "  rustc  pytorch  tensorflow  xtensa-gcc  scikit-learn", tag: "progress", delay: 900 },
  { text: "[    1.021552] all modules loaded ok", tag: "ok", delay: 130 },
  { text: "[    1.048887] uplink to github.com/death7654 \u2026 connected", tag: "ok", delay: 160 },
  { text: "[    1.069213] auth robinson_george_arysseril \u2026 granted", tag: "ok", delay: 160 },
  { text: "", tag: "blank", delay: 90 },
  { text: "> whoami", tag: "prompt", delay: 100 },
  { text: "robinson_george_arysseril", tag: "muted", delay: 120 },
  { text: "> uname -a", tag: "prompt", delay: 100 },
  { text: "SystemsAndIntelligence 5.4.7-terminal x86_64 GNU/Linux", tag: "muted", delay: 150 },
  { text: "", tag: "blank", delay: 80 },
  { text: "welcome back, robinson.", tag: "final", delay: 550 },
];

const LINE_TAG_STYLES = {
  art: "text-slate-600",
  info: "text-cyan-300/80",
  ok: "text-slate-400",
  muted: "text-slate-500",
  prompt: "text-cyan-300 font-semibold",
  final: "text-emerald-300 font-semibold mt-2",
  blank: "h-3",
};

function BootProgress({ active }) {
  const pct = useCountUp(100, active, 750);
  const blocks = Math.min(20, Math.round((pct / 100) * 20));
  return (
    <div className="text-cyan-300/90">
      {"  rustc  pytorch  tensorflow  xtensa-gcc  scikit-learn  "}
      <span className="text-slate-500">[</span>
      <span className="text-emerald-400">{"\u2588".repeat(blocks)}</span>
      <span className="text-slate-700">{"\u2591".repeat(20 - blocks)}</span>
      <span className="text-slate-500">{`] ${pct}%`}</span>
    </div>
  );
}

function BootSequence({ onDone }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    if (visibleLines < BOOT_LINES.length) {
      const delay = BOOT_LINES[visibleLines].delay ?? 130;
      const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [visibleLines, onDone]);

  useEffect(() => {
    if (!skip) return;
    onDone();
  }, [skip, onDone]);

  return (
    <motion.div
      style={{ backgroundColor: "#05070C", zIndex: 100 }}
      className="fixed inset-0 flex items-center justify-center px-6 cursor-pointer overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setSkip(true)}
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          opacity: 0.06,
          backgroundImage:
            "repeating-linear-gradient(0deg, #22D3EE 0px, transparent 1px, transparent 3px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-24 bg-cyan-400/10 blur-2xl"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative w-full max-w-lg font-mono text-xs sm:text-sm leading-relaxed">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
          if (line.tag === "blank") return <div key={i} className={LINE_TAG_STYLES.blank} />;
          if (line.tag === "progress") return <BootProgress key={i} active />;
          return (
            <div key={i} className={LINE_TAG_STYLES[line.tag] || "text-slate-300"}>
              {line.text}
            </div>
          );
        })}
        <span className="inline-block w-2 h-3.5 align-middle bg-cyan-300 animate-pulse ml-0.5" />
        <div className="mt-8 text-xs tracking-widest text-slate-500 uppercase">
          tap anywhere to skip
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   SHARED BITS
   ========================================================================= */

function LangBadge({ label, domain, hex, size = "sm" }) {
  const d = DOMAINS[domain] || DOMAINS.web;
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${d.border} ${d.bg} ${pad} font-mono text-slate-300`}
    >
      <span
        className={hex ? "h-1.5 w-1.5 rounded-full" : `h-1.5 w-1.5 rounded-full ${d.dot}`}
        style={hex ? { backgroundColor: hex } : undefined}
      />
      {label}
    </span>
  );
}

function SectionHeading({ eyebrow, title, subtitle, quirk }) {
  return (
    <div className="mb-10 sm:mb-14 relative group">
      {quirk && (
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 hidden lg:block font-mono text-[10px] text-slate-600 border border-white/5 bg-white/5 rounded px-2 py-0.5 select-none"
        >
          {quirk}
        </div>
      )}
      <div className="font-mono text-xs tracking-widest text-cyan-400/70 uppercase mb-3">
        {eyebrow}
      </div>
      <h2 className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-100">
        {title}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-cyan-400 via-slate-200 to-emerald-400"
        />
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Screen-reader-only note appended to links that open in a new tab.
function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

// Wraps children in a subtle mouse-tracked 3D tilt. No-ops under prefers-reduced-motion.
function TiltCard({ children, className = "", maxTilt = 8 }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.4 });

  const onMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 40, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, zIndex: 60 }}
      className="fixed top-0 inset-x-0 h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-slate-200 to-emerald-400"
    />
  );
}

// Fixed ambient blobs: gentle infinite drift plus scroll-linked parallax for depth.
// Fully static (no motion, no parallax) under prefers-reduced-motion.
function ParallaxBackdrop() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -220]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 260]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -160]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: yA }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl"
      >
        <motion.div
          className="h-full w-full rounded-full"
          animate={reducedMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        style={{ y: yB }}
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl"
      >
        <motion.div
          className="h-full w-full rounded-full"
          animate={reducedMotion ? undefined : { x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        style={{ y: yC }}
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl"
      >
        <motion.div
          className="h-full w-full rounded-full"
          animate={reducedMotion ? undefined : { x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

/* =========================================================================
   HEADER
   ========================================================================= */

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Stats", href: "#stats" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

function Header({ onOpenResume }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clock = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: scrolled ? "rgba(11, 15, 25, 0.72)" : "transparent" }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "backdrop-blur-xl border-b border-white/10" : ""
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => go("#top")}
            className="flex items-center gap-2 font-mono text-sm text-slate-200"
          >
            <Terminal className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
            <span className="tracking-tight">rga<span className="text-cyan-400">.</span>dev</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="px-3.5 py-2 text-xs text-slate-300 hover:text-slate-100 transition-colors rounded-full hover:bg-white/5"
              >
                {l.label}
              </button>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="ml-2 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-2 text-xs text-cyan-300 hover:bg-cyan-400/20 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
              <NewTabHint />
            </a>
            <button
              onClick={onOpenResume}
              className="ml-2 flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-xs text-slate-300 hover:border-white/25 hover:text-slate-100 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2.5 ml-3 pl-3 border-l border-white/10 font-mono text-xs text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 pulse-dot" />
            </span>
            <span className="tabular-nums">{clock}</span>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(5, 7, 12, 0.95)" }}
            className="fixed inset-0 z-40 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col pt-24 px-8 gap-1"
            >
              {NAV_LINKS.map((l, i) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-lg text-slate-200"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              ))}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 py-3.5 text-cyan-300"
              >
                <Github className="h-4 w-4" /> github.com/death7654
                <NewTabHint />
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenResume();
                }}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/10 py-3.5 text-slate-300"
              >
                <FileText className="h-4 w-4" /> View resumes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================================
   HERO + SKILLS GRID
   ========================================================================= */

function Hero({ activeDomain, setActiveDomain, onOpenResume }) {
  const reducedMotion = usePrefersReducedMotion();
  const spotX = useMotionValue(-9999);
  const spotY = useMotionValue(-9999);
  const spotBackground = useMotionTemplate`radial-gradient(480px circle at ${spotX}px ${spotY}px, rgba(34,211,238,0.10), transparent 65%)`;

  const onPointerMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="top"
      onMouseMove={onPointerMove}
      className="relative pt-32 sm:pt-40 pb-20 px-5 sm:px-8"
    >
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotBackground }}
          className="pointer-events-none absolute inset-0 -z-10"
        />
      )}
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
        >
          {/* THE INITIAL WINDOW: This container remains preserved intact */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-white/5 px-4 py-2.5 max-w-md"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-xs text-slate-400 truncate">
              robinson@systems: ~/portfolio
            </span>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-xs tracking-widest text-emerald-400/70 uppercase mb-5"
          >
            systems &amp; intelligence
          </motion.div>

          <div className="relative">
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-16 sm:-inset-y-24 -z-10 overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                className="absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-cyan-400/50 blur-3xl mix-blend-screen"
                style={{ left: "2%", top: "8%" }}
                animate={reducedMotion ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-emerald-400/45 blur-3xl mix-blend-screen"
                style={{ right: "6%", top: "0%" }}
                animate={reducedMotion ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-violet-400/40 blur-3xl mix-blend-screen"
                style={{ left: "32%", bottom: "-15%" }}
                animate={reducedMotion ? undefined : { x: [0, 30, -40, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.9, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-pink-400/35 blur-3xl mix-blend-screen"
                style={{ right: "22%", bottom: "-20%" }}
                animate={reducedMotion ? undefined : { x: [0, -25, 15, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.1, 1] }}
                transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <h1 className="relative z-10 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-tight">
              Robinson George
            </h1>
            <h1 className="relative z-10 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-tight">
              <motion.span
                className="name-shimmer inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
              Arysseril
              </motion.span>
            </h1>
          </div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            I build from the register up and the model down &mdash; bare-metal
            kernels, cycle-accurate emulators, and NLP pipelines that ship.
            Currently studying AI &amp; Data Science, permanently in a terminal.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-900 px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              View featured work
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.span>
            </motion.a>
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-slate-300 px-5 py-3 text-sm hover:border-white/30 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" /> Say hello
            </motion.a>
            <motion.button
              onClick={onOpenResume}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-slate-300 px-5 py-3 text-sm hover:border-white/30 hover:text-white transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-xs text-slate-300"
        >
          <GraduationCap className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" />
          <div>
            <span className="text-slate-400">student@vjec</span>
            <span className="text-slate-500">:~$</span> whoami --academic
            <div className="mt-1 text-slate-300">
              B.Tech, Artificial Intelligence &amp; Data Science &middot; Minor in Electronics &amp; Communications
              <span className="text-emerald-400/80"> &middot; CGPA 9.47/10</span>
              <br className="hidden sm:block" />
              Vimal Jyothi Engineering College &middot; Sep. 2024 &ndash; May 2028
            </div>
          </div>
        </motion.div>

        <div id="skills" className="mt-20 scroll-mt-24">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-sm font-mono tracking-widest text-slate-400 uppercase">
              Select a domain
            </h2>
            {activeDomain && (
              <button
                onClick={() => setActiveDomain(null)}
                className="text-xs font-mono text-slate-400 hover:text-slate-300 underline underline-offset-4"
              >
                clear filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.values(DOMAINS).map((d, di) => {
              const isActive = activeDomain === d.key;
              const isDimmed = activeDomain && !isActive;
              const Icon = d.key === "systems" ? Cpu : d.key === "ai" ? Brain : Code2;
              return (
                <motion.button
                  layout
                  key={d.key}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: isDimmed ? 0.45 : 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: di * 0.08, ease: "easeOut" }}
                  onClick={() => setActiveDomain(isActive ? null : d.key)}
                  whileHover={{ y: -5, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${d.label}${isActive ? " (active, click to clear)" : ""}`}
                  style={{ boxShadow: isActive ? d.glowShadow : "none" }}
                  className={`text-left rounded-2xl border ${
                    isActive ? d.borderStrong : "border-white/10"
                  } ${isActive ? d.bg : "bg-white/5"} p-5 sm:p-6 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.span whileHover={{ rotate: -8, scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                      <Icon className={`h-5 w-5 ${d.text}`} strokeWidth={1.6} />
                    </motion.span>
                    <span className={`h-2 w-2 rounded-full ${d.dot} ${isActive ? "pulse-dot" : ""}`} />
                  </div>
                  <div className="font-medium text-slate-100">{d.label}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <AnimatePresence initial={false}>
                      {SKILLS[d.key].slice(0, isActive ? SKILLS[d.key].length : 5).map((s, si) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: isActive ? si * 0.025 : 0 }}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-xs font-mono text-slate-300"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    {!isActive && SKILLS[d.key].length > 5 && (
                      <span className="rounded-full px-2 py-0.5 text-xs font-mono text-slate-500">
                        +{SKILLS[d.key].length - 5} more
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SKILLS MARQUEE (ambient ticker strip)
   ========================================================================= */

function SkillsMarquee() {
  const items = useMemo(
    () => [...SKILLS.systems, ...SKILLS.ai, ...SKILLS.web],
    []
  );
  // Duplicate the list once so the -50% translateX loop is seamless.
  const track = [...items, ...items];

  return (
    <div
      className="marquee-row relative py-6 border-y border-white/5 overflow-hidden"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10" />
      <div className="marquee-track flex w-max items-center gap-3">
        {track.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono text-slate-400"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   STATS STRIP (live GitHub totals)
   ========================================================================= */

function StatCard({ icon: Icon, label, value, domainKey, ready, delay, suffix }) {
  const [inView, setInView] = useState(false);
  const d = DOMAINS[domainKey];
  const count = useCountUp(value, ready && inView);

  return (
    <TiltCard maxTilt={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        onViewportEnter={() => setInView(true)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        style={{ boxShadow: "none" }}
        className={`relative overflow-hidden rounded-2xl border ${d.border} ${d.bg} p-7 sm:p-9 text-center`}
      >
        <div className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border ${d.borderStrong} ${d.bg}`}>
          <Icon className={`h-5 w-5 ${d.text}`} strokeWidth={1.75} />
        </div>
        <div className="font-mono text-4xl sm:text-5xl font-semibold text-slate-100 tabular-nums">
          {ready ? (
            <>
              {count.toLocaleString()}
              {suffix ? <span className={`ml-0.5 ${d.text}`}>{suffix}</span> : null}
            </>
          ) : (
            <span className="inline-block h-10 w-20 rounded bg-white/10 animate-pulse align-middle" />
          )}
        </div>
        <div className="mt-3 text-xs font-mono tracking-widest text-slate-400 uppercase">
          {label}
        </div>
      </motion.div>
    </TiltCard>
  );
}

function StatsStrip({ repoStatus, repos, profileStatus, profile }) {
  const ready = repoStatus === "ready" && profileStatus === "ready";
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);
  const followers = profile ? profile.followers : 0;

  return (
    <section id="stats" className="relative py-20 sm:py-28 px-5 sm:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Synced with GitHub"
          title="Stats, live"
          subtitle="Pulled straight from the GitHub API on page load — no manually updated numbers."
          quirk="curl -X GET /v3/users/death7654/stats"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <StatCard icon={Star} label="GitHub Stars" value={totalStars} domainKey="systems" ready={ready} delay={0} />
          <StatCard icon={GitFork} label="Forks" value={totalForks} domainKey="ai" ready={ready} delay={0.1} />
          <StatCard icon={Users} label="Followers" value={followers} domainKey="web" ready={ready} delay={0.2} />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FEATURED PROJECTS
   ========================================================================= */

function FeaturedProjects({ activeDomain }) {
  return (
    <section id="work" className="relative py-20 sm:py-28 px-5 sm:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured masterpieces"
          title="Built from first principles"
          subtitle="Five projects spanning the register-level and the runtime &mdash; kernels, cartridges, and cabinets, reconstructed from datasheets and reference manuals rather than tutorials."
          quirk="ls -la ~/featured/production/"
        />

        <div className="space-y-4">
          {FEATURED.map((p, i) => {
            const d = DOMAINS[p.domain];
            const dimmed = activeDomain && activeDomain !== p.domain;
            return (
              <TiltCard key={p.id} maxTilt={3}>
                <motion.div
                  layoutId={`feature-${p.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -4, boxShadow: d.glowShadow }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                  className={`group relative overflow-hidden rounded-2xl border ${d.border} bg-white/5 hover:bg-white/10 transition-colors p-6 sm:p-8`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 0.4, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06 + 0.15, ease: "backOut" }}
                      className={`font-mono text-4xl sm:text-5xl font-light ${d.text} shrink-0`}
                    >
                      {p.index}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
                          {p.title}
                        </h3>
                        <span className={`text-xs font-mono ${d.text}`}>{p.stat}</span>
                      </div>
                      <p className="mt-3 text-slate-300 text-sm sm:text-sm leading-relaxed max-w-3xl">
                        {p.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.languages.map((l) => (
                          <LangBadge key={l} label={l} domain={p.domain} />
                        ))}
                      </div>
                    </div>
                    <motion.a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="shrink-0 self-start md:self-center flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-xs text-slate-300 group-hover:text-slate-100 group-hover:border-white/25 transition-colors overflow-hidden"
                    >
                      <Code2 className="h-3.5 w-3.5" /> Source
                      <ArrowUpRight className="h-3.5 w-3.5 -ml-3 opacity-0 -translate-x-1 group-hover:ml-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <NewTabHint />
                    </motion.a>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   EXPERIENCE
   ========================================================================= */

function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 px-5 sm:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading 
          eyebrow="Track record" 
          title="Experience" 
          quirk="history | grep -E 'intern|contributor'"
        />
        <div className="relative pl-6 sm:pl-10 space-y-12">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-white/10 to-emerald-400/40"
          />
          {EXPERIENCE.map((e, i) => {
            const d = DOMAINS[e.domain];
            // Quirk: Hex Address pointer simulator
            const hexAddress = `[0x00A${(i * 4 + 7).toString(16).toUpperCase()}FC]`;
            return (
              <motion.div
                key={e.role + e.org}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.2, ease: "backOut" }}
                  style={{ boxShadow: "0 0 0 4px #0B0F19" }}
                  className={`absolute -left-8 sm:-left-11 top-1.5 h-3 w-3 rounded-full ${d.dot}`}
                />
                <div className="font-mono text-xs text-slate-500 mb-1 flex items-center gap-2">
                  <span aria-hidden="true" className="text-slate-600">{hexAddress}</span>
                  <span>{e.period}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100">{e.role}</h3>
                <div className={`text-sm ${d.text} mb-3`}>{e.org}</div>
                <ul className="space-y-1.5">
                  {e.points.map((pt, pi) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.3 + pi * 0.06 }}
                      className="flex gap-2 text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="text-slate-500 mt-1.5 h-1 w-1 rounded-full bg-slate-500 shrink-0" />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LIVE GITHUB DATA HOOKS & UTILS
   ========================================================================= */

function useGithubRepos(username) {
  const cacheKey = `rga:repos:${username}`;
  const cached = useMemo(() => readCache(cacheKey), [cacheKey]);
  const [state, setState] = useState(() =>
    cached ? { status: "ready", repos: cached.data, error: null } : { status: "loading", repos: [], error: null }
  );

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        let all = [];
        let page = 1;
        while (page <= 5) {
          const res = await fetch(
            `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
            { headers: { Accept: "application/vnd.github.v3+json" } }
          );
          if (!res.ok) {
            throw new Error(res.status === 403 ? "rate_limit" : `http_${res.status}`);
          }
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          all = all.concat(data);
          if (data.length < 100) break;
          page += 1;
        }

        const mapped = all
          .filter((r) => !r.fork)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || "No description provided.",
            language: r.language,
            domain: inferDomain(r.language),
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            updatedAt: r.updated_at,
            url: r.html_url,
          }))
          .sort(
            (a, b) => b.stars - a.stars || new Date(b.updatedAt) - new Date(a.updatedAt)
          );

        if (!cancelled) {
          setState({ status: "ready", repos: mapped, error: null });
          writeCache(cacheKey, mapped);
        }
      } catch (err) {
        if (cancelled) return;
        // Rate-limited or offline: serve the cached copy (even if stale) rather than an empty error state.
        if (cached) {
          setState({ status: "ready", repos: cached.data, error: null });
        } else {
          setState({ status: "error", repos: [], error: err.message });
        }
      }
    }
    // Skip the network round-trip entirely if we have a fresh cache.
    if (cached && !cached.isStale) return;
    run();
    return () => { cancelled = true; };
  }, [username]);

  return state;
}

function useGithubProfile(username) {
  const cacheKey = `rga:profile:${username}`;
  const cached = useMemo(() => readCache(cacheKey), [cacheKey]);
  const [state, setState] = useState(() =>
    cached
      ? { status: "ready", profile: cached.data, error: null }
      : { status: "loading", profile: null, error: null }
  );

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (!res.ok) {
          throw new Error(res.status === 403 ? "rate_limit" : `http_${res.status}`);
        }
        const data = await res.json();
        const profile = { followers: data.followers || 0, publicRepos: data.public_repos || 0 };
        if (!cancelled) {
          setState({ status: "ready", profile, error: null });
          writeCache(cacheKey, profile);
        }
      } catch (err) {
        if (cancelled) return;
        if (cached) {
          setState({ status: "ready", profile: cached.data, error: null });
        } else {
          setState({ status: "error", profile: null, error: err.message });
        }
      }
    }
    if (cached && !cached.isStale) return;
    run();
    return () => { cancelled = true; };
  }, [username]);

  return state;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target == null) return;
    let raf;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

/* =========================================================================
   REPO ARCHIVE (live GitHub data)
   ========================================================================= */

function RepoArchive({ activeDomain, status, repos, error }) {
  const [query, setQuery] = useState("");
  const [selectedLangs, setSelectedLangs] = useState([]);

  const allLangs = useMemo(() => {
    const s = new Set();
    repos.forEach((r) => r.language && s.add(r.language));
    return Array.from(s).sort();
  }, [repos]);

  const toggleLang = (l) =>
    setSelectedLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const filtered = useMemo(() => {
    return repos.filter((r) => {
      if (activeDomain && r.domain !== activeDomain) return false;
      if (selectedLangs.length && !selectedLangs.includes(r.language)) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = (r.name + " " + r.description + " " + (r.language || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [repos, activeDomain, selectedLangs, query]);

  return (
    <section id="archive" className="relative py-20 sm:py-28 px-5 sm:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Live from the GitHub API"
          title="All open source repositories"
          subtitle={
            <>
              Fetched directly from{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:underline underline-offset-4"
              >
                github.com/{GH_USERNAME}
                <NewTabHint />
              </a>{" "}
              on page load &mdash; search or filter by language and the grid updates live.
            </>
          }
          quirk={`df -h /dev/github/${GH_USERNAME}`}
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories\u2026"
              aria-label="Search repositories"
              disabled={status !== "ready"}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition disabled:opacity-50"
            />
          </div>
        </div>

        {status === "ready" && (
          <div className="flex flex-wrap gap-2 mb-8">
            {allLangs.map((l, li) => {
              const active = selectedLangs.includes(l);
              return (
                <motion.button
                  key={l}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: li * 0.02 }}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => toggleLang(l)}
                  aria-pressed={active}
                  aria-label={`Filter by ${l}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono transition-colors ${
                    active
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 text-slate-300 hover:border-white/25 hover:text-slate-200"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[l] || LANGUAGE_FALLBACK_COLOR }}
                  />
                  {l}
                </motion.button>
              );
            })}
            {selectedLangs.length > 0 && (
              <button
                onClick={() => setSelectedLangs([])}
                className="rounded-full px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 underline underline-offset-4"
              >
                reset
              </button>
            )}
          </div>
        )}

        {status === "loading" && (
          <div className="flex items-center gap-2.5 mb-6 font-mono text-xs text-cyan-300/80">
            <span className="h-3 w-3 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
            fetching public repositories from github&hellip;
          </div>
        )}

        {status === "ready" && (
          <div className="text-xs font-mono text-slate-500 mb-4">
            {filtered.length} {filtered.length === 1 ? "repository" : "repositories"}
          </div>
        )}

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-5 h-32"
              >
                <div className="h-3.5 w-2/3 rounded bg-white/10 mb-3" />
                <div className="h-2.5 w-full rounded bg-white/5 mb-2" />
                <div className="h-2.5 w-4/5 rounded bg-white/5 mb-4" />
                <div className="h-4 w-16 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 py-14 px-6 text-center">
            <div className="font-mono text-xs text-slate-400 leading-relaxed">
              {error === "rate_limit"
                ? "GitHub's public API rate limit was hit (60 requests / hour for unauthenticated calls). Try again shortly."
                : "Couldn't reach the GitHub API from here."}
            </div>
            <a
              href={`${GITHUB_URL}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-xs text-cyan-300 hover:bg-cyan-400/20 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> View repositories on GitHub
              <NewTabHint />
            </a>
          </div>
        )}

        {status === "ready" && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((r, ri) => {
                const d = DOMAINS[r.domain];
                const langColor = r.language ? LANGUAGE_COLORS[r.language] || LANGUAGE_FALLBACK_COLOR : null;
                return (
                  <motion.a
                    layout
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3, delay: Math.min(ri, 8) * 0.03, ease: "easeOut" }}
                    className={`group block rounded-xl border ${d.border} bg-white/5 hover:bg-white/10 p-5 transition-colors border-l-2 ${d.borderStrong}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-slate-100 leading-snug">
                        {r.name}
                      </h3>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                      <NewTabHint />
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {r.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      {langColor ? (
                        <LangBadge label={r.language} hex={langColor} />
                      ) : (
                        <span className="text-xs font-mono text-slate-500">&mdash;</span>
                      )}
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-500 shrink-0">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3" /> {r.stars}
                        </span>
                        <span className="hidden sm:inline">{timeAgo(r.updatedAt)}</span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {status === "ready" && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            no repositories match this query &mdash; try clearing a filter
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================================
   CONTACT / FOOTER
   ========================================================================= */

function Contact({ onOpenResume }) {
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-5 sm:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent px-4 py-12 sm:py-16 text-center relative overflow-hidden group">
          {/* Quirk: Background matrix packet stream telemetry lines */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-4 font-mono text-[9px] text-slate-700 select-none hidden md:block text-left"
          >
            PING rga.dev (127.0.0.1) 56(84) bytes of data.<br/>
            64 bytes from localhost: icmp_seq=1 ttl=64 time=0.031 ms
          </div>
          
          <div className="font-mono text-xs tracking-widest text-cyan-400/70 uppercase mb-4">
            uplink established
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-50">
            Let&rsquo;s build something
            <br className="hidden sm:block" /> that ships.
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-900 px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              <Mail className="h-6 w-4 shrink-0" /> 
              <span className="truncate max-w-[140px] sm:max-w-xs">
                {EMAIL}
              </span>
            </motion.a>
            <motion.button
              onClick={onOpenResume}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-slate-300 px-5 py-3 text-sm hover:border-white/30 hover:text-white transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </motion.button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 text-slate-300 px-4 py-2.5 text-sm hover:text-slate-100 hover:border-white/25 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> github.com/death7654
              <NewTabHint />
            </motion.a>
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 text-slate-300 px-4 py-2.5 text-sm hover:text-slate-100 hover:border-white/25 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/robinsonarysseril
              <NewTabHint />
            </motion.a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <span>&copy; {new Date().getFullYear()} Robinson</span>
          <span>Built with React &middot; Tailwind &middot; Framer Motion</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   RESUME PAGE
   ========================================================================= */

function ResumeCard({ variant, index }) {
  const d = DOMAINS[variant.domain];
  return (
    <TiltCard maxTilt={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        whileHover={{ y: -4, boxShadow: d.glowShadow }}
        className={`group relative flex flex-col h-full rounded-2xl border ${d.border} bg-white/5 hover:bg-white/10 transition-colors p-6 sm:p-7`}
      >
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full border ${d.borderStrong} ${d.bg}`}>
          <FileText className={`h-5 w-5 ${d.text}`} strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-semibold text-slate-100 tracking-tight">{variant.label}</h3>
        <p className="mt-2.5 text-sm text-slate-300 leading-relaxed flex-1">{variant.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-slate-500 truncate">{variant.fileName}</span>
          <motion.a
            href={variant.url}
            download={variant.fileName}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border ${d.borderStrong} ${d.bg} px-3.5 py-2 text-xs ${d.text} hover:brightness-110 transition-all`}
          >
            <Download className="h-3.5 w-3.5" /> Download
          </motion.a>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function ResumePage({ onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen"
    >
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ backgroundColor: "rgba(11, 15, 25, 0.72)" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-sm text-slate-300 hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-sm text-slate-200"
          >
            <Terminal className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
            <span className="tracking-tight">rga<span className="text-cyan-400">.</span>dev</span>
          </button>
        </div>
      </header>

      <section className="relative pt-32 sm:pt-40 pb-24 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="font-mono text-xs tracking-widest text-cyan-400/70 uppercase mb-5">
            select a build target
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-slate-50 max-w-3xl">
            Four resumes, one engineer.
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300 text-base leading-relaxed">
            Same experience, weighted differently depending on the role. Pick whichever
            matches what you&rsquo;re hiring for, or grab them all.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RESUME_VARIANTS.map((variant, i) => (
              <ResumeCard key={variant.key} variant={variant} index={i} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-xs text-slate-400 leading-relaxed">
            Not sure which one? Reach out at{" "}
            <a href={`mailto:${EMAIL}`} className="text-cyan-300 hover:underline underline-offset-4">
              {EMAIL}
            </a>{" "}
            and I&rsquo;ll send the right one directly.
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   BACK TO TOP
   ========================================================================= */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Back to top"
          style={{ zIndex: 55 }}
          className="fixed bottom-6 right-5 sm:right-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B0F19]/90 backdrop-blur text-slate-300 shadow-lg hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* =========================================================================
   APP
   ========================================================================= */

export default function Portfolio() {
  const [phase, setPhase] = useState("kernel");
  const [activeDomain, setActiveDomain] = useState(null);
  const kernelDoneRef = useRef(false);

  // Minimal client-side routing — just enough to give the resume picker its own page/URL
  // without pulling in a router dependency.
  const [route, setRoute] = useState(() => {
    try {
      return window.location.pathname.replace(/\/+$/, "") === "/resume" ? "resume" : "home";
    } catch {
      return "home";
    }
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname.replace(/\/+$/, "") === "/resume" ? "resume" : "home");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goToResume = useCallback(() => {
    if (window.location.pathname !== "/resume") {
      window.history.pushState({}, "", "/resume");
    }
    setRoute("resume");
    window.scrollTo(0, 0);
    kernelDoneRef.current = true;
    setPhase("ready");
  }, []);

  const goHome = useCallback(() => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    setRoute("home");
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(route);

  const { status: repoStatus, repos, error: repoError } = useGithubRepos(GH_USERNAME);
  const { status: profileStatus, profile } = useGithubProfile(GH_USERNAME);

  const handleKernelDone = () => {
    if (kernelDoneRef.current) return;
    kernelDoneRef.current = true;
    setPhase("ready");
  };

  return (
    <div
      style={{ backgroundColor: "#0B0F19" }}
      className="min-h-screen w-full text-slate-200 antialiased selection:bg-cyan-400/30 selection:text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono, code, pre { font-family: 'JetBrains Mono', ui-monospace, monospace !important; }
        html { scroll-behavior: smooth; }
        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }
        *::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
        .name-shimmer {
          background-size: 200% auto;
          animation: shimmer 7s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .pulse-dot { animation: softPulse 2.2s ease-in-out infinite; }
        :focus-visible {
          outline: 2px solid #22D3EE;
          outline-offset: 2px;
          border-radius: 4px;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 32s linear infinite;
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <ParallaxBackdrop />

      {route === "resume" ? (
        <AnimatePresence mode="wait">
          <ResumePage key="resume" onBack={goHome} />
        </AnimatePresence>
      ) : (
        <>
          <AnimatePresence>
            {phase === "kernel" && <BootSequence key="kernel" onDone={handleKernelDone} />}
          </AnimatePresence>

          <ScrollProgress />

          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <Header onOpenResume={goToResume} />
              <Hero activeDomain={activeDomain} setActiveDomain={setActiveDomain} onOpenResume={goToResume} />
              <StatsStrip
                repoStatus={repoStatus}
                repos={repos}
                profileStatus={profileStatus}
                profile={profile}
              />
              <SkillsMarquee />
              <FeaturedProjects activeDomain={activeDomain} />
              <Experience />
              <RepoArchive activeDomain={activeDomain} status={repoStatus} repos={repos} error={repoError} />
              <Contact onOpenResume={goToResume} />
            </motion.div>
          )}
          <BackToTop />
        </>
      )}
    </div>
  );
}