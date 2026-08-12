import { Loader2 } from "lucide-react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer";

// deterministic slanted raindrops so they don't jump between renders
const rain = Array.from({ length: 80 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 77.3 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    delay: seed(2) * -1.2,
    duration: 0.35 + seed(3) * 0.4,
    height: 50 + seed(4) * 70,
    opacity: 0.2 + seed(5) * 0.4,
  };
});

export default function LoadingPage({ message = "Reading between the lines..." }) {
  return (
    <>
      <style>{`
        @keyframes pulse-glow { 0%,100% { opacity:.4; transform:scale(1);} 50% { opacity:.75; transform:scale(1.2);} }
        @keyframes orbit-spin { from { transform:rotate(0);} to { transform:rotate(360deg);} }
        @keyframes fade-up { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        @keyframes shimmer { 0% { transform:translateX(-100%);} 100% { transform:translateX(300%);} }

        /* --- rain slants down-left for wind-driven storm --- */
        @keyframes rainFall {
          0% { transform: translate(0,-20vh); }
          100% { transform: translate(-60px,120vh); }
        }
        @keyframes cloudDrift { 0%,100% { transform:translateX(0);} 50% { transform:translateX(40px);} }

        /* full-screen flash timed to the bolt strikes */
        @keyframes stormFlash {
          0%,42%,100% { opacity: 0; }
          43% { opacity: .95; }
          44% { opacity: .2; }
          45% { opacity: .8; }
          47% { opacity: 0; }
          78% { opacity: 0; }
          79% { opacity: .7; }
          80.5% { opacity: 0; }
        }
        /* the lightning bolt path draws/strikes then fades */
        @keyframes boltStrike {
          0%,42% { opacity: 0; }
          43% { opacity: 1; }
          47% { opacity: .5; }
          49% { opacity: 0; }
          78% { opacity: 0; }
          79% { opacity: 1; }
          81% { opacity: 0; }
        }
        @keyframes iconBolt {
          0%,100% { opacity:.35; filter: drop-shadow(0 0 4px rgba(147,197,253,.4)); }
          43% { opacity:1; filter: drop-shadow(0 0 22px rgba(224,242,254,.95)); }
          48% { opacity:.4; }
          79% { opacity:1; filter: drop-shadow(0 0 18px rgba(147,197,253,.9)); }
          82% { opacity:.35; }
        }

        .lp-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        .lp-orbit { animation: orbit-spin 3s linear infinite; }
        .lp-fade-1 { animation: fade-up .6s ease-out both; }
        .lp-fade-2 { animation: fade-up .6s ease-out .1s both; }
        .lp-fade-3 { animation: fade-up .6s ease-out .2s both; }
        .lp-fade-4 { animation: fade-up .6s ease-out .3s both; }
        .lp-fade-5 { animation: fade-up .6s ease-out .4s both; }
        .lp-shimmer { animation: shimmer 1.8s ease-in-out infinite; }
        .lp-flash { animation: stormFlash 6s ease-in-out infinite; }
        .lp-bolt-a { animation: boltStrike 6s ease-in-out infinite; }
        .lp-bolt-b { animation: boltStrike 6s ease-in-out 2.8s infinite; }
        .lp-iconbolt { animation: iconBolt 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-glow,.lp-orbit,.lp-shimmer,.lp-flash,.lp-bolt-a,.lp-bolt-b,.lp-iconbolt,.lp-rain,.lp-cloud { animation: none !important; }
          .lp-flash,.lp-bolt-a,.lp-bolt-b { opacity: 0 !important; }
        }
      `}</style>

      <Navbar />

      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#111a2e] to-[#070b16]">
        {/* ===== Thunderstorm background ===== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* dark rolling storm clouds */}
          <div className="lp-cloud absolute -top-28 -left-10 h-80 w-[60%] rounded-full bg-slate-950/80 blur-3xl" style={{ animation: "cloudDrift 12s ease-in-out infinite" }} />
          <div className="lp-cloud absolute -top-20 right-0 h-72 w-[55%] rounded-full bg-slate-900/80 blur-3xl" style={{ animation: "cloudDrift 16s ease-in-out infinite reverse" }} />
          <div className="lp-cloud absolute -top-10 left-1/4 h-60 w-[50%] rounded-full bg-slate-800/60 blur-3xl" style={{ animation: "cloudDrift 14s ease-in-out infinite" }} />

          {/* cold white-blue lightning flash */}
          <div className="lp-flash absolute inset-0 bg-gradient-to-b from-sky-100/40 via-blue-200/12 to-transparent" />

          {/* jagged lightning bolts striking from the clouds */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
            <polyline
              className="lp-bolt-a"
              points="300,0 340,180 290,200 360,360 320,380 400,560"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(191,219,254,0.9))" }}
            />
            <polyline
              className="lp-bolt-b"
              points="720,0 690,160 745,190 680,340 730,370 660,520"
              fill="none"
              stroke="#dbeafe"
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(147,197,253,0.9))" }}
            />
          </svg>

          {/* wind-driven falling rain */}
          {rain.map((r, i) => (
            <span
              key={i}
              className="lp-rain absolute top-0 w-px rotate-[12deg] bg-gradient-to-b from-transparent via-sky-200/70 to-transparent"
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
            <div className="lp-glow absolute -inset-8 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="lp-orbit absolute -inset-2 rounded-2xl">
              <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.6)]" />
            </div>

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-sky-950/40 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="lp-iconbolt absolute h-10 w-10 text-sky-100" fill="currentColor" aria-hidden="true">
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
              <Loader2 className="h-9 w-9 animate-spin text-sky-300/70" strokeWidth={1.75} />
            </div>
          </div>

          <span className="lp-fade-2 font-mono text-xs uppercase tracking-widest text-sky-300">
            Analyzing
          </span>

          <h1 className="lp-fade-3 mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {message}
          </h1>

          <p className="lp-fade-4 mt-6 max-w-sm text-balance text-base text-slate-300">
            This usually takes a few seconds. Hang tight while we match you up.
          </p>

          <div className="lp-fade-5 relative mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <div className="lp-shimmer absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
          </div>

          <div className="lp-fade-5 mt-6 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-sky-400" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>

          <div className="mt-16 h-px w-full bg-white/10" />
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-slate-400">
            Primer &middot; Interview prep, made specific
          </p>
        </section>
      </div>
    </>
  );
}