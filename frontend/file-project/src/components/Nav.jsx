import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Sparkles, BrainCircuit } from "lucide-react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{`
        @keyframes navSweep { to { transform: translateX(100%); } }
        @keyframes navDrawerIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes navItemIn {
          from { opacity: 0; transform: translateX(-14px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes logoGlow {
          0%,100% { box-shadow: 0 8px 24px -6px rgba(139,92,246,0.5); }
          50% { box-shadow: 0 8px 30px -4px rgba(34,211,238,0.55); }
        }
        .nav-drawer { animation: navDrawerIn .35s cubic-bezier(.22,1,.36,1) both; }
        .nav-item { animation: navItemIn .4s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .nav-drawer, .nav-item, .nav-logo { animation: none !important; }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#020617]/85 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* top hairline beam */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-20 lg:px-8">
          {/* Premium Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="nav-logo relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 transition-transform duration-300 group-hover:scale-105 lg:h-11 lg:w-11"
              style={{ animation: "logoGlow 4s ease-in-out infinite" }}
            >
              <BrainCircuit className="text-white" size={25} />
              <Sparkles
                size={12}
                className="absolute -right-1 -top-1 text-yellow-300 transition-transform duration-300 group-hover:rotate-90"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white lg:text-xl">
                Resume<span className="text-cyan-400">AI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Smart Career Engine
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex lg:gap-9">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/analyze"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/50 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Analyze Resume</span>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 active:scale-90 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="nav-drawer border-t border-white/10 bg-[#020617]/95 px-5 py-6 backdrop-blur-2xl md:hidden">
            <div className="space-y-1">
              {links.map((link, i) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `nav-item block rounded-xl px-4 py-3 text-lg font-medium transition ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <Link
              to="/analyze"
              onClick={() => setOpen(false)}
              className="nav-item mt-4 block rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 py-3.5 text-center font-semibold text-white shadow-lg shadow-violet-500/30 active:scale-95"
              style={{ animationDelay: `${links.length * 0.06}s` }}
            >
              Analyze Resume
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Nav;