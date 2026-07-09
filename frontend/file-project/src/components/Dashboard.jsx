import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  BarChart3, 
  Code2, 
  HeartHandshake, 
  LogOut, 
  LayoutDashboard,
  Menu,
  X 
} from "lucide-react";
import Navbar from "./Nav";

export default function Dashboard() {
  const navigate = useNavigate();
  // const { user, handleLogout } = useauth(); // Adjust based on your hook's logout method
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const onLogoutClick = async () => {
    // Basic logout wrapper
    if (handleLogout) {
      await handleLogout();
    }
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "ATS Score", icon: BarChart3, path: "/dashboard/ats" },
    { name: "Technical Question", icon: Code2, path: "/dashboard/technical" },
    { name: "Behavioral Question", icon: HeartHandshake, path: "/dashboard/behavioral" },
  ];

  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-[#0F0B2E] text-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#1A1440]/50 backdrop-blur-xl border-b border-white/10 w-full z-50">
        <span className="font-display text-lg font-semibold tracking-tight">Primer</span>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1 text-slate-300 hover:text-white">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Aside Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1440]/40 border-r border-white/10 p-6 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out transform
        md:translate-x-0 md:static md:h-screen
        ${isMobileOpen ? "translate-x-0 w-full max-w-[280px]" : "-translate-x-full"}
      `}>
        <div className="space-y-8">
          {/* Brand/Logo Header */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-display text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Primer
            </span>
          </div>

          {/* Nav Links Stack */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Logout Block */}
        <div className="pt-4 border-t border-white/5">
          <button
            onClick={onLogoutClick}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Container Layout */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Persistent Welcome Header Row */}
        <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-[#0F0B2E]/20 backdrop-blur-md">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Welcome, {name || "User"}!
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Here is your core prep suite snapshot.
            </p>
          </div>
        </header>

        {/* Blank Workspace Target Area */}
        <main className="flex-1 p-8">
          <div className="w-full h-full min-h-[450px] bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl ring-1 ring-white/5 p-6 flex items-center justify-center text-slate-500 border-dashed">
            {/* Inject your specific page elements right inside here */}
            <p className="font-mono text-sm uppercase tracking-wider">Empty Workspace Container</p>
          </div>
        </main>
      </div>
    </div>
   </>
  );
}