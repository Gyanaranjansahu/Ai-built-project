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

export default function About() {
  return (
    <>
      <style>{`
        @keyframes abDrift {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(28px,-22px); }
        }
        @keyframes abFadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes abShimmer { to { background-position: 200% center; } }
        @keyframes abGridPan { to { background-position: 56px 56px; } }
        @keyframes abSpin { to { transform: rotate(360deg); } }
        @keyframes abBorder { to { background-position: 200% center; } }
        .ab-fade { opacity: 0; animation: abFadeUp .8s cubic-bezier(.22,1,.36,1) forwards; }
        /* gradient-border glass card */
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
          background: linear-gradient(130deg, rgba(167,139,250,.55), rgba(34,211,238,.15), rgba(96,165,250,.5));
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
          .ab-anim { animation: none !important; }
          .ab-glow:hover::before { animation: none; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b1120] to-[#020617] text-white">
        {/* masked grid */}
        <div
          className="ab-anim pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            animation: "abGridPan 8s linear infinite",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%,#000 40%,transparent 100%)",
          }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent lg:top-20" />

          {/* orbit rings */}
          <div
            className="ab-anim pointer-events-none absolute left-1/2 top-[-16rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-white/[0.06]"
            style={{ animation: "abSpin 60s linear infinite" }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400/70 shadow-[0_0_20px_4px] shadow-violet-400/50" />
          </div>
          <div
            className="ab-anim pointer-events-none absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-white/[0.06]"
            style={{ animation: "abSpin 45s linear infinite reverse" }}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400/70 shadow-[0_0_18px_4px] shadow-cyan-400/50" />
          </div>

          <div
            className="ab-anim pointer-events-none absolute -top-20 left-4 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl sm:left-10 sm:h-96 sm:w-96"
            style={{ animation: "abDrift 14s ease-in-out infinite" }}
          />
          <div
            className="ab-anim pointer-events-none absolute right-4 top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl sm:right-10 sm:h-80 sm:w-80"
            style={{ animation: "abDrift 18s ease-in-out infinite reverse" }}
          />

          <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-6 sm:py-28">
            <span className="ab-fade inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl">
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
                    "linear-gradient(90deg,#a78bfa,#60a5fa,#22d3ee,#a78bfa)",
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
                      backgroundImage:
                        "linear-gradient(120deg,#a78bfa,#22d3ee)",
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
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/15 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-blue-500/30">
                <Sparkles className="text-violet-300" size={28} />
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
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
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