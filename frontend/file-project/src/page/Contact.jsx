import { Mail, MapPin, Send, Sparkles } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

// deterministic pseudo-random so particles don't jump between renders
const particles = Array.from({ length: 16 }, (_, i) => {
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
        className="ct-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(96,165,250,0.22), transparent 60%)",
          filter: "blur(40px)",
          animation: "ctAurora 20s ease-in-out infinite",
        }}
      />
      <div
        className="ct-anim absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "ctGridPan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 15%,#000 40%,transparent 100%)",
        }}
      />
      <div
        className="ct-anim absolute left-1/2 top-0 h-[140vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
        style={{ animation: "ctBeam 14s ease-in-out infinite" }}
      />
      <div
        className="ct-anim absolute left-1/4 top-0 h-[140vh] w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "ctBeam 18s ease-in-out infinite reverse" }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="ct-anim absolute rounded-full"
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
            animation: `ctFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <style>{`
        @keyframes ctAurora {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33% { transform: translate(4%,-3%) rotate(8deg) scale(1.08); }
          66% { transform: translate(-3%,4%) rotate(-6deg) scale(1.04); }
        }
        @keyframes ctGridPan { to { background-position: 56px 56px; } }
        @keyframes ctBeam {
          0%,100% { transform: translateX(-40vw); opacity: 0; }
          50% { transform: translateX(40vw); opacity: 1; }
        }
        @keyframes ctFloat {
          0%,100% { transform: translateY(0) translateX(0); opacity: .35; }
          25% { opacity: 1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: .6; }
          75% { opacity: .9; }
        }
        @keyframes ctShimmer { to { background-position: 200% center; } }
        @keyframes ctFadeUp { from { opacity:0; transform: translateY(24px);} to { opacity:1; transform: translateY(0);} }
        .ct-fade { opacity: 0; animation: ctFadeUp .8s cubic-bezier(.22,1,.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ct-fade { opacity: 1; animation: none; }
          .ct-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b1120] to-[#020617] text-white">
        <AnimatedBackground />

        {/* top hairline beam */}
        <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent lg:top-20" />

        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            <p className="ct-fade inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl">
              <Sparkles size={14} />
              Contact
            </p>

            <h1
              className="ct-fade mt-7 text-balance text-4xl font-bold leading-[1.1] sm:text-5xl"
              style={{ animationDelay: ".1s" }}
            >
              Let&apos;s build your
              <span
                className="ct-anim mt-1 block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#a78bfa,#60a5fa,#22d3ee,#a78bfa)",
                  backgroundSize: "200% auto",
                  animation: "ctShimmer 5s linear infinite",
                }}
              >
                career advantage
              </span>
            </h1>

            <p
              className="ct-fade mt-6 max-w-md text-pretty leading-8 text-slate-300"
              style={{ animationDelay: ".2s" }}
            >
              Have questions about ResumeAI? Our team is here to help.
            </p>

            <div className="mt-10 space-y-4">
              <div
                className="ct-fade group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                style={{ animationDelay: ".3s" }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30">
                  <Mail className="text-cyan-300" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Email</p>
                  <span className="text-slate-100">support@resumeai.com</span>
                </div>
              </div>

              <div
                className="ct-fade group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                style={{ animationDelay: ".38s" }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30">
                  <MapPin className="text-cyan-300" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Location</p>
                  <span className="text-slate-100">Remote First Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — form card */}
          <div
            className="ct-fade relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8"
            style={{ animationDelay: ".2s" }}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

            <form className="space-y-5">
              <div>
                <label className="text-sm text-slate-300">Your Name</label>
                <input
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <button
                type="submit"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/50 active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Send Message</span>
                <Send size={18} className="relative transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}