import { Sparkles, Target, ShieldCheck, Brain } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const values = [
  {
    icon: Brain,
    title: "AI Powered Analysis",
    text: "Advanced AI models analyze resumes, skills, and job descriptions to find meaningful matches.",
  },
  {
    icon: Target,
    title: "Career Focused",
    text: "We help candidates understand their strengths and improve their chances of getting hired.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    text: "Your resume data stays secure with modern protection practices.",
  },
];

const stats = [
  { value: "50K+", label: "Resumes analyzed" },
  { value: "92%", label: "Avg. match accuracy" },
  { value: "3x", label: "More interviews" },
  { value: "24/7", label: "Instant AI feedback" },
];

// deterministic wind-driven rain so it doesn't jump between renders
const rain = Array.from({ length: 70 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 77.3 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    delay: seed(2) * -1.2,
    duration: 0.4 + seed(3) * 0.45,
    height: 50 + seed(4) * 70,
    opacity: 0.15 + seed(5) * 0.4,
  };
});

function ThunderstormBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dark rolling storm clouds */}
      <div
        className="ab-anim absolute -top-28 -left-10 h-80 w-[60%] rounded-full bg-slate-950/70 blur-3xl"
        style={{ animation: "abCloud 12s ease-in-out infinite" }}
      />
      <div
        className="ab-anim absolute -top-20 right-0 h-72 w-[55%] rounded-full bg-slate-900/70 blur-3xl"
        style={{ animation: "abCloud 16s ease-in-out infinite reverse" }}
      />
      <div
        className="ab-anim absolute -top-10 left-1/4 h-60 w-[50%] rounded-full bg-slate-800/50 blur-3xl"
        style={{ animation: "abCloud 14s ease-in-out infinite" }}
      />

      {/* panning grid */}
      <div
        className="ab-anim absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "abGridPan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 10%,#000 40%,transparent 100%)",
        }}
      />

      {/* cold white-blue lightning flash (full screen) */}
      <div className="ab-flash absolute inset-0 bg-gradient-to-b from-sky-100/40 via-blue-200/12 to-transparent" />

      {/* jagged lightning bolts striking from the clouds */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <polyline
          className="ab-bolt-a"
          points="300,0 340,180 290,200 360,360 320,380 400,560"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px rgba(191,219,254,0.9))" }}
        />
        <polyline
          className="ab-bolt-b"
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
          className="ab-anim absolute top-0 w-px rotate-[12deg] bg-gradient-to-b from-transparent via-sky-200/60 to-transparent"
          style={{
            left: `${r.left}%`,
            height: `${r.height}px`,
            opacity: r.opacity,
            animation: `abRain ${r.duration}s linear ${r.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function About() {
  return (
    <>
      <style>{`
        @keyframes abFadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes abShimmer { to { background-position: 200% center; } }
        @keyframes abGridPan { to { background-position: 56px 56px; } }
        @keyframes abSpin { to { transform: rotate(360deg); } }
        @keyframes abBorder { to { background-position: 200% center; } }
        @keyframes abCloud { 0%,100% { transform: translateX(0);} 50% { transform: translateX(40px);} }
        @keyframes abRain {
          0% { transform: translate(0,-20vh); }
          100% { transform: translate(-60px,120vh); }
        }
        /* full-screen storm flash, timed to the bolt strikes */
        @keyframes abFlash {
          0%,42%,100% { opacity: 0; }
          43% { opacity: .9; }
          44% { opacity: .2; }
          45% { opacity: .8; }
          47% { opacity: 0; }
          78% { opacity: 0; }
          79% { opacity: .65; }
          80.5% { opacity: 0; }
        }
        @keyframes abBoltStrike {
          0%,42% { opacity: 0; }
          43% { opacity: 1; }
          47% { opacity: .5; }
          49% { opacity: 0; }
          78% { opacity: 0; }
          79% { opacity: 1; }
          81% { opacity: 0; }
        }
        .ab-fade { opacity: 0; animation: abFadeUp .8s cubic-bezier(.22,1,.36,1) forwards; }
        .ab-flash { opacity: 0; animation: abFlash 9s ease-in-out infinite; }
        .ab-bolt-a { opacity: 0; animation: abBoltStrike 9s ease-in-out infinite; }
        .ab-bolt-b { opacity: 0; animation: abBoltStrike 9s ease-in-out 4s infinite; }
        .ab-glow {
          position: relative;
          background: rgba(255,255,255,0.04);
        }
        .ab-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(130deg, rgba(96,165,250,.55), rgba(34,211,238,.15), rgba(147,197,253,.5));
          background-size: 200% auto;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: .5;
          transition: opacity .5s ease;
        }
        .ab-glow:hover::before { opacity: 1; animation: abBorder 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ab-fade { opacity: 1; animation: none; }
          .ab-anim, .ab-flash, .ab-bolt-a, .ab-bolt-b { animation: none !important; }
          .ab-flash, .ab-bolt-a, .ab-bolt-b { opacity: 0 !important; }
          .ab-glow:hover::before { animation: none; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#111a2e] to-[#070b16] text-white">
        <ThunderstormBackground />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent lg:top-20" />

          {/* orbit rings */}
          <div
            className="ab-anim pointer-events-none absolute left-1/2 top-[-16rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-white/[0.06]"
            style={{ animation: "abSpin 60s linear infinite" }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400/70 shadow-[0_0_20px_4px] shadow-sky-400/50" />
          </div>
          <div
            className="ab-anim pointer-events-none absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-white/[0.06]"
            style={{ animation: "abSpin 45s linear infinite reverse" }}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400/70 shadow-[0_0_18px_4px] shadow-cyan-400/50" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-6 sm:py-28">
            <span className="ab-fade inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-xl">
              <Sparkles size={14} />
              About ResumeAI
            </span>

            <h1
              className="ab-fade mt-8 text-balance text-4xl font-bold leading-[1.1] md:text-6xl"
              style={{ animationDelay: ".1s" }}
            >
              Helping candidates build
              <span
                className="ab-anim mt-1 block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#93c5fd,#60a5fa,#22d3ee,#93c5fd)",
                  backgroundSize: "200% auto",
                  animation: "abShimmer 5s linear infinite",
                }}
              >
                better careers with AI
              </span>
            </h1>

            <p
              className="ab-fade mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg"
              style={{ animationDelay: ".2s" }}
            >
              ResumeAI analyzes resumes against real job requirements and
              provides actionable insights to improve your career opportunities.
            </p>
          </div>

          {/* Stats band */}
          <div className="relative mx-auto max-w-5xl px-5 pb-8 sm:px-6">
            <div className="ab-fade ab-glow grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4" style={{ animationDelay: ".3s" }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/[0.03] px-4 py-7 text-center backdrop-blur-xl transition duration-300 hover:bg-white/[0.06]"
                >
                  <div
                    className="bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
                    style={{
                      backgroundImage: "linear-gradient(120deg,#60a5fa,#22d3ee)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-slate-400 sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
            <div className="ab-fade ab-glow group overflow-hidden rounded-3xl p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/15 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/30 to-sky-500/30">
                <Sparkles className="text-sky-300" size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Our Mission</h2>
              <p className="leading-7 text-slate-300">
                Our mission is to remove uncertainty from job applications. We
                combine artificial intelligence and career insights to help
                people present their best professional version.
              </p>
            </div>

            <div
              className="ab-fade ab-glow group overflow-hidden rounded-3xl p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2"
              style={{ animationDelay: ".12s" }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/30 to-blue-500/30">
                <Target className="text-cyan-300" size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Why ResumeAI?</h2>
              <p className="leading-7 text-slate-300">
                Traditional resume reviews are slow and subjective. ResumeAI
                provides instant feedback based on skills, experience, and job
                requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              What drives us
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">
              Built on a few strong principles
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="ab-fade ab-glow group overflow-hidden rounded-2xl p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${0.12 * index}s` }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-cyan-300" size={26} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}