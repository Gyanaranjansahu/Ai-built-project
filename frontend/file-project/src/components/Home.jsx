import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  UserCircle2,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Cpu,
  BarChart3,
  Flame,
  Star,
} from "lucide-react";

import ConfidenceRing from "../components/ConfidenceRing";
import Navbar from "./Nav";
import Footer from "./Footer";

const steps = [
  {
    icon: FileText,
    step: "01",
    tag: "Instant Parsing",
    title: "Upload Your Resume",
    copy: "Drop your PDF/DOCX resume and let our neural network parse your skills, impact metrics, and domain experience instantly.",
  },
  {
    icon: UserCircle2,
    step: "02",
    tag: "Target Alignment",
    title: "Define Target Persona",
    copy: "Select your desired seniority tier, target industry, and career goals to anchor our contextual optimization engine.",
  },
  {
    icon: Briefcase,
    step: "03",
    tag: "Actionable Match",
    title: "Real-time Job Matching",
    copy: "Cross-reference your background against thousands of real-time job descriptions to isolate gap areas and callback odds.",
  },
];

const metrics = [
  { value: "98.4%", label: "ATS Pass Rate", sub: "Engineered for top screening algorithms" },
  { value: "3.5x", label: "More Interviews", sub: "Average conversion increase reported" },
  { value: "< 10s", label: "Analysis Speed", sub: "Instant AI match reports & gap analysis" },
];

