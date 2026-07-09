import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../authentication/authcontect.jsx"

export default function Navbar() {
  const {user} = useContext(authContext);
console.log(user);



  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F0B2E]/80 shadow-lg shadow-violet-950/20 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/20 shadow-lg shadow-violet-900/30 ring-1 ring-violet-400/20">
            <Compass className="h-5 w-5 text-violet-300 drop-shadow-sm" strokeWidth={2.2} />
          </div>

          <span className="font-display text-2xl font-bold tracking-tight text-white">
           Analyser
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="group relative text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-violet-300"
          >
            Home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {user && (
            <Link
              to="/analyze"
              className="group relative text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-violet-300"
            >
              Analyze
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          )}
        </nav>

        {/* Button */}
       
{
  !user ?       <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40"
          >
            Get Started


          
            
          </Link>:

                    <Link
            to="/dashboard"
            className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40"
          >
            Dashboard
          </Link>
}
      </div>
    </header>
  );
}