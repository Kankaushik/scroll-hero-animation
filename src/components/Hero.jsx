import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { id: "stat-0", value: "58%", label: ["Increase in", "user engagement"],  pos: "above", side: "left"  },
  { id: "stat-1", value: "23%", label: ["Decrease in", "response time"],    pos: "above", side: "right" },
  { id: "stat-2", value: "27%", label: ["Increase in", "productivity"],     pos: "below", side: "left"  },
  { id: "stat-3", value: "40%", label: ["Decrease in", "support requests"], pos: "below", side: "right" },
];

export default function Hero() {
  const wrapperRef    = useRef(null);
  const headlineRef   = useRef(null);
  const taglineRef    = useRef(null);
  const ballRef       = useRef(null);
  const trailRef      = useRef(null);
  const scrollHintRef = useRef(null);
  const statsRef      = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── INTRO ANIMATIONS (on page load) ──────────────────

        gsap.fromTo(headlineRef.current,
          { opacity: 0, y: -28 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.15 }
        );

        gsap.fromTo(taglineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );

        // Stats 0 & 1 fold open on load (fromTo for reliable reverse)
        gsap.fromTo(statsRef.current[0],
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.65, ease: "power2.out", delay: 0.65 }
        );
        gsap.fromTo(statsRef.current[1],
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.65, ease: "power2.out", delay: 0.85 }
        );

        // ── SCROLL TIMELINE ───────────────────────────────────
        // All tweens use fromTo so reversing (scroll back) is precise.

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });

        tl.fromTo(scrollHintRef.current,
          { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0);

        // Ball rolls across road (single tween, no overlap = no jump)
        tl.fromTo(ballRef.current,
          { x: -160 }, { x: "120vw", duration: 2, ease: "none" }, 0);

        // Trail fills behind ball
        tl.fromTo(trailRef.current,
          { width: 0 }, { width: "100%", duration: 2, ease: "none" }, 0);

        // Stats 0 & 1 fold closed as ball passes
        tl.fromTo(statsRef.current[0],
          { scaleY: 1, opacity: 1 },
          { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.3);
        tl.fromTo(statsRef.current[1],
          { scaleY: 1, opacity: 1 },
          { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.45);

        // Headline + tagline fade out
        tl.fromTo(headlineRef.current,
          { opacity: 1, y: 0 }, { opacity: 0, y: -16, duration: 0.35 }, 0.5);
        tl.fromTo(taglineRef.current,
          { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0.5);

        // Stats 2 & 3 fold open below road
        tl.fromTo(statsRef.current[2],
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 1.0);
        tl.fromTo(statsRef.current[3],
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 1.2);

        // Stats 2 & 3 fold closed at end
        tl.fromTo(statsRef.current[2],
          { scaleY: 1, opacity: 1 }, { scaleY: 0, opacity: 0, duration: 0.3 }, 1.7);
        tl.fromTo(statsRef.current[3],
          { scaleY: 1, opacity: 1 }, { scaleY: 0, opacity: 0, duration: 0.3 }, 1.85);

      }, wrapperRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div ref={wrapperRef} className="hero-wrapper" id="hero">
        <div className="hero-track">

          {/* TOP BAND — headline + stats above road */}
          <div className="band-top">
            <h1 ref={headlineRef} className="headline-main">
              W&nbsp;E&nbsp;L&nbsp;C&nbsp;O&nbsp;M&nbsp;E&nbsp;&nbsp;
              <em>I&nbsp;T&nbsp;Z&nbsp;F&nbsp;I&nbsp;Z&nbsp;Z</em>
            </h1>
            <p ref={taglineRef} className="headline-tagline">
              Scroll to experience the journey
            </p>

            {STATS.filter(s => s.pos === "above").map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                ref={el => { statsRef.current[i] = el; }}
                className={`stat-card above side-${s.side}`}
              >
                <div className="stat-value">{s.value}</div>
                <div className="stat-desc">
                  {s.label.map((l, j) => <span key={j}>{l}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* ROAD — ball + trail */}
          <div className="road">
            <div className="road-dashes" />
            <div ref={trailRef} className="trail" />
            <div ref={ballRef} className="ball-wrap">
              <img src="/ball.jpg" alt="football" className="ball-img" draggable="false" />
            </div>
          </div>

          {/* BOTTOM BAND — stats below road + scroll hint */}
          <div className="band-bottom">
            {STATS.filter(s => s.pos === "below").map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                ref={el => { statsRef.current[i + 2] = el; }}
                className={`stat-card below side-${s.side}`}
              >
                <div className="stat-value">{s.value}</div>
                <div className="stat-desc">
                  {s.label.map((l, j) => <span key={j}>{l}</span>)}
                </div>
              </div>
            ))}

            <div ref={scrollHintRef} className="scroll-hint">
              <span className="scroll-hint-label">Scroll</span>
              <div className="scroll-hint-arrow" />
            </div>
          </div>

        </div>
      </div>

      <section className="after-hero">
        <h2>Continue Exploring</h2>
      </section>
    </>
  );
}
