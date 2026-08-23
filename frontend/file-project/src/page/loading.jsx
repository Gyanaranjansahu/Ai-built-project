import React, { useState, useEffect } from "react";
import { Sparkles, Brain, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer";

// Deterministic ambient glow nodes
const nodes = Array.from({ length: 12 }, (_, i) => {
  const seed = (n) => (Math.sin(i * 43.1 + n) + 1) / 2;
  return {
    left: seed(1) * 100,
    top: seed(2) * 100,
    size: 3 + seed(3) * 5,
    duration: 8 + seed(4) * 10,
    delay: seed(5) * -10,
  };
});

const defaultSteps = [
  "Parsing profile architecture",
  "Synthesizing key competencies",
  "Calibrating AI insights",
  "Finalizing response payload",
];

export default function LoadingPage({ message = "Reading between the lines..." }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Cycle through contextual processing steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < defaultSteps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes auroraGlow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(5%, -5%) scale(1.15); opacity: 0.7; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes shimmerLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
        }
        .animate-aurora { animation: auroraGlow 14s ease-in-out infinite; }
        .animate-pulse-ring { animation: pulseRing 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmerLine 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-particle { animation: floatParticle ease-in-out infinite; }
      `}</style>

      <Navbar />

      <main className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 py-20 text-white">
        
        {/* Background Ambient Lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-aurora absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
          />
          <div
            className="animate-aurora absolute -right-[10%] -bottom-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]"
            style={{ animationDelay: "-7s" }}
          />

          {/* Subtle Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)",
            }}
          />

          {/* Floating Glow Nodes */}
          {nodes.map((n, i) => (
            <span
              key={i}
              className="animate-particle absolute rounded-full bg-violet-400/60 shadow-[0_0_10px_rgba(167,139,250,0.5)]"
              style={{
                left: `${n.left}%`,
                top: `${n.top}%`,
                width: `${n.size}px`,
                height: `${n.size}px`,
                animationDuration: `${n.duration}s`,
                animationDelay: `${n.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Central Card Container */}
        <div className="relative z-10 mx-auto flex max-w-xl w-full flex-col items-center rounded-3xl border border-white/10 bg-slate-900/40 p-8 sm:p-12 shadow-2xl shadow-black/80 backdrop-blur-2xl">
          
          {/* Top Line Accent */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300 backdrop-blur-xl shadow-lg shadow-violet-500/10 mb-8">
            <Sparkles size={13} className="animate-pulse text-violet-400" />
            AI Processing Active
          </div>

          {/* Central Animated Spinner Icon */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer Pulsing Glow */}
            <div className="animate-pulse-ring absolute h-28 w-28 rounded-3xl bg-violet-500/20 blur-xl" />
            
            {/* Rotating Outer Border */}
            <div className="absolute h-24 w-24 rounded-2xl border border-dashed border-violet-400/40 animate-[spin_10s_linear_infinite]" />
            
            {/* Core Box */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-md">
              <Brain size={36} className="text-violet-300 animate-pulse" />
            </div>
          </div>

          {/* Dynamic Loading Header */}
          <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {message}
          </h1>

          <p className="mt-3 text-center text-sm text-slate-400">
            Hold tight! We are optimizing your experience and generating tailored insights.
          </p>

          {/* Custom Shimmer Progress Bar */}
          <div className="relative mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="animate-shimmer absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
          </div>

          {/* Dynamic Step Status List */}
          <div className="mt-8 w-full space-y-3 border-t border-white/10 pt-6">
            {defaultSteps.map((step, idx) => {
              const isDone = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs transition-all duration-500 ${
                    isCurrent
                      ? "text-violet-300 font-medium translate-x-1"
                      : isDone
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Cpu size={16} className="text-violet-400 animate-spin shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>

          {/* Footer Security Tag */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            <ShieldCheck size={14} className="text-slate-400" />
            <span>Secure &amp; Encrypted Generation</span>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}