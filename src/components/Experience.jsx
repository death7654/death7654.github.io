import { EXPERIENCE } from "../data";
import TypeTitle from "./TypeTitle";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <TypeTitle>Experience</TypeTitle>
        <p className="sub">Research and open source, in order of recency.</p>
        <div className="jobs">
          {EXPERIENCE.map((e) => (
            <article className="job" key={e.role + e.org}>
              <div className="when">{e.period}</div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <ul>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
