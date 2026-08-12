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

export default function Home() {
  return (
    <>
      {/* Local animation styles — no libraries required */}
      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatYslow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(30px,-20px); }
        }
        @keyframes shimmerText {
          to { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.35); }
          70% { box-shadow: 0 0 0 22px rgba(139,92,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
        }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes gridPan {
          to { background-position: 56px 56px; }
        }

        .rv-fade { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) forwards; }
        .rv-d1 { animation-delay: .1s; }
        .rv-d2 { animation-delay: .25s; }
        .rv-d3 { animation-delay: .4s; }
        .rv-d4 { animation-delay: .55s; }
        .rv-d5 { animation-delay: .7s; }

        @media (prefers-reduced-motion: reduce) {
          .rv-fade { opacity: 1; animation: none; }
          .rv-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="relative overflow-hidden bg-[#030712] text-slate-100 antialiased">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="rv-anim absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
              backgroundSize: "56px 56px",
              animation: "gridPan 8s linear infinite",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%,#000 40%,transparent 100%)",
            }}
          />
          <div className="absolute left-1/2 top-0 h-px w-[42rem] max-w-[90vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
        </div>

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
            <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="rv-fade rv-d1 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                <Sparkles size={16} className="text-violet-300" />
                AI Powered Resume Intelligence
              </div>

              <h1 className="rv-fade rv-d2 mt-7 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
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

              <p className="rv-fade rv-d3 mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-slate-300/90 sm:text-lg lg:mx-0">
                ResumeAI analyzes your resume against real job descriptions,
                identifies missing skills, and gives you actionable improvements
                to increase your career opportunities.
              </p>

              <div className="rv-fade rv-d4 mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  to="/analyze"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/40 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Analyze Resume
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 active:scale-95"
                >
                  Get Started
                </Link>
              </div>

              <div className="rv-fade rv-d5 mt-12 flex flex-wrap items-center justify-center gap-5 text-sm lg:justify-start">
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
                className="rv-anim group relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20 sm:p-8"
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
                      className="rv-fade flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-500/15"
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
        <section className="relative border-t border-white/10 bg-[#050b1f]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
            <div className="mb-14 text-center sm:mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">How it works</p>
              <h2 className="mt-4 text-balance text-3xl font-bold text-white sm:text-4xl">
                Three steps to a better career
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rv-fade group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:bg-white/[0.06] sm:p-8"
                  style={{ animationDelay: `${0.15 * index}s` }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

                  <span className="text-sm font-bold tracking-widest text-violet-300/80">
                    0{index + 1}
                  </span>

                  <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 shadow-inner shadow-white/5 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="text-white" size={24} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{step.copy}</p>
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