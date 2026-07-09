import { Link } from "react-router-dom";
import { ArrowLeft, Compass, SearchX } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        .nf-float { animation: float-icon 4s ease-in-out infinite; }
        .nf-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .nf-fade-1 { animation: fade-up 0.6s ease-out both; }
        .nf-fade-2 { animation: fade-up 0.6s ease-out 0.1s both; }
        .nf-fade-3 { animation: fade-up 0.6s ease-out 0.2s both; }
        .nf-fade-4 { animation: fade-up 0.6s ease-out 0.3s both; }
        .nf-fade-5 { animation: fade-up 0.6s ease-out 0.4s both; }
      `}</style>

      <Navbar />

      <div className="w-full bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E]">
        <section className="max-w-3xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          {/* Icon badge */}
          <div className="relative mb-8 nf-fade-1">
            <div className="absolute -inset-6 bg-violet-500/20 blur-3xl rounded-full nf-glow" />
            <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-violet-950/40 nf-float">
              <SearchX className="w-9 h-9 text-violet-300" strokeWidth={1.75} />
            </div>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-violet-300 nf-fade-2">
            Error 404
          </span>

          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-white mt-4 leading-[1.05] text-balance nf-fade-3">
            This page didn't make the cut.
          </h1>

          <p className="text-slate-300 text-lg mt-6 max-w-md text-balance nf-fade-4">
            The page you're looking for doesn't exist, moved, or never made it
            past the resume screen. Let's get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 nf-fade-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium shadow-lg shadow-violet-900/40 ring-1 ring-white/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-slate-200 font-medium hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Compass className="w-4 h-4" /> Analyze my fit
            </Link>
          </div>

          {/* Decorative divider */}
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