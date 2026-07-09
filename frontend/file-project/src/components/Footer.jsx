import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F0B2E]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row">
        
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="font-display text-lg font-semibold text-white">
            Primer
          </h3>

          <p className="mt-2 font-mono text-xs text-slate-400">
            © {new Date().getFullYear()} Primer — Walk in already knowing the
            room.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-slate-300 transition-all duration-300 hover:text-violet-300"
          >
            Home
          </Link>

          <Link
            to="/analyze"
            className="text-slate-300 transition-all duration-300 hover:text-violet-300"
          >
            Analyze
          </Link>

          <Link
            to="/login"
            className="text-slate-300 transition-all duration-300 hover:text-violet-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </footer>
  );
}