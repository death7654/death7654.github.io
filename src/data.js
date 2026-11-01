/* =========================================================================
   DATA — one source of truth for every section.
   Merged from the original index.html and Portfolio.jsx.
   ========================================================================= */

export const GH_USERNAME = "death7654";
export const GITHUB_URL = `https://github.com/${GH_USERNAME}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/robinsonarysseril/";
export const INSTAGRAM_URL = "https://www.instagram.com/robinsongeorge301/";
export const EMAIL = "robinsonarysseril@gmail.com";

/** Resolve a path in /public against Vite's base URL. */
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

/* ---------- Links section (cards recolor the whole page on hover) ---------- */

export const LINKS = [
  { name: "GitHub", handle: "death7654", url: GITHUB_URL, color: "#e6edf3" },
  { name: "LinkedIn", handle: "robinsonarysseril", url: LINKEDIN_URL, color: "#4da3d9" },
  { name: "Instagram", handle: "robinsongeorge301", url: INSTAGRAM_URL, color: "#e1306c" },
];

/* ---------- About ---------- */

export const FACTS = [
  {
    k: "studying",
    v: "B.Tech in Artificial Intelligence and Data Science (Honors), Vimal Jyothi Engineering College, Chemperi. Third year, CGPA 9.46, Sep. 2024 to May 2028.",
  },
  {
    k: "open source",
    v: "Long-term contributor to the Chrultrabook project, with more than 47,000 downloads.",
  },
  {
    k: "research",
    v: "Remote AI research internship at Amrita School of Artificial Intelligence, under Dr. Premjith B.",
  },
  {
    k: "building now",
    v: "null32 (an OS for the ESP32), a Rust quantization engine, BusMitra (bus crowd prediction), and AXIOM (crash alert system for a mountain bike).",
  },
  {
    k: "outside code",
    v: "I trained in eskrima, the Filipino stick-fighting art. The sprite carries two sticks for a reason.",
  },
];

/* ---------- Skills ticker ---------- */

export const ALL_SKILLS = [
  "C/C++", "Rust", "Zig", "Xtensa Assembly", "SPI", "UART", "GPIO", "FAT32",
  "MBR", "Interrupt Handling", "DMA", "LLVM", "PyTorch", "TensorFlow",
  "Transformers", "Scikit-Learn", "Pandas", "NumPy", "LSTM",
  "Prompt Engineering", "Python", "Java", "JavaScript", "TypeScript",
  "MySQL", "REST APIs", "Tauri", "Angular", "Kafka", "PySpark",
];

/* ---------- Repo categories ---------- */

export const DOMAIN_LIST = [
  { key: "emu", label: "Emulators & virtual machines", short: "Emulation", hex: "#4C8DFF" },
  { key: "compilers", label: "Compilers & JIT engines", short: "Compilers", hex: "#9D7BFF" },
  { key: "os", label: "Operating systems & low-level", short: "OS / Kernel", hex: "#2EE6D6" },
  { key: "chromebook", label: "Chromebook ecosystem tools", short: "Chromebook", hex: "#FFB454" },
  { key: "ml", label: "Machine learning & AI", short: "ML / AI", hex: "#2EE6A0" },
  { key: "finance", label: "Finance & trading", short: "Finance", hex: "#C6E86B" },
  { key: "web", label: "Web apps & frontends", short: "Web", hex: "#FF6FB5" },
  { key: "misc", label: "Hackathon & misc", short: "Misc", hex: "#FF6B5B" },
];

export const DOMAINS = Object.fromEntries(DOMAIN_LIST.map((d) => [d.key, d]));

/* ---------- Featured projects ---------- */
/* `video` is optional: the media panel falls back to text if it is missing. */

export const FEATURED = [
  {
    id: "chrultrabook",
    title: "Chrultrabook Tools",
    url: "https://github.com/death7654/Chrultrabook-Tools",
    video: "assets/chrultrabook_tools.mp4",
    meta: "TypeScript + Rust · 117 stars · 47,000+ downloads",
    description:
      "A tool that adds back lost functionality and new features to Chromebooks running Windows, Linux and macOS. A Rust backend gives it direct hardware access, low-latency sensor polling and fan-curve calculations, exposed over IPC to a polished frontend.",
  },
  {
    id: "driver-installer",
    title: "Chromebook Driver Installer",
    url: "https://github.com/death7654/Chromebook-Driver-Installer",
    video: "assets/driver.mp4",
    meta: "Rust · 29 stars",
    description:
      "A one-click tool that detects and installs missing drivers on Chromebooks running Windows.",
  },
  {
    id: "chip8",
    title: "Chip8 Emulator",
    url: "https://github.com/death7654/CHIP8-Emulator-CPP",
    video: "assets/chip8.mp4",
    meta: "C++ · rebuilt in Rust, Zig and an x86-64 JIT",
    description:
      "A program that replicates the Chip8 interpreter. I've since rebuilt it in Rust, Zig, and with an x86-64 JIT.",
  },
  {
    id: "null32",
    title: "Bare Metal ESP32 Kernel",
    url: "https://github.com/death7654/null32",
    video: "assets/esp32.gif",
    meta: "C · Xtensa assembly · built from the TRM up",
    description:
      "A two-stage bootloader and kernel for the ESP32, built entirely from the Technical Reference Manual. It has a custom Xtensa assembly trampoline that moves the kernel from DRAM to IRAM, a register-level SPI/SD driver, a FAT32 driver that walks cluster chains, and an interactive kernel shell with its own script interpreter.",
  },
  {
    id: "nes",
    title: "NES Emulator",
    url: "https://github.com/death7654/NES-Emulator-Rust",
    meta: "Rust · full core in about 48 hours",
    description:
      "A from-scratch Nintendo Entertainment System emulator. It decodes 6502 opcodes through aaa/bbb/cc bit-groups, shares a CPU/PPU bus, supports MMC1 mappers, and keeps scanline-accurate PPU timing checked against real cartridge behavior.",
  },
  {
    id: "gameboy",
    title: "Game Boy Emulator",
    url: "https://github.com/death7654/Gameboy-Emulator-Rust",
    meta: "Rust · cycle-accurate DMG core",
    description:
      "A cycle-accurate Game Boy (DMG) emulator with a Sharp LR35902 CPU core, a scanline PPU pipeline with tile caching and sprite compositing, MBC1/MBC3 memory bank controllers, and exact OAM DMA timing.",
  },
  {
    id: "rumbleguard",
    title: "RumbleGuard",
    url: "https://github.com/death7654/RumbleGuard",
    meta: "Rust + TypeScript + Angular · real-time audio DSP on Android",
    description:
      "An app that turns a phone's microphone into a real-time cabin noise canceller. A Tauri/Rust core runs live FFT analysis and adaptive EQ compensation behind an Angular frontend, shipped to Android. It began as a hackathon build.",
  },
  {
    id: "news-bias",
    title: "News Bias Classifier",
    url: "https://github.com/death7654/News-Bias-Classifier",
    meta: "Python · 94% accuracy with BART-large-MNLI",
    description:
      "A research pipeline for detecting linguistic bias in news headlines on the BABE dataset, built during the Amrita internship. Eight modeling stages, from a TextBlob baseline to a fine-tuned facebook/bart-large-mnli, benchmarked against Qwen2, DeBERTa and a zero-shot SmolLM2 pipeline.",
  },
];

/* ---------- Experience ---------- */

export const EXPERIENCE = [
  {
    role: "Research Intern",
    org: "Amrita School of Artificial Intelligence",
    period: "May 2026 to Jun. 2026",
    points: [
      "Investigated and mitigated linguistic gender bias in AI systems under Dr. Premjith B.",
      "Built an NLP pipeline using Sentence-BERT embeddings and a custom 5-layer feed-forward PyTorch architecture optimizing dual cross-entropy / contrastive loss functions.",
      "Designed a self-correcting two-step LLM prompting framework built on SmolLM2.",
    ],
  },
  {
    role: "Open Source Contributor",
    org: "Chrultrabook Project",
    period: "May 2023 to present",
    points: [
      "Maintain primary systems tooling and resolve upstream documentation gaps.",
      "Manage centralized hardware compatibility schemas across supported devices.",
      "Provide low-level support for thousands of alternate-OS desktop environments.",
    ],
  },
];

/* ---------- Resume variants ---------- */
/* Put the PDFs in /public/resumes using the names in `url`. */

export const RESUME_VARIANTS = [
  {
    key: "systems",
    label: "Systems & Embedded",
    description:
      "Bare-metal kernels, register-level drivers, and cycle-accurate emulators, for embedded, firmware, and low-level systems roles.",
    fileName: "Robinson-Arysseril-Resume-Systems.pdf",
    url: "resumes/RobinsonResumeSystems.pdf",
  },
  {
    key: "swe",
    label: "Software Engineering",
    description:
      "Cycle-accurate emulators and cross-platform tooling shipped to 47,000+ users, plus a bare-metal kernel built from the reference manual up, for general SWE and backend roles.",
    fileName: "Robinson-Arysseril-Resume-SWE.pdf",
    url: "resumes/RobinsonResumeSWE.pdf",
  },
  {
    key: "ml",
    label: "Machine Learning & AI",
    description:
      "NLP bias-classification research, contrastive representation learning, and applied ML, for AI/ML research and engineering roles.",
    fileName: "Robinson-Arysseril-Resume-ML.pdf",
    url: "resumes/RobinsonResumeML.pdf",
  },
  {
    key: "data-science",
    label: "Data Science",
    description:
      "Forecasting pipelines, statistical modeling, and data engineering, for data science and analytics roles.",
    fileName: "Robinson-Arysseril-Resume-DataScience.pdf",
    url: "resumes/RobinsonResumeDataScience.pdf",
  },
];

/* ---------- Boot sequence ---------- */

export const BOOT_LINES = [
  { text: "┌─────────────────────────────────────────────┐", tag: "art", delay: 35 },
  { text: "│         R . G . A .   S Y S T E M S         │", tag: "art", delay: 35 },
  { text: "└─────────────────────────────────────────────┘", tag: "art", delay: 60 },
  { text: "", tag: "blank", delay: 90 },
  { text: "robinson_os v2.6.0-arysseril (rustc 1.79.0, xtensa-gcc 12.2)", tag: "info", delay: 110 },
  { text: "Copyright (c) 2024-2026 R.G.A. Systems. All rights reserved.", tag: "muted", delay: 90 },
  { text: "", tag: "blank", delay: 70 },
  { text: "[    0.000000] Booting kernel …", tag: "ok", delay: 130 },
  { text: "[    0.014221] CPU0: dual-core detected — LR35902 + Xtensa LX6", tag: "ok", delay: 140 },
  { text: "[    0.032108] Initializing SPI0, UART1, GPIO bank A/B …", tag: "ok", delay: 140 },
  { text: "[    0.048873] Mounting root filesystem (FAT32) … done", tag: "ok", delay: 140 },
  { text: "[    0.066932] Probing memory-mapped I/O regions", tag: "ok", delay: 130 },
  { text: "[    0.081410] DMA controller: 4 channels online", tag: "ok", delay: 130 },
  { text: "[    0.093003] Loading kernel modules:", tag: "info", delay: 110 },
  { text: "progress", tag: "progress", delay: 900 },
  { text: "[    1.021552] all modules loaded ok", tag: "ok", delay: 130 },
  { text: "[    1.048887] uplink to github.com/death7654 … connected", tag: "ok", delay: 160 },
  { text: "[    1.069213] auth robinson_george_arysseril … granted", tag: "ok", delay: 160 },
  { text: "", tag: "blank", delay: 90 },
  { text: "> whoami", tag: "prompt", delay: 100 },
  { text: "robinson_george_arysseril", tag: "muted", delay: 120 },
  { text: "", tag: "blank", delay: 80 },
  { text: "welcome back, robinson.", tag: "final", delay: 550 },
];

/* =========================================================================
   STATIC REPO LIST — the offline / rate-limited fallback.
   Straight from the original index.html. Live GitHub data replaces it.
   ========================================================================= */

const SEG_KEYS = DOMAIN_LIST.map((d) => d.key);

// [name, description, language, stars?, useProfileLink?]
const SEGS = [
  [
    ["CHIP8-Emulator-CPP", "Chip8 Emulator built in C++", "C++"],
    ["Chip8-Emulator-Rust", "Chip8 Emulator built in Rust", "Rust"],
    ["Gameboy-Emulator-Rust", "A cycle accurate Gameboy emulator built in Rust", "Rust"],
    ["Intel-8080-Emulator", "A Space Invaders emulator built in C++", "C++"],
    ["NES-Emulator-Rust", "A NES emulator made in Rust", "Rust"],
    ["XO-Chip-Emulator-Zig", "An XO Chip emulator built in Zig", "Zig"],
  ],
  [
    ["BrainFuck-Jit", "A hands-on journey into JIT compilation", "Rust"],
    ["Chip8-JIT-Rust", "A high-performance CHIP-8 emulator in Rust featuring an x86-64 just-in-time compiler", "Rust"],
  ],
  [
    ["ASCII-Cinema", "Terminal movie booking system in C with a hand-written BMP parser", "C"],
    ["FAT32-Reader-Windows", "A FAT32 raw disk parser written in C using Windows-level APIs", "C"],
    ["null32", "An operating system for the ESP32 built from scratch", "C"],
    ["GfxLess", "", "Rust"],
    ["Quantization-Engine", "", "Rust"],
  ],
  [
    ["Chrultrabook-Tools", "User-friendly configuration utility for Chromebooks running an alternate OS", "TypeScript", 117],
    ["Chromebook-Driver-Installer", "A one click Windows driver installer for modified Chromebooks", "Rust", 29],
    ["ChromebookDatabase", "General database for Chromebooks and what drivers they require for audio", "Rust"],
    ["AntiPop-For-Chromebooks", "Prevents popping sound when audio starts playing", "C++"],
    ["chromium-tools", "Various Chromium tools for Chromebooks running Linux", ""],
    ["crosskb-config-generator", "A repository to program and test a keyboard remapper for Chromebooks", "Rust"],
    ["Driver-Installer-Links", "", ""],
  ],
  [
    ["ML-Algorithms", "My implementation of machine learning algorithms without any libraries", "C++"],
    ["News-Bias-Classifier", "Bias detection project using NLP techniques", "Jupyter Notebook"],
    ["Stock-Market-Predictor-ML", "A stock market predictor using an LSTM based neural network", "Python", 0, true],
    ["Pothole_Detection_ML_Model", "A machine learning algorithm to detect potholes", "Python"],
  ],
  [
    ["SentinelDeFi", "End-to-end streaming pipeline for detecting anomalous DeFi transactions in real time", "Python"],
    ["Stock-Market-Predictor-Frontend", "", "TypeScript"],
  ],
  [
    ["RumbleGuard", "An application that uses your phone's mic to cancel out a car's cabin sounds", "Rust"],
    ["Cherry-Labs", "A frontend for Gemini built in C#", "C#"],
    ["death7654", "My public profile", ""],
    ["death7654.github.io", "A website documenting my journey into programming", "HTML"],
  ],
  [["OpenVoice-Open5ox", "A project for FOSSHACK 1.0", "TypeScript"]],
];

export const STATIC_REPOS = SEGS.flatMap((group, i) =>
  group.map(([name, description, language, stars, profileLink]) => ({
    id: `static:${name}`,
    name,
    description,
    language: language || null,
    domain: SEG_KEYS[i],
    stars: stars || 0,
    url: profileLink ? `${GITHUB_URL}?tab=repositories` : `${GITHUB_URL}/${name}`,
  })),
);

/* =========================================================================
   DOMAIN CLASSIFICATION for live GitHub repos
   Manual table first (wins outright), keyword scoring for anything new.
   ========================================================================= */

const LOW_LEVEL_LANGS = new Set([
  "C", "C++", "Rust", "Zig", "Assembly", "Makefile", "Shell", "Dockerfile", "Nix",
]);
const ML_LANGS = new Set(["Python", "Jupyter Notebook", "R", "MATLAB"]);

const STATIC_REPO_DOMAINS = {
  "chrultrabook-tools": "chromebook",
  "chromebook-driver-installer": "chromebook",
  chromebookdatabase: "chromebook",
  "antipop-for-chromebooks": "chromebook",
  "driver-installer-links": "chromebook",
  "croskb4-config-generator": "chromebook",
  "crosskb-config-generator": "chromebook",
  "chromium-tools": "chromebook",
  rumbleguard: "web",
  "ml-algorithms": "ml",
  null32: "os",
  "death7654.github.io": "web",
  "nes-emulator-rust": "emu",
  death7654: "web",
  "stock-market-predictor-ml-model": "ml",
  "stock-market-predictor-ml": "ml",
  "pothole_detection_ml_model": "ml",
  "chip8-emulator-rust": "emu",
  "chip8-emulator-cpp": "emu",
  "chip8-jit-rust": "compilers",
  "brainfork-jit": "compilers",
  "brainfuck-jit": "compilers",
  "xo-chip-emulator-zig": "emu",
  "intel-8080-emulator": "emu",
  "gameboy-emulator-rust": "emu",
  "news-bias-classifier": "ml",
  "fat32-reader-windows": "os",
  "ascii-cinema": "os",
  gfxless: "os",
  "quantization-engine": "os",
  binancetradingbot: "finance",
  sentineldefi: "finance",
  "cherry-labs": "web",
  "movie-ticket-booking-system": "os",
  "openvoice-openbox": "misc",
  "openvoice-open5ox": "misc",
  todo_list_rust: "os",
  "stock-market-predictor-frontend": "finance",
};

const DOMAIN_KEYWORDS = {
  emu: ["emulator", "chip8", "chip-8", "gameboy", "game-boy", "nes", "console", "mapper", "8080", "xo-chip", "cartridge", "rom"],
  compilers: ["compiler", "jit", "interpreter", "bytecode", "recompiler", "transpiler", "assembler", "vm", "virtual-machine"],
  os: ["kernel", "os", "bootloader", "firmware", "bare-metal", "baremetal", "xtensa", "esp32", "embedded", "interrupt", "fat32", "filesystem", "rtos", "microcontroller", "spi", "uart", "gpio"],
  chromebook: ["chromebook", "chrome-os", "chromeos", "coolstar", "driver"],
  ml: ["ml", "ai", "model", "classifier", "classification", "predictor", "prediction", "neural", "nlp", "bias", "lstm", "dataset", "bert", "machine-learning", "sentiment", "transformer", "embedding", "pytorch", "tensorflow", "forecast", "llm"],
  finance: ["stock", "trading", "defi", "crypto", "binance", "finance", "market", "blockchain", "streaming-pipeline", "kafka"],
  web: ["web", "webapp", "frontend", "front-end", "react", "angular", "website", "portfolio", "api", "ui", "fullstack", "full-stack", "database", "booking", "ticket"],
  misc: ["hackathon", "fosshack", "hack", "demo", "prototype", "experiment"],
};

const score = (text, kws) => kws.reduce((n, kw) => (text.includes(kw) ? n + 1 : n), 0);

export function inferDomain({ name, description, topics, language }) {
  const known = STATIC_REPO_DOMAINS[(name || "").toLowerCase()];
  if (known) return known;

  const text = [name, description, ...(topics || [])].filter(Boolean).join(" ").toLowerCase();
  const scores = Object.entries(DOMAIN_KEYWORDS).map(([k, kws]) => [k, score(text, kws)]);
  const [top, topScore] = scores.sort((a, b) => b[1] - a[1])[0];
  if (topScore > 0) return top;

  if (LOW_LEVEL_LANGS.has(language)) return "os";
  if (ML_LANGS.has(language)) return "ml";
  return "web";
}

/** Group a flat repo list into DOMAIN_LIST order, dropping empty groups. */
export function groupByDomain(repos) {
  return DOMAIN_LIST.map((d, i) => ({
    ...d,
    index: i,
    repos: repos.filter((r) => r.domain === d.key),
  })).filter((g) => g.repos.length > 0);
}
