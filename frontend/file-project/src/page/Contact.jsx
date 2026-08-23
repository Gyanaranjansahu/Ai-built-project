import React, { useState } from "react";
import { Mail, MessageCircle, Send, Sparkles, Copy, Check, ArrowUpRight, Clock, MapPin } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

// Deterministic particles
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
        className="ct-anim absolute -inset-[20%] opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(34,197,94,0.15), transparent 60%)",
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
        className="ct-anim absolute left-1/4 top-0 h-[140vh] w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent"
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
  const [activeTab, setActiveTab] = useState("email");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "gyanastack@gmail.com";
  const whatsappNumber = "7846813554";
  const whatsappFormatted = "+91 78468 13554";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (activeTab === "whatsapp") {
      const text = `Hi, I am ${name} (${email}). ${message}`;
      window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
    } else {
      const mailtoUrl = `mailto:${emailAddress}?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

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

      <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
        <AnimatedBackground />

        {/* Top hairline beam */}
        <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent lg:top-20" />

        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Information Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="ct-fade inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl shadow-lg shadow-violet-500/10">
                <Sparkles size={14} className="animate-pulse" />
                Get In Touch
              </p>

              <h1
                className="ct-fade mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl leading-[1.15]"
                style={{ animationDelay: ".1s" }}
              >
                Let&apos;s build your
                <span
                  className="ct-anim mt-2 block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#a78bfa,#38bdf8,#34d399,#a78bfa)",
                    backgroundSize: "200% auto",
                    animation: "ctShimmer 5s linear infinite",
                  }}
                >
                  career advantage
                </span>
              </h1>

              <p
                className="ct-fade mt-4 text-slate-400 text-base leading-relaxed"
                style={{ animationDelay: ".2s" }}
              >
                Have questions or looking to collaborate? Reach out through your preferred channel and we'll respond within a few hours.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div
                className={`ct-fade group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                  activeTab === "email"
                    ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-violet-400/30 hover:bg-white/[0.05]"
                }`}
                style={{ animationDelay: ".3s" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-300 group-hover:scale-105 transition-transform">
                      <Mail size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Us</span>
                      <p className="font-medium text-slate-100">{emailAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(emailAddress)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                      title="Copy email"
                    >
                      {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    </button>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                      title="Open email app"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div
                className={`ct-fade group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                  activeTab === "whatsapp"
                    ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-emerald-400/30 hover:bg-white/[0.05]"
                }`}
                style={{ animationDelay: ".38s" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">WhatsApp</span>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/30">
                          Instant Response
                        </span>
                      </div>
                      <p className="font-medium text-slate-100">{whatsappFormatted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={`https://wa.me/91${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                      title="Open WhatsApp Chat"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Meta Stats */}
            <div className="ct-fade flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400" style={{ animationDelay: ".45s" }}>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-violet-400" />
                <span>Avg response time: ~2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400" />
                <span>Remote First</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Dynamic Form */}
          <div className="lg:col-span-7">
            <div
              className="ct-fade relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-2xl"
              style={{ animationDelay: ".2s" }}
            >
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

              {/* Mode Switcher */}
              <div className="mb-8 flex rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("email")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "email"
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Mail size={16} />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("whatsapp")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "whatsapp"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageCircle size={16} />
                  Direct WhatsApp
                </button>
              </div>

              {submitted && (
                <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm font-medium text-emerald-300 backdrop-blur-md">
                  ✨ Initiating message transfer...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Your Name</label>
                  <input
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder={
                      activeTab === "whatsapp"
                        ? "Write your message to chat directly on WhatsApp..."
                        : "Tell us about your project or inquiry..."
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                  />
                </div>

                <button
                  type="submit"
                  className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                    activeTab === "whatsapp"
                      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/50"
                      : "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-violet-500/30 hover:shadow-violet-500/50"
                  }`}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">
                    {activeTab === "whatsapp" ? "Open WhatsApp Chat" : "Send Email Message"}
                  </span>
                  {activeTab === "whatsapp" ? (
                    <MessageCircle size={18} className="relative transition group-hover:scale-110" />
                  ) : (
                    <Send size={18} className="relative transition group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}