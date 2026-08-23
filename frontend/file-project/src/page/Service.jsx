import React from "react";
import {
  FileSearch,
  BarChart3,
  Lightbulb,
  Target,
  Sparkles,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bot,
} from "lucide-react";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";

const features = [
  {
    icon: FileSearch,
    title: "AI Resume Analysis",
    badge: "Core Engine",
    tagline: "Instant Deep-Scan",
    text: "Examine structure, formatting, tone, and hidden errors using natural language processing calibrated against modern enterprise hiring benchmarks.",
    colSpan: "lg:col-span-2",
    accent: "from-violet-500/20 via-purple-500/10 to-transparent",
    borderAccent: "group-hover:border-violet-500/50",
    metrics: ["100+ Formatting Checks", "Tone & Clarity Audit"],
  },
  {
    icon: BarChart3,
    title: "ATS Optimization",
    badge: "99.4% Accuracy",
    tagline: "Bypass Filters",
    text: "Simulate parsing engines like Workday, Greenhouse, and Lever to guarantee zero data loss.",
    colSpan: "lg:col-span-1",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderAccent: "group-hover:border-cyan-500/50",
    metrics: ["Parse Verification", "Keyword Extraction"],
  },
  {
    icon: Target,
    title: "Job Match Indexing",
    badge: "Precision Alignment",
    tagline: "Tailored Strategy",
    text: "Cross-reference your resume against specific target job descriptions to identify structural keyword gaps.",
    colSpan: "lg:col-span-1",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderAccent: "group-hover:border-emerald-500/50",
    metrics: ["Gap Analysis", "Relevance Scoring"],
  },
  {
    icon: Lightbulb,
    title: "Smart Content Suggestions",
    badge: "Real-Time AI",
    tagline: "Action-Oriented Writing",
    text: "Transform passive bullet points into high-impact, quantified achievement statements using industry action verbs.",
    colSpan: "lg:col-span-2",
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderAccent: "group-hover:border-amber-500/50",
    metrics: ["Metric Rewriting", "Active Voice Boost"],
  },
  {
    icon: Briefcase,
    title: "Career & Skill Insights",
    badge: "Market Intelligence",
    tagline: "Future-Proof Profile",
    text: "Identify missing high-demand skills and career trajectory gaps based on real-time market data.",
    colSpan: "lg:col-span-1",
    accent: "from-indigo-500/20 via-violet-500/10 to-transparent",
    borderAccent: "group-hover:border-indigo-500/50",
    metrics: ["Market Benchmark", "Skill Map"],
  },
  {
    icon: Sparkles,
    title: "AI Interview Copilot",
    badge: "Interactive Prep",
    tagline: "Tailored Q&A",
    text: "Generate dynamic, role-specific behavioral and technical interview questions based on your unique resume.",
    colSpan: "lg:col-span-2",
    accent: "from-rose-500/20 via-pink-500/10 to-transparent",
    borderAccent: "group-hover:border-rose-500/50",
    metrics: ["STAR Method Prep", "Mock Scenarios"],
  },
];

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
      <div
        className="sv-anim absolute -inset-[20%] opacity-50"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.3), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.25), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(96,165,250,0.2), transparent 60%)",
          filter: "blur(50px)",
          animation: "svAurora 22s ease-in-out infinite",
        }}
      />
      <div
        className="sv-anim absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 15%,#000 40%,transparent 100%)",
        }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="sv-anim absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.violet ? "rgba(167,139,250,0.8)" : "rgba(34,211,238,0.8)",
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
          33% { transform: translate(3%,-2%) rotate(6deg) scale(1.05); }
          66% { transform: translate(-2%,3%) rotate(-4deg) scale(1.02); }
        }
        @keyframes svFloat {
          0%,100% { transform: translateY(0) translateX(0); opacity: .3; }
          50% { transform: translateY(-30px) translateX(15px); opacity: .7; }
        }
        @keyframes svShimmer { to { background-position: 200% center; } }
        @keyframes svFadeUp { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
        .sv-fade { opacity: 0; animation: svFadeUp .7s cubic-bezier(.16,1,.3,1) forwards; }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
        <AnimatedBackground />

        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 text-center sm:px-6 sm:pt-32">
          <p className="sv-fade inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl shadow-lg shadow-violet-500/10">
            <Bot size={14} className="animate-pulse" />
            AI Career Suite
          </p>

          <h1
            className="sv-fade mt-8 text-balance text-4xl font-extrabold leading-[1.1] sm:text-6xl lg:text-7xl tracking-tight"
            style={{ animationDelay: ".1s" }}
          >
            Built to get you
            <span
              className="sv-anim mt-2 block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#a78bfa,#38bdf8,#34d399,#a78bfa)",
                backgroundSize: "200% auto",
                animation: "svShimmer 6s linear infinite",
              }}
            >
              hired faster
            </span>
          </h1>

          <p
            className="sv-fade mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: ".2s" }}
          >
            An end-to-end intelligence platform engineered to audit, format, and optimize your application materials for modern tech recruitment workflows.
          </p>
        </section>

        {/* Bento Grid Features Section */}
        <section className="relative mx-auto max-w-7xl px-5 pb-28 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`sv-fade group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 ${item.colSpan} ${item.borderAccent}`}
                  style={{ animationDelay: `${0.08 * index}s` }}
                >
                  {/* Subtle Background Glow Accent */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-inner transition duration-500 group-hover:scale-110 group-hover:bg-white/10">
                        <Icon size={24} className="text-violet-300 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-300 backdrop-blur-md">
                        {item.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                      {item.tagline}
                    </span>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
                  </div>

                  {/* Dynamic Metrics / Features Checklist */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                    <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner CTA */}
          <div className="sv-fade mt-12 overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-900/30 via-slate-900/50 to-cyan-900/30 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
            <h3 className="text-2xl sm:text-3xl font-bold">Ready to optimize your application?</h3>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Scan your current resume for free and receive immediate ATS compatibility scores.
            </p>
            <div className="mt-6 flex flex-sm-row justify-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all">
                <Zap size={16} />
                Start Free Analysis
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}