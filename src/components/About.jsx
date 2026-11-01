import { useRef } from "react";
import { FACTS } from "../data";
import { useCountUp, useInView } from "../lib/hooks";
import TypeTitle from "./TypeTitle";

function Stat({ label, value, ready }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const n = useCountUp(value, ready && seen);
  return (
    <div className="stat" ref={ref}>
      <b>{ready ? n.toLocaleString() : "–"}</b>
      <span>{label}</span>
    </div>
  );
}

export default function About({ repoState, profileState }) {
  const ready = repoState.status === "ready" && profileState.status === "ready";
  return (
    <section id="about">
      <div className="wrap">
        <TypeTitle>About</TypeTitle>
        <p className="sub">My life goal is to do as many unique things as possible, and to be happy.</p>
        <dl className="facts">
          {FACTS.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        <p className="eyebrow">$ curl api.github.com/users/death7654</p>
        <div className="stats">
          <Stat label="github stars" value={repoState.totalStars} ready={ready} />
          <Stat label="forks" value={repoState.totalForks} ready={ready} />
          <Stat label="followers" value={profileState.profile?.followers ?? 0} ready={ready} />
        </div>
      </div>
    </section>
  );
}
