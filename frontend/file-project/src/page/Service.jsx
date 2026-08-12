import {
  FileSearch,
  BarChart3,
  Lightbulb,
  Target,
  Sparkles,
  Briefcase,
} from "lucide-react";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";

const features = [
  {
    icon: FileSearch,
    title: "AI Resume Analysis",
    text: "Get detailed analysis of your resume structure, skills and experience.",
  },
  {
    icon: BarChart3,
    title: "ATS Score",
    text: "Understand how well your resume performs against applicant tracking systems.",
  },
  {
    icon: Target,
    title: "Job Match Score",
    text: "Compare your resume with job descriptions and discover compatibility.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    text: "Receive AI generated recommendations to improve your resume.",
  },
  {
    icon: Briefcase,
    title: "Career Insights",
    text: "Discover missing skills and opportunities for improvement.",
  },
  {
    icon: Sparkles,
    title: "Interview Preparation",
    text: "Prepare better with personalized interview guidance.",
  },
];

// deterministic pseudo-random so particles don't jump between renders
const particles = Array.from({ length: 18 }, (_, i) => {
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
      {/* aurora mesh */}
      <div
        className="sv-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(96,165,250,0.22), transparent 60%)",
          filter: "blur(40px)",
          animation: "svAurora 20s ease-in-out infinite",
        }}
      />

      {/* panning grid */}
      <div
        className="sv-anim absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "svGridPan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 15%,#000 40%,transparent 100%)",
        }}
      />

      {/* sweeping beams */}
      <div
        className="sv-anim absolute left-1/2 top-0 h-[140vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
        style={{ animation: "svBeam 14s ease-in-out infinite" }}
      />
      <div
        className="sv-anim absolute left-1/4 top-0 h-[140vh] w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "svBeam 18s ease-in-out infinite reverse" }}
      />

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="sv-anim absolute rounded-full"
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
            animation: `svFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <>
      <style>{`
        @keyframes svAurora {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33% { transform: translate(4%,-3%) rotate(8deg) scale(1.08); }
          66% { transform: translate(-3%,4%) rotate(-6deg) scale(1.04); }
        }
        @keyframes svGridPan { to { background-position: 56px 56px; } }
        @keyframes svBeam {
          0%,100% { transform: translateX(-40vw); opacity: 0; }
          50% { transform: translateX(40vw); opacity: 1; }
        }
        @keyframes svFloat {
          0%,100% { transform: translateY(0) translateX(0); opacity: .35; }
          25% { opacity: 1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: .6; }
          75% { opacity: .9; }
        }
        @keyframes svShimmer { to { background-position: 200% center; } }
        @keyframes svFadeUp { from { opacity:0; transform: translateY(26px);} to { opacity:1; transform: translateY(0);} }
        .sv-fade { opacity: 0; animation: svFadeUp .8s cubic-bezier(.22,1,.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sv-fade { opacity: 1; animation: none; }
          .sv-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b1120] to-[#020617] text-white">
        <AnimatedBackground />

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-6 sm:py-28">
          {/* top hairline beam */}
          <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent lg:top-20" />

          <p className="sv-fade inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl">
            <Sparkles size={14} />
            Features
          </p>

          <h1
            className="sv-fade mt-8 text-balance text-4xl font-bold leading-[1.1] md:text-6xl"
            style={{ animationDelay: ".1s" }}
          >
            Powerful AI tools for
            <span
              className="sv-anim mt-1 block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#a78bfa,#60a5fa,#22d3ee,#a78bfa)",
                backgroundSize: "200% auto",
                animation: "svShimmer 5s linear infinite",
              }}
            >
              smarter applications
            </span>
          </h1>

          <p
            className="sv-fade mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg"
            style={{ animationDelay: ".2s" }}
          >
            Everything you need to analyze, optimize, and elevate your resume —
            powered by AI and built for real hiring outcomes.
          </p>
        </section>

        {/* Features grid */}
        <section className="relative mx-auto grid max-w-7xl gap-6 px-5 pb-28 sm:gap-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="sv-fade group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/[0.07]"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                {/* glow accent */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 shadow-inner shadow-white/5 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={26} className="text-cyan-300" />
                </div>

                <h2 className="mb-3 text-xl font-bold">{item.title}</h2>
                <p className="leading-7 text-slate-300">{item.text}</p>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </>
  );
}