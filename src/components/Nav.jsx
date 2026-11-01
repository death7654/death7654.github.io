const ITEMS = [
  ["about", "About"],
  ["featured", "Featured"],
  ["experience", "Experience"],
  ["repos", "Repos"],
  ["links", "Links"],
];

export default function Nav({ active, onGo, onResume, onTerminal }) {
  return (
    <nav aria-label="Primary">
      <div className="wrap">
        <b>~/robinson</b>
        {ITEMS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`nv${active === id ? " on" : ""}`}
            aria-current={active === id ? "true" : undefined}
            onClick={() => onGo(id)}
          >
            {label}
          </button>
        ))}
        <button type="button" className="chip rbtn" onClick={onResume}>
          Resume
        </button>
        <button type="button" id="tbtn" className="chip" aria-label="Open terminal" onClick={onTerminal}>
          &gt;_<span className="lbl"> terminal</span>
        </button>
      </div>
    </nav>
  );
}
