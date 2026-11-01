import { ALL_SKILLS } from "../data";

/** Ambient skills ticker. The list is doubled so the -50% loop is seamless. */
export default function Marquee() {
  const track = [...ALL_SKILLS, ...ALL_SKILLS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {track.map((s, i) => (
          <span key={`${s}-${i}`}>{s}</span>
        ))}
      </div>
    </div>
  );
}
