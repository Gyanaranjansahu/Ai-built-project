import React from "react";
import {
  Sparkles,
  Target,
  ShieldCheck,
  Brain,
  Zap,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Lock,
  Cpu,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const values = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    tag: "Neural Parsing",
    text: "Deep learning models analyze semantic context, experience impact, and skill coverage across millions of hiring datasets.",
  },
  {
    icon: Target,
    title: "Career Outcome Focused",
    tag: "Real Impact",
    text: "We optimize for callback rates, interview invitations, and compensation alignment rather than superficial formatting.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Data Privacy",
    tag: "Zero Data Leak",
    text: "Your career assets remain strictly confidential with end-to-end encryption, SOC-2 alignment, and strict non-training retention policies.",
  },
];

const stats = [
  { value: "50K+", label: "Resumes Optimized", desc: "Across tech, finance & legal" },
  { value: "92%", label: "Callback Accuracy", desc: "Matched against live job postings" },
  { value: "3.2x", label: "Interview Multiplier", desc: "Average user conversion uplift" },
  { value: "< 5s", label: "Processing Speed", desc: "Instant real-time analysis" },
];

const milestones = [
  {
    year: "Phase 1",
    title: "Algorithmic Precision",
    desc: "Built custom deterministic parser algorithms to simulate ATS top-line screening filters with 99% accuracy.",
  },
  {
    year: "Phase 2",
    title: "Contextual Rewrite Engine",
    desc: "Integrated generative LLMs trained specifically on successful executive resumes and high-converting cover letters.",
  },
  {
    year: "Phase 3",
    title: "Autonomous Career Copilot",
    desc: "Launched dynamic skill mapping, real-time job matching, and automated mock interview generation.",
  },
];

export default function About() {
  return (
    <>
      <style>{`
        @keyframes abDrift {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(30px,-20px); }
        }
        @keyframes abFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes abShimmer { to { background-position: 200% center; } }
        @keyframes abSpin { to { transform: rotate(360deg); } }
        .ab-fade { opacity: 0; animation: abFadeUp .7s cubic-bezier(.16,1,.3,1) forwards; }
        
        .ab-glow {
          position: relative;
          background: rgba(15, 23, 42, 0.4);
        }
        .ab-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(167,139,250,.4), rgba(56,189,248,.1), rgba(167,139,250,.2));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
        {/* Background Grid Accent */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%,#000 40%,transparent 100%)",
          }}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32">
          {/* Animated Background Spheres */}
          <div
            className="ab-anim pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
            style={{ animation: "abDrift 14s ease-in-out infinite" }}
          />
          <div
            className="ab-anim pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-cyan-600/15 blur-3xl"
            style={{ animation: "abDrift 18s ease-in-out infinite reverse" }}
          />

          <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-6">
            <span className="ab-fade inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl shadow-lg shadow-violet-500/10">
              <Cpu size={14} className="animate-pulse" />
              The Intelligence Behind Your Career
            </span>

            <h1
              className="ab-fade mt-8 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: ".1s" }}
            >
              Reinventing how candidates land
              <span
                className="ab-anim mt-2 block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#a78bfa,#38bdf8,#34d399,#a78bfa)",
                  backgroundSize: "200% auto",
                  animation: "abShimmer 6s linear infinite",
                }}
              >
                top-tier roles
              </span>
            </h1>

            <p
              className="ab-fade mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ animationDelay: ".2s" }}
            >
              We bridge the gap between talented job seekers and opaque applicant tracking systems through real-time AI evaluation, market data analysis, and instant optimization.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="relative mx-auto max-w-6xl px-5 pt-16 sm:px-6">
            <div className="ab-fade grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: ".3s" }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="ab-glow rounded-2xl p-6 backdrop-blur-xl transition duration-300 hover:bg-slate-900/60"
                >
                  <div
                    className="bg-clip-text text-4xl font-extrabold text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(120deg,#a78bfa,#38bdf8)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {s.label}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story / Mission Section */}
        <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="ab-fade ab-glow group relative overflow-hidden rounded-3xl p-8 sm:p-10 backdrop-blur-xl transition duration-500 hover:-translate-y-1">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Sparkles size={24} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Our Purpose</span>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl text-white">Why We Built ResumeAI</h2>
              <p className="mt-4 leading-relaxed text-slate-400 text-sm sm:text-base">
                Modern hiring algorithms reject over 75% of qualified applicants before a human recruiter ever views their resume. ResumeAI was created to equalize the hiring landscape—giving candidates the exact analytical tools enterprise recruiters use to evaluate candidates.
              </p>
            </div>

            <div
              className="ab-fade ab-glow group relative overflow-hidden rounded-3xl p-8 sm:p-10 backdrop-blur-xl transition duration-500 hover:-translate-y-1"
              style={{ animationDelay: ".12s" }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <Target size={24} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">The Problem We Solve</span>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl text-white">Data Over Subjectivity</h2>
              <p className="mt-4 leading-relaxed text-slate-400 text-sm sm:text-base">
                Generic career advice is notoriously subjective and inconsistent. Our neural parsing network compares your application directly against modern recruitment models, providing clear, actionable steps to maximize landing interviews.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-400">
              Core Principles
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-white tracking-tight">
              Designed for trust, built for performance
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="ab-fade ab-glow group relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-1.5"
                  style={{ animationDelay: `${0.12 * index}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition duration-500 group-hover:scale-110 group-hover:bg-violet-500/10">
                      <Icon className="text-cyan-300 group-hover:text-violet-300 transition-colors" size={24} />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technology Progression / Roadmap Timeline */}
        <section className="relative mx-auto max-w-7xl px-5 pb-28 sm:px-6 pt-12">
          <div className="ab-glow rounded-3xl p-8 sm:p-12 border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
            <div className="max-w-xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Platform Evolution</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">Engineered for constant advantage</h3>
            </div>

            <div className="grid gap-8 md:grid-cols-3 relative">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative flex flex-col justify-between border-l-2 border-violet-500/30 pl-6 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{m.year}</span>
                  <h4 className="text-lg font-bold text-white">{m.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}