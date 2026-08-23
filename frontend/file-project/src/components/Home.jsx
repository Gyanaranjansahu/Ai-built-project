import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, UserCircle2, Briefcase, CheckCircle2 } from "lucide-react";
import ConfidenceRing from "../components/ConfidenceRing";
import Navbar from "./Nav";
import Footer from "./Footer";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Upload Resume",
    copy: "Drop your PDF or Word document to kick off the instant neural scan.",
  },
  {
    icon: UserCircle2,
    step: "02",
    title: "Select Persona",
    copy: "Pick your target seniority level and industry for context-aware scoring.",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Paste Job Link",
    copy: "Paste any job description to discover exact gaps and callback odds.",
  },
];

const particles = Array.from({ length: 18 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 99.7 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    top: seed(2) * 100,
    size: 2 + seed(3) * 3,
    delay: seed(4) * -15,
    duration: 10 + seed(5) * 12,
    violet: seed(6) > 0.5,
  };
});

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora Ambient Mesh */}
      <div
        className="ab-anim absolute -inset-[20%] opacity-50"
        style={{
          background:
            "radial-gradient(45% 45% at 20% 25%, rgba(139,92,246,0.25), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(34,211,238,0.2), transparent 70%), radial-gradient(50% 50% at 50% 80%, rgba(168,85,247,0.15), transparent 70%)",
          filter: "blur(70px)",
          animation: "auroraShift 20s ease-in-out infinite",
        }}
      />

      {/* Responsive Grid Background */}
      <div
        className="ab-anim absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%,#000 50%,transparent 100%)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="ab-anim absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.violet ? "rgba(167,139,250,0.7)" : "rgba(34,211,238,0.7)",
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
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.05); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: .2; }
          50% { transform: translateY(-30px) translateX(15px); opacity: .8; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes textGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .premium-card {
          position: relative;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .premium-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02), rgba(139,92,246,0.25));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 antialiased">
        <AnimatedBackground />

        {/* HERO SECTION */}
        <section className="relative px-4 pt-10 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              
              {/* LEFT COLUMN - TEXT CONTENT */}
              <div className="text-center lg:col-span-7 lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)] backdrop-blur-md">
                  <span>✨ AI-Powered Resume Scoring</span>
                </div>

                <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-6xl xl:text-7xl">
                  Land interviews faster with{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #c4b5fd, #38bdf8, #a78bfa, #38bdf8)",
                      backgroundSize: "200% auto",
                      animation: "textGlow 6s ease infinite",
                    }}
                  >
                    ResumeAI
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
                  Analyze your resume against real job descriptions, fix keyword gaps, and optimize your application for ATS screening systems.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4 lg:justify-start">
                  <Link
                    to="/analyze"
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition duration-300 hover:scale-[1.02] hover:shadow-violet-600/40 active:scale-[0.98] sm:w-auto"
                  >
                    <span>Analyze Resume Free</span>
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                  >
                    Explore Dashboard
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN - PREVIEW CARD */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  className="premium-card relative w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60"
                  style={{ animation: "floatCard 6s ease-in-out infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        Software Engineer
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">Target Match Preview</p>
                    </div>

                    <div className="scale-95 sm:scale-100">
                      <ConfidenceRing value={92} size={76} strokeWidth={8} />
                    </div>
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Detected Keywords
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "AWS"].map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-md"
                      >
                        <CheckCircle2 size={13} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3-STEP PROCESS SECTION */}
        <section className="relative border-t border-white/10 bg-slate-950/40 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Three simple steps to optimize your resume for your dream job.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.title}
                  className="premium-card group relative overflow-hidden rounded-2xl p-6 sm:p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
                      <s.icon size={22} />
                    </div>
                    <span className="text-2xl font-black text-white/20 group-hover:text-violet-400/50">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.copy}</p>
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