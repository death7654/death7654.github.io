import { useEffect, useRef, useState } from "react";
import { calmNow } from "../lib/hooks";

/** Section heading that types itself in once, when it scrolls into view. */
export default function TypeTitle({ children, as: Tag = "h2" }) {
  const text = String(children);
  const ref = useRef(null);
  const [shown, setShown] = useState(() => (calmNow() ? text : ""));
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    if (calmNow()) {
      setShown(text);
      return;
    }
    let timer;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        let i = 0;
        const step = () => {
          setShown(text.slice(0, i));
          setCursor(true);
          if (i++ < text.length) timer = setTimeout(step, 55);
          else timer = setTimeout(() => setCursor(false), 1500);
        };
        step();
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <Tag ref={ref} aria-label={text}>
      {shown}
      {cursor && <span className="c" aria-hidden="true" />}
    </Tag>
  );
}
