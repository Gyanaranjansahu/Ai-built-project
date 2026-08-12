import { Loader2 } from "lucide-react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer";

// deterministic raindrops so they don't jump between renders
const rain = Array.from({ length: 60 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 77.3 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    delay: seed(2) * -1.2,
    duration: 0.5 + seed(3) * 0.5,
    height: 40 + seed(4) * 60,
    opacity: 0.15 + seed(5) * 0.35,
  };
});

export default function LoadingPage({ message = "Reading between the lines..." }) {
  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.2); }
        }
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        /* --- thunderstorm --- */
        @keyframes rainFall {
          0% { transform: translateY(-20vh); }
          100% { transform: translateY(120vh); }
        }
        @keyframes cloudDrift {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(40px); }
        }
        /* screen-wide lightning flash (irregular timing) */
        @keyframes lightningFlash {
          0%, 100% { opacity: 0; }
          49.5% { opacity: 0; }
          50% { opacity: 0.9; }
          50.6% { opacity: 0.25; }
          51.2% { opacity: 0.85; }
          52% { opacity: 0; }
          70% { opacity: 0; }
          70.4% { opacity: 0.6; }
          71% { opacity: 0; }
        }
        @keyframes boltGlow {
          0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 4px rgba(147,197,253,0.4)); }
          48% { opacity: 0.3; }
          50% { opacity: 1; filter: drop-shadow(0 0 22px rgba(191,219,254,0.95)); }
          54% { opacity: 0.5; }
          70% { opacity: 1; filter: drop-shadow(0 0 18px rgba(147,197,253,0.9)); }
          73% { opacity: 0.4; }
        }
        .lp-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        .lp-orbit { animation: orbit-spin 3s linear infinite; }
        .lp-fade-1 { animation: fade-up 0.6s ease-out both; }
        .lp-fade-2 { animation: fade-up 0.6s ease-out 0.1s both; }
        .lp-fade-3 { animation: fade-up 0.6s ease-out 0.2s both; }
        .lp-fade-4 { animation: fade-up 0.6s ease-out 0.3s both; }
        .lp-fade-5 { animation: fade-up 0.6s ease-out 0.4s both; }
        .lp-shimmer { animation: shimmer 1.8s ease-in-out infinite; }
        .lp-flash { animation: lightningFlash 7s ease-in-out infinite; }
        .lp-flash-2 { animation: lightningFlash 11s ease-in-out 3s infinite; }
        .lp-bolt { animation: boltGlow 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-glow,.lp-orbit,.lp-shimmer,.lp-flash,.lp-flash-2,.lp-bolt,.lp-rain { animation: none !important; }
          .lp-flash,.lp-flash-2 { opacity: 0 !important; }
        }
      `}</style>

      <Navbar />

      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#05060f] via-[#0a0f24] to-[#050510]">
        {/* ===== Thunderstorm background ===== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* storm clouds */}
          <div
            className="lp-rain absolute -top-24 -left-10 h-72 w-[55%] rounded-full bg-slate-800/70 blur-3xl"
            style={{ animation: "cloudDrift 12s ease-in-out infinite" }}
          />
          <div
            className="lp-rain absolute -top-16 right-0 h-64 w-[50%] rounded-full bg-slate-900/70 blur-3xl"
            style={{ animation: "cloudDrift 16s ease-in-out infinite reverse" }}
          />
          <div
            className="lp-rain absolute top-0 left-1/4 h-56 w-[45%] rounded-full bg-slate-700/50 blur-3xl"
            style={{ animation: "cloudDrift 14s ease-in-out infinite" }}
          />

          {/* lightning full-screen flashes */}
          <div className="lp-flash absolute inset-0 bg-gradient-to-b from-blue-200/30 via-indigo-200/10 to-transparent" />
          <div className="lp-flash-2 absolute inset-0 bg-gradient-to-b from-white/25 via-violet-200/8 to-transparent" />

          {/* falling rain */}
          {rain.map((r, i) => (
            <span
              key={i}
              className="lp-rain absolute top-0 w-px bg-gradient-to-b from-transparent via-blue-200/60 to-transparent"
              style={{
                left: `${r.left}%`,
                height: `${r.height}px`,
                opacity: r.opacity,
                animation: `rainFall ${r.duration}s linear ${r.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <section className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          {/* Pulsing icon badge */}
          <div className="lp-fade-1 relative mb-8">
            <div className="lp-glow absolute -inset-8 rounded-full bg-blue-500/20 blur-3xl" />

            {/* Orbiting ring */}
            <div className="lp-orbit absolute -inset-2 rounded-2xl">
              <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.6)]" />
            </div>

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-blue-950/40 backdrop-blur-sm">
              {/* glowing lightning bolt */}
              <svg
                viewBox="0 0 24 24"
                className="lp-bolt absolute h-10 w-10 text-blue-200"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
              <Loader2 className="h-9 w-9 animate-spin text-blue-300/70" strokeWidth={1.75} />
            </div>
          </div>

          <span className="lp-fade-2 font-mono text-xs uppercase tracking-widest text-blue-300">
            Analyzing
          </span>

          <h1 className="lp-fade-3 mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {message}
          </h1>

          <p className="lp-fade-4 mt-6 max-w-sm text-balance text-base text-slate-300">
            This usually takes a few seconds. Hang tight while we match you up.
          </p>

          {/* Progress bar shimmer */}
          <div className="lp-fade-5 relative mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <div className="lp-shimmer absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
          </div>

          {/* Progress dots */}
          <div className="lp-fade-5 mt-6 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          <div className="mt-16 h-px w-full bg-white/10" />
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-slate-400">
            Primer &middot; Interview prep, made specific
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}