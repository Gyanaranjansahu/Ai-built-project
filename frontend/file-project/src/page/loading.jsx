import { Loader2 } from "lucide-react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer";

export default function LoadingPage({ message = "Reading between the lines..." }) {
  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.2); }
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .lp-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        .lp-orbit { animation: orbit-spin 3s linear infinite; }
        .lp-fade-1 { animation: fade-up 0.6s ease-out both; }
        .lp-fade-2 { animation: fade-up 0.6s ease-out 0.1s both; }
        .lp-fade-3 { animation: fade-up 0.6s ease-out 0.2s both; }
        .lp-fade-4 { animation: fade-up 0.6s ease-out 0.3s both; }
        .lp-fade-5 { animation: fade-up 0.6s ease-out 0.4s both; }
        .lp-shimmer { animation: shimmer 1.8s ease-in-out infinite; }
      `}</style>

      <Navbar />

      <div className="w-full bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E]">
        <section className="max-w-3xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          {/* Pulsing icon badge */}
          <div className="relative mb-8 lp-fade-1">
            <div className="absolute -inset-8 bg-violet-500/20 blur-3xl rounded-full lp-glow" />

            {/* Orbiting ring */}
            <div className="absolute -inset-2 rounded-2xl lp-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.6)]" />
            </div>

            <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-violet-950/40">
              <Loader2 className="w-9 h-9 text-violet-300 animate-spin" strokeWidth={1.75} />
            </div>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-violet-300 lp-fade-2">
            Analyzing
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 leading-[1.05] text-balance lp-fade-3">
            {message}
          </h1>

          <p className="text-slate-300 text-base mt-6 max-w-sm text-balance lp-fade-4">
            This usually takes a few seconds. Hang tight while we match you up.
          </p>

          {/* Progress bar shimmer */}
          <div className="relative w-56 h-1 mt-10 rounded-full bg-white/10 overflow-hidden lp-fade-5">
            <div className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 lp-shimmer" />
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-6 lp-fade-5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          <div className="h-px w-full bg-white/10 mt-16" />
          <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mt-8">
            Primer &middot; Interview prep, made specific
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}