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
} from "lucide-react";

import ConfidenceRing from "../components/ConfidenceRing";
import Navbar from "./Nav";
import Footer from "./Footer";

const steps = [
  {
    icon: FileText,
    title: "Upload your resume",
    copy: "Drop your resume and let AI understand your skills, experience, and achievements.",
  },
  {
    icon: UserCircle2,
    title: "Add your profile",
    copy: "Tell us about your goals, experience, and the role you want.",
  },
  {
    icon: Briefcase,
    title: "Match with jobs",
    copy: "Compare your resume with job descriptions and discover your chances.",
  },
];

// deterministic pseudo-random so particles don't jump between renders
const particles = Array.from({ length: 22 }, (_, i) => {
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
        className="ab-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(217,70,239,0.22), transparent 60%)",
          filter: "blur(40px)",
          animation: "auroraShift 20s ease-in-out infinite",
        }}
      />

      {/* panning grid */}
      <div
        className="ab-anim absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "gridPan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 20%,#000 40%,transparent 100%)",
        }}
      />

      {/* sweeping beams */}
      <div
        className="ab-anim absolute left-1/2 top-0 h-[120vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
        style={{ animation: "beamSweep 14s ease-in-out infinite" }}
      />
      <div
        className="ab-anim absolute left-1/3 top-0 h-[120vh] w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "beamSweep 18s ease-in-out infinite reverse" }}
      />

      {/* floating particles */}
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
              ? "rgba(167,139,250,0.8)"
              : "rgba(34,211,238,0.8)",
            boxShadow: p.violet
              ? "0 0 10px 2px rgba(167,139,250,0.5)"
              : "0 0 10px 2px rgba(34,211,238,0.5)",
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
          0%,100% { transform: translate3d(0,0,0) rotate(0deg) scale(1); }
          33% { transform: translate3d(4%,-3%,0) rotate(8deg) scale(1.08); }
          66% { transform: translate3d(-3%,4%,0) rotate(-6deg) scale(1.04); }
        }
        @keyframes gridPan { to { background-position: 56px 56px; } }
        @keyframes beamSweep {
          0%,100% { transform: translate3d(-40vw, 0, 0); opacity: 0; }
          50% { transform: translate3d(40vw, 0, 0); opacity: 1; }
        }
        @keyframes floatParticle {
          0%,100% { transform: translate3d(0, 0, 0); opacity: .35; }
          25% { opacity: 1; }
          50% { transform: translate3d(20px, -40px, 0); opacity: .6; }
          75% { opacity: .9; }
        }
        @keyframes floatY { 0%,100% { transform: translate3d(0, 0, 0);} 50% { transform: translate3d(0, -14px, 0);} }
        @keyframes floatYslow { 0%,100% { transform: translate3d(0, 0, 0);} 50% { transform: translate3d(0, -24px, 0);} }
        @keyframes drift { 0%,100% { transform: translate3d(0, 0, 0);} 50% { transform: translate3d(30px, -20px, 0);} }
        @keyframes shimmerText { to { background-position: 200% center; } }
        @keyframes fadeUp { from { opacity:0; transform: translate3d(0, 28px, 0);} to { opacity:1; transform: translate3d(0, 0, 0);} }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); }
          70% { box-shadow: 0 0 0 20px rgba(139,92,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
        }

        .premium-glass {
          position: relative;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .premium-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03), rgba(139,92,246,0.3));
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

      <main className="relative overflow-hidden bg-[#030712] text-slate-100 antialiased">
        {/* Global animated background */}
        <AnimatedBackground />

        {/* HERO */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="rv-anim absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-violet-600/25 blur-[120px] sm:h-[34rem] sm:w-[34rem]"
              style={{ animation: "drift 12s ease-in-out infinite" }}
            />
            <div
              className="rv-anim absolute right-0 top-24 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-[120px] sm:h-[30rem] sm:w-[30rem]"
              style={{ animation: "drift 16s ease-in-out infinite reverse" }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="rv-fade rv-d1 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-xl">
                <Sparkles size={16} className="text-violet-300" />
                AI Powered Resume Intelligence
              </div>

              <h1 className="rv-fade rv-d2 mt-7 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
                Build a resume
                <span
                  className="rv-anim mt-1 block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#c4b5fd,#f0abfc,#a5f3fc,#c4b5fd)",
                    backgroundSize: "200% auto",
                    animation: "shimmerText 5s linear infinite",
                  }}
                >
                  that gets noticed.
                </span>
              </h1>

              <p className="rv-fade rv-d3 mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-300/90 sm:text-lg lg:mx-0">
                ResumeAI analyzes your resume against real job descriptions,
                identifies missing skills, and gives you actionable improvements
                to increase your career opportunities.
              </p>

              <div className="rv-fade rv-d4 mt-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 lg:justify-start">
                <Link
                  to="/analyze"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 via-indigo-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/40 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span>Analyze Resume</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 active:scale-95"
                >
                  Get Started
                </Link>
              </div>

              <div className="rv-fade rv-d5 mt-12 flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm lg:justify-start">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  Secure &amp; private
                </div>
                <div className="hidden h-4 w-px bg-white/10 sm:block" />
                <div className="flex items-center gap-2 text-slate-300">
                  <Zap size={18} className="text-amber-300" />
                  Instant AI Analysis
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="rv-fade rv-d3 relative flex justify-center">
              <div
                className="rv-anim absolute h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]"
                style={{ animation: "floatYslow 7s ease-in-out infinite" }}
              />

              <div
                className="rv-anim premium-glass group relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 transition-all duration-500 hover:-translate-y-2"
                style={{ animation: "floatY 6s ease-in-out infinite" }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      AI Match Score
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      Frontend Engineer
                    </h2>
                  </div>

                  <div className="rv-anim rounded-full" style={{ animation: "pulseRing 3s ease-out infinite" }}>
                    <ConfidenceRing value={92} size={85} strokeWidth={8} />
                  </div>
                </div>

                <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:my-7" />

                <p className="relative mb-4 text-sm text-slate-400">Skills detected</p>

                <div className="relative flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "AI Tools"].map((skill, i) => (
                    <span
                      key={skill}
                      className="rv-fade flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-500/20"
                      style={{ animationDelay: `${0.6 + i * 0.12}s` }}
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

        {/* STEPS */}
        <section className="relative border-t border-white/10 bg-[#050b1f]/80 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
            <div className="mb-14 text-center sm:mb-16">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-400 font-semibold">How it works</p>
              <h2 className="mt-4 text-balance text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
                Three steps to a better career
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rv-fade premium-glass group relative overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 sm:p-8"
                  style={{ animationDelay: `${0.15 * index}s` }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

                  <span className="text-sm font-bold tracking-widest text-violet-300/80">
                    0{index + 1}
                  </span>

                  <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 shadow-inner shadow-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="text-white" size={24} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400 text-sm sm:text-base">{step.copy}</p>
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