const particles = Array.from({ length: 24 }, (_, i) => {
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
      {/* Aurora Mesh Blur */}
      <div
        className="ab-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(217,70,239,0.22), transparent 60%)",
          filter: "blur(60px)",
          animation: "auroraShift 22s ease-in-out infinite",
        }}
      />

      {/* Grid Pattern with Vignette Mask */}
      <div
        className="ab-anim absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridPan 12s linear infinite",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 20%,#000 40%,transparent 100%)",
        }}
      />

      {/* Vertical Light Beams */}
      <div
        className="ab-anim absolute left-1/2 top-0 h-[120vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
        style={{ animation: "beamSweep 14s ease-in-out infinite" }}
      />
      <div
        className="ab-anim absolute left-1/3 top-0 h-[120vh] w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "beamSweep 18s ease-in-out infinite reverse" }}
      />

      {/* Glowing Floating Dust Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="ab-anim absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.violet
              ? "rgba(167,139,250,0.85)"
              : "rgba(34,211,238,0.85)",
            boxShadow: p.violet
              ? "0 0 12px 3px rgba(167,139,250,0.6)"
              : "0 0 12px 3px rgba(34,211,238,0.6)",
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes auroraShift {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33% { transform: translate(4%,-3%) rotate(8deg) scale(1.08); }
          66% { transform: translate(-3%,4%) rotate(-6deg) scale(1.04); }
        }
        @keyframes gridPan { to { background-position: 64px 64px; } }
        @keyframes beamSweep {
          0%,100% { transform: translateX(-40vw); opacity: 0; }
          50% { transform: translateX(40vw); opacity: 1; }
        }
        @keyframes floatParticle {
          0%,100% { transform: translateY(0) translateX(0); opacity: .35; }
          25% { opacity: 1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: .6; }
          75% { opacity: .9; }
        }
        @keyframes floatY { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-14px);} }
        @keyframes floatYslow { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-24px);} }
        @keyframes drift { 0%,100% { transform: translate(0,0);} 50% { transform: translate(30px,-20px);} }
        @keyframes shimmerText { to { background-position: 200% center; } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(28px);} to { opacity:1; transform: translateY(0);} }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.35); }
          70% { box-shadow: 0 0 0 22px rgba(139,92,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
        }

        .rv-glow-card {
          position: relative;
          background: rgba(15, 23, 42, 0.45);
        }
        .rv-glow-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(167,139,250,0.35), rgba(56,189,248,0.1), rgba(167,139,250,0.15));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .rv-fade { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) forwards; }
        .rv-d1 { animation-delay: .1s; } .rv-d2 { animation-delay: .25s; }
        .rv-d3 { animation-delay: .4s; } .rv-d4 { animation-delay: .55s; }
        .rv-d5 { animation-delay: .7s; }

        @media (prefers-reduced-motion: reduce) {
          .rv-fade { opacity: 1; animation: none; }
          .ab-anim, .rv-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 antialiased">
        <AnimatedBackground />

        {/* HERO SECTION */}
        <section className="relative pt-8 pb-20 sm:pt-16 sm:pb-28">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="rv-anim absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[120px] sm:h-[36rem] sm:w-[36rem]"
              style={{ animation: "drift 12s ease-in-out infinite" }}
            />
            <div
              className="rv-anim absolute right-0 top-24 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[120px] sm:h-[32rem] sm:w-[32rem]"
              style={{ animation: "drift 16s ease-in-out infinite reverse" }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8">
            {/* LEFT CONTENT (7 COLS) */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="rv-fade rv-d1 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-xl">
                <Cpu size={14} className="text-violet-400 animate-pulse" />
                <span>Next-Gen Career Intelligence Platform</span>
              </div>

              <h1 className="rv-fade rv-d2 mt-7 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Architect a resume
                <span
                  className="rv-anim mt-2 block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#c4b5fd,#38bdf8,#a78bfa,#34d399,#c4b5fd)",
                    backgroundSize: "200% auto",
                    animation: "shimmerText 6s linear infinite",
                  }}
                >
                  recruiters can't ignore.
                </span>
              </h1>

              <p className="rv-fade rv-d3 mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300/90 sm:text-lg lg:mx-0">
                ResumeAI bridges the gap between your true experience and opaque applicant tracking systems. Analyze semantic fit, resolve critical skill gaps, and accelerate interview invites.
              </p>

              {/* Action Buttons */}
              <div className="rv-fade rv-d4 mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:justify-start">
                <Link
                  to="/analyze"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-600/40 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Sparkles size={18} className="text-cyan-200" />
                  <span>Analyze Resume Free</span>
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10 active:scale-95"
                >
                  <span>Explore Dashboard</span>
                </Link>
              </div>

              {/* Trust Micro-Badges */}
              <div className="rv-fade rv-d5 mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400 lg:justify-start">
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-300">
                  <ShieldCheck size={16} />
                  <span>SOC-2 Aligned Security</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3.5 py-1.5 text-amber-300">
                  <Zap size={16} />
                  <span>Instant ATS Simulation</span>
                </div>
              </div>
            </div>

            {/* RIGHT HERO INTERACTIVE CARD (5 COLS) */}
            <div className="rv-fade rv-d3 relative lg:col-span-5 flex justify-center">
              <div
                className="rv-anim absolute h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]"
                style={{ animation: "floatYslow 7s ease-in-out infinite" }}
              />

              {/* Floating Glass Box */}
              <div
                className="rv-anim rv-glow-card group relative w-full max-w-md rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 shadow-2xl shadow-black/80"
                style={{ animation: "floatY 6s ease-in-out infinite" }}
              >
                <div className="relative flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300 uppercase tracking-wider">
                      <Flame size={12} className="text-amber-400" /> Match Preview
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      Lead Systems Architect
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Target: Tier 1 Tech</p>
                  </div>

                  <div className="rv-anim rounded-full" style={{ animation: "pulseRing 3s ease-out infinite" }}>
                    <ConfidenceRing value={94} size={84} strokeWidth={8} />
                  </div>
                </div>

                {/* Sub-Metrics Section */}
                <div className="my-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <div className="text-xs text-slate-400">Keyword Density</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">Optimal (98%)</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <div className="text-xs text-slate-400">ATS Parsing</div>
                    <div className="text-lg font-bold text-cyan-400 mt-0.5">Verified Pass</div>
                  </div>
                </div>

                <p className="relative mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Detected Core Competencies
                </p>

                <div className="relative flex flex-wrap gap-2">
                  {["System Architecture", "TypeScript", "Distributed Systems", "Cloud Security"].map((skill, i) => (
                    <span
                      key={skill}
                      className="rv-fade flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-emerald-500/20"
                      style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                    >
                      <CheckCircle2 size={13} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS & PROOF BAR */}
        <section className="relative border-y border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left sm:border-l sm:border-white/10 sm:pl-8 first:border-none first:pl-0">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-300 to-white">
                    {m.value}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">{m.label}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-STEP PROCESS SECTION */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-16 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <BarChart3 size={14} /> Workflow Precision
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
                Three steps to a higher interview rate
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rv-fade rv-glow-card group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${0.15 * index}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-white/20 group-hover:text-violet-400/60 transition-colors">
                      {step.step}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-slate-300">
                      {step.tag}
                    </span>
                  </div>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-cyan-300 transition duration-500 group-hover:scale-110 group-hover:bg-violet-500/20">
                    <step.icon size={26} />
                  </div>

                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.copy}</p>
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