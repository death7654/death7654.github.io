# Robinson George Arysseril — portfolio

React + Vite, styled with the pink/mint theme from the original `index.html`.

    npm install
    npm run dev       # local
    npm run build     # static site in dist/

No other dependencies: Tailwind, framer-motion and lucide-react are no longer used.

## Add your files
- `public/assets/` — `chrultrabook_tools.mp4`, `driver.mp4`, `chip8.mp4` (optional; text fallback if missing)
- `public/resumes/` — the four PDFs, named as in `public/resumes/README.txt`

## Where things live
- `src/data.js` — all content (facts, featured projects, experience, resumes, static repo list)
- `src/Portfolio.jsx` — page composition, hash routing (`#/resume`), `/` terminal shortcut
- `src/components/` — one file per section
- `src/lib/critters.js` — the bug + eskrima fighter (ported from the old script.js)
- `src/index.css` — original `style.css` followed by the additions
