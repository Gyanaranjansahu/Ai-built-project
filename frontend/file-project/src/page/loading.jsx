import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "../style/loading.css";

export default function LoadingPage() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(".loading-glow", {
        x: "random(-90, 90)",
        y: "random(-80, 80)",
        scale: "random(0.85, 1.2)",
        duration: "random(4, 7)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });

      gsap.to(".loading-dot", {
        y: -18,
        opacity: 1,
        duration: 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
      });

      gsap.to(".loading-ring", {
        rotate: 360,
        duration: 7,
        ease: "none",
        repeat: -1,
        stagger: 0.25,
      });
    }, loaderRef);

    return () => context.revert();
  }, []);

  return (
    <div className="loading-container" ref={loaderRef}>
      <div className="loading-bg" aria-hidden="true">
        <span className="loading-glow loading-glow-one" />
        <span className="loading-glow loading-glow-two" />
        <span className="loading-glow loading-glow-three" />
      </div>

      <motion.div
        className="loading-core"
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="loading-ring loading-ring-one" />
        <span className="loading-ring loading-ring-two" />
        <motion.span
          className="loading-pulse"
          animate={{ scale: [0.82, 1.08, 0.82], opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0.55, 1, 0.55], y: 0 }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.h2>

      <div className="loading-dots" aria-hidden="true">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-bar"
          initial={{ x: "-100%" }}
          animate={{ x: "120%" }}
          transition={{
            repeat: Infinity,
            duration: 1.65,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
