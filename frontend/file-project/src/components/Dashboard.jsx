import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, Outlet, useParams } from "react-router-dom";
import { authContext } from "../authentication/authcontect.jsx";
import {
  BarChart3,
  Code2,
  HeartHandshake,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  User,
  CalendarDays,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck2,
  Zap,
  Search,
  ChevronRight,
  ShieldCheck,
  Smile
} from "lucide-react";
import useAuth from "../authentication/hookcontroll";

export default function Dashboard() {
  const { userId } = useParams();
  const { loading } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { handleLogout, user } = useAuth();

  const onLogoutClick = async () => {
    if (handleLogout) await handleLogout();
    navigate("/login");
  };

  let id = user?.data?._id;

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: `/dashboard` },
    { name: "7 Day Plan", icon: CalendarDays, path: `/dashboard/7-day-plan/${id}` },
    { name: "ATS Score", icon: BarChart3, path: `/dashboard/matchscore/${id}` },
    { name: "Technical Question", icon: Code2, path: `/dashboard/technical/${id}` },
    { name: "Behavioral Question", icon: HeartHandshake, path: `/dashboard/behavioral/${id}` },
    { name: "Profile", icon: User, path: `/dashboard/profile` }
  ];

  const quickTools = [
    {
      title: "7-Day Interview Prep",
      description: "Structured daily roadmaps to get interview-ready in a week.",
      icon: CalendarDays,
      path: `/dashboard/7-day-plan/${id}`,
      color: "from-violet-500/20 to-purple-500/10",
      borderColor: "border-violet-500/30",
      iconColor: "text-violet-400",
      badge: "Popular"
    },
    {
      title: "ATS Resume Scorer",
      description: "Analyze compatibility against job descriptions instantly.",
      icon: BarChart3,
      path: `/dashboard/matchscore/${id}`,
      color: "from-cyan-500/20 to-blue-500/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      badge: "AI Powered"
    },
    {
      title: "Technical Practice",
      description: "Tailored DSA and system design interview questions.",
      icon: Code2,
      path: `/dashboard/technical/${id}`,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      title: "Behavioral Prep",
      description: "Master STAR method responses tailored to your experience.",
      icon: HeartHandshake,
      path: `/dashboard/behavioral/${id}`,
      color: "from-amber-500/20 to-orange-500/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    }
  ];

  const isIndexPage = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  // Extract displaying user name or email fallback
  const userName = user?.data?.name || user?.data?.username || "User";

  return (
    <div className="min-h-screen lg:h-screen bg-[#030712] text-slate-100 flex flex-col lg:flex-row relative overflow-x-hidden font-sans selection:bg-cyan-500/30">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-5%] left-[-10%] h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] bg-violet-600/15 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] bg-cyan-500/15 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed lg:static z-50 top-0 left-0 h-full w-[280px] sm:w-72 shrink-0
          border-r border-slate-800/60
          bg-slate-950/95 lg:bg-slate-900/40 backdrop-blur-2xl
          p-5 sm:p-6 flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-1 group"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-cyan-400 border border-white/10">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Resume<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">AI</span>
                </h2>
                <p className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                  Career Workspace
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition active:scale-95"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Navigation
            </div>
            {navLinks.map(({ name, icon: Icon, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/10 text-white border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400"
                    }`}
                  />
                  <span className="flex-1 truncate">{name}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-4 border-t border-slate-800/60">
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200 active:scale-[0.98]"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto">
        
        {/* Header Bar */}
        <header className="sticky top-0 z-30 h-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">

          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800/80 transition active:scale-95 shadow-sm"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Dashboard
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                AI Resume Analyzer & Preparation Suite
              </p>
            </div>
          </div>

          {/* Middle Section: Search Bar */}
          <div className="hidden md:flex items-center relative max-w-xs w-full">
            <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools, plans..."
              className="w-full bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Analyze CTA */}
            <Link
              to={`/dashboard/matchscore/${id}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/15 border border-cyan-400/20 transition-all duration-200 active:scale-95"
            >
              <Zap size={14} className="fill-current text-white" />
              <span>Analyze Resume</span>
            </Link>

            {/* Welcome Greeting Pill (Replaces Notifications) */}
            <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <Smile size={15} className="text-cyan-400" />
              <span className="text-slate-400">Welcome,</span>
              <span className="font-semibold text-slate-100">{userName}</span>
            </div>

            <div className="h-6 w-[1px] bg-slate-800/80 hidden sm:block" />

            {/* Profile Navigation Button (Navigates to /dashboard/profile directly) */}
            <Link
              to="/dashboard/profile"
              className="group flex items-center gap-3 p-1.5 sm:pr-3.5 rounded-2xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200"
              title="View Profile"
            >
              <div className="relative">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden border border-slate-700/80 group-hover:border-cyan-400/60 transition-colors shrink-0">
                  {user?.data?.profileImage ? (
                    <img
                      src={user.data.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-violet-600/30 to-cyan-600/30 text-cyan-300">
                      <User size={18} />
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1 max-w-[110px]">
                  {userName}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  View Profile <ChevronRight size={10} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

          </div>

        </header>

        {/* Main Workspace Area */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {isIndexPage ? (
            /* Dashboard Index View */
            <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
              
              {/* Hero Banner */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-violet-950/50 via-slate-900/90 to-cyan-950/40 p-5 sm:p-8 backdrop-blur-xl shadow-xl">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                    <Zap size={12} /> Recommended Action
                  </span>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Optimize Your Resume for Job Applications
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Check your ATS compatibility rating against target job descriptions and discover key missing keywords before applying.
                  </p>
                  <Link
                    to={`/dashboard/matchscore/${id}`}
                    className="inline-flex items-center justify-center gap-2 mt-5 w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 hover:brightness-110 transition"
                  >
                    <span>Check ATS Score</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 backdrop-blur-xl flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-400 font-medium truncate">Average Match</p>
                    <p className="text-base sm:text-lg font-bold text-white truncate">84% Rating</p>
                  </div>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 backdrop-blur-xl flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                    <Target size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-400 font-medium truncate">Prep Progress</p>
                    <p className="text-base sm:text-lg font-bold text-white truncate">Day 3 / 7 Active</p>
                  </div>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 backdrop-blur-xl flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <FileCheck2 size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-400 font-medium truncate">Readiness</p>
                    <p className="text-base sm:text-lg font-bold text-white truncate">High Confidence</p>
                  </div>
                </div>
              </div>

              {/* Prep Modules Grid */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Preparation Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3.5 sm:gap-5">
                  {quickTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.title}
                        to={tool.path}
                        className={`group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border ${tool.borderColor} bg-gradient-to-br ${tool.color} p-4 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-600 active:scale-[0.99]`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-white/10 ${tool.iconColor} shrink-0`}>
                              <Icon size={20} />
                            </div>
                            {tool.badge && (
                              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                            {tool.title}
                          </h4>
                          <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center text-xs font-semibold text-slate-300 gap-1.5 pt-2">
                          <span>Open Tool</span>
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Sub-route Outlet Container */
            <div className="w-full h-full min-h-[500px] rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <Outlet />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}