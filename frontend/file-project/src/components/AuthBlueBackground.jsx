import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../style/auth-background.css";

function AuthBlueBackground() {
  const rootRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(".auth-bg-panel", {
        x: "random(-80, 80)",
        y: "random(-70, 70)",
        skewX: "random(-6, 6)",
        duration: "random(4, 7)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      gsap.to(".auth-bg-beam", {
        xPercent: 18,
        yPercent: -12,
        rotate: "+=8",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1,
      });

      gsap.to(".auth-bg-grid", {
        backgroundPosition: "90px 90px",
        duration: 14,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div className="auth-blue-bg" ref={rootRef} aria-hidden="true">
      <div className="auth-bg-grid" />
      <span className="auth-bg-beam auth-bg-beam-one" />
      <span className="auth-bg-beam auth-bg-beam-two" />
      <span className="auth-bg-panel auth-bg-panel-one" />
      <span className="auth-bg-panel auth-bg-panel-two" />
      <span className="auth-bg-panel auth-bg-panel-three" />
      <span className="auth-bg-panel auth-bg-panel-four" />
    </div>
  );
}

export default AuthBlueBackground;
