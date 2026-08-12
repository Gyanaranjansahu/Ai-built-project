import { Link } from "react-router-dom";
import { ArrowLeft, Compass, SearchX } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

// deterministic pseudo-random so particles don't jump between renders
const particles = Array.from({ length: 16 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 99.7 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    top: seed(2) * 100,
    size: 2 + seed(3) * 4,
    delay: seed(4) * -20,
    duration: 12 + seed(5) * 16,
    violet: seed(6) > 0.5,
  };
});

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="nf-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(96,165,250,0.22), transparent 60%)",
          filter: "blur(40px)",
          animation: "nfAurora 20s ease-in-out infinite",
        }}
      />
      <div
        className="nf-anim absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "nfGridPan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%,#000 40%,transparent 100%)",
        }}
      />
      <div
        className="nf-anim absolute left-1/2 top-0 h-[140vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
        style={{ animation: "nfBeam 14s ease-in-out infinite" }}
      />
      <div
        className="nf-anim absolute left-1/4 top-0 h-[140vh] w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "nfBeam 18s ease-in-out infinite reverse" }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="nf-anim absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.violet
              ? "rgba(167,139,250,0.8)"
              : "rgba(34,211,238,0.8)",
            boxShadow: p.violet
              ? "0 0 10px 2px rgba(167,139,250,0.5)"
              : "0 0 10px 2px rgba(34,211,238,0.5)",
            animation: `nfFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float-icon { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
        @keyframes fade-up { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes pulse-glow { 0%,100% { opacity: 0.4; transform: scale(1);} 50% { opacity: 0.7; transform: scale(1.15);} }
        @keyframes nfAurora {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33% { transform: translate(4%,-3%) rotate(8deg) scale(1.08); }
          66% { transform: translate(-3%,4%) rotate(-6deg) scale(1.04); }
        }
        @keyframes nfGridPan { to { background-position: 56px 56px; } }
        @keyframes nfBeam {
          0%,100% { transform: translateX(-40vw); opacity: 0; }
          50% { transform: translateX(40vw); opacity: 1; }
        }
        @keyframes nfFloat {
          0%,100% { transform: translateY(0) translateX(0); opacity: .35; }
          25% { opacity: 1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: .6; }
          75% { opacity: .9; }
        }
        @keyframes nfShimmer { to { background-position: 200% center; } }
        @keyframes nfGlitch {
          0%,100% { transform: translate(0,0); }
          92% { transform: translate(0,0); }
          94% { transform: translate(-3px,2px) skewX(4deg); }
          96% { transform: translate(3px,-2px) skewX(-4deg); }
          98% { transform: translate(-2px,1px); }
        }
        .nf-float { animation: float-icon 4s ease-in-out infinite; }
        .nf-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .nf-fade-1 { animation: fade-up 0.6s ease-out both; }
        .nf-fade-2 { animation: fade-up 0.6s ease-out 0.1s both; }
        .nf-fade-3 { animation: fade-up 0.6s ease-out 0.2s both; }
        .nf-fade-4 { animation: fade-up 0.6s ease-out 0.3s both; }
        .nf-fade-5 { animation: fade-up 0.6s ease-out 0.4s both; }
        @media (prefers-reduced-motion: reduce) {
          .nf-float, .nf-glow, .nf-anim { animation: none !important; }
          [class^="nf-fade"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <Navbar />

      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E]">
        <AnimatedBackground />

        <section className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-32">
          {/* Giant animated 404 */}
          <h2
            className="nf-anim nf-fade-1 select-none bg-clip-text text-[7rem] font-black leading-none text-transparent sm:text-[10rem]"
            style={{
              backgroundImage:
                "linear-gradient(90deg,#c4b5fd,#60a5fa,#22d3ee,#c4b5fd)",
              backgroundSize: "200% auto",
              animation: "nfShimmer 5s linear infinite, nfGlitch 4s steps(1) infinite",
            }}
            aria-hidden="true"
          >
            404
          </h2>

          {/* Icon badge */}
          <div className="nf-fade-1 relative -mt-4 mb-8">
            <div className="nf-glow absolute -inset-6 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="nf-float relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-violet-950/40 backdrop-blur-sm">
              <SearchX className="h-9 w-9 text-violet-300" strokeWidth={1.75} />
            </div>
          </div>

          <span className="nf-fade-2 font-mono text-xs uppercase tracking-widest text-violet-300">
            Error 404
          </span>

          <h1 className="nf-fade-3 mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            This page didn&apos;t make the cut.
          </h1>

          <p className="nf-fade-4 mt-6 max-w-md text-balance text-lg text-slate-300">
            The page you&apos;re looking for doesn&apos;t exist, moved, or never
            made it past the resume screen. Let&apos;s get you back on track.
          </p>

          <div className="nf-fade-5 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-violet-900/40 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> Back to home
            </Link>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 active:scale-95"
            >
              <Compass className="h-4 w-4" /> Analyze my fit
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-slate-400">
            Primer &middot; Interview prep, made specific
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}