import { Link } from "react-router-dom";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const socials = [
    { icon: FaGithub, label: "GitHub", href: "https://github.com/Gyanaranjansahu" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/gyanaranjan-sahu-6331a8333?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/Gyanaranjansahu" },
  ];

  const productLinks = [
    { name: "Analyze Resume", path: "/analyze" },
    { name: "Services", path: "/services" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] text-white">
      <style>{`
        @keyframes ftDrift {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(24px,-18px); }
        }
        @keyframes ftSweep { to { transform: translateX(100%); } }
        @keyframes ftFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ft-fade { opacity: 0; animation: ftFadeUp .7s cubic-bezier(.22,1,.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ft-fade { opacity: 1; animation: none; }
          .ft-anim { animation: none !important; }
        }
      `}</style>

      {/* top hairline beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

      {/* Background Glow */}
      <div
        className="ft-anim pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
        style={{ animation: "ftDrift 14s ease-in-out infinite" }}
      />
      <div
        className="ft-anim pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        style={{ animation: "ftDrift 18s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="ft-fade md:col-span-2" style={{ animationDelay: "0s" }}>
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <BrainCircuit size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Resume<span className="text-cyan-400">AI</span>
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Smart Career Engine
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              AI-powered resume analysis that helps you improve your ATS score
              and discover better career opportunities.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="ft-fade" style={{ animationDelay: ".12s" }}>
            <h3 className="mb-5 font-semibold text-white">Product</h3>
            <div className="space-y-3 text-sm text-slate-400">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group flex w-fit items-center gap-1.5 transition hover:text-cyan-400"
                >
                  <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="ft-fade" style={{ animationDelay: ".24s" }}>
            <h3 className="mb-5 font-semibold text-white">Company</h3>
            <div className="space-y-3 text-sm text-slate-400">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group flex w-fit items-center gap-1.5 transition hover:text-cyan-400"
                >
                  <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ft-fade mt-14 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-500 hover:border-white/20 md:flex-row md:items-center md:justify-between" style={{ animationDelay: ".3s" }}>
          <div>
            <h3 className="text-xl font-bold">Ready to improve your resume?</h3>
            <p className="mt-1 text-slate-400">
              Get your AI analysis and career insights.
            </p>
          </div>

          <Link
            to="/analyze"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/50 active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Analyze Now</span>
            <ArrowRight size={18} className="relative transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <p>Built with AI • Designed for careers</p>
        </div>
      </div>
    </footer>
  );
}