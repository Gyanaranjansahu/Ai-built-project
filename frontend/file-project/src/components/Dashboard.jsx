import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Code2,
  HeartHandshake,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  FileSearch,
  Target
} from "lucide-react";

import Navbar from "./Nav";
import useauth from "../authentication/hookcontroll";


export default function Dashboard() {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { handleLogout } = useauth();

  const onLogoutClick = async () => {
    if (handleLogout) await handleLogout();
    navigate("/login");
  };


  const navLinks = [
    { name:"Dashboard", icon:LayoutDashboard, path:"/dashboard" },
    { name:"ATS Score", icon:BarChart3, path:"/dashboard/ats" },
    { name:"Technical Question", icon:Code2, path:"/dashboard/technical" },
    { name:"Behavioral Question", icon:HeartHandshake, path:"/dashboard/behavioral" },
  ];


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white flex relative overflow-hidden">

        <div className="absolute top-0 left-0 h-96 w-96 bg-violet-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-cyan-500/10 blur-3xl rounded-full" />


        {/* Mobile Button */}
        <button
          onClick={()=>setIsMobileOpen(!isMobileOpen)}
          className="md:hidden fixed top-24 left-5 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-xl"
        >
          {isMobileOpen ? <X/> : <Menu/>}
        </button>


        {/* Sidebar */}
        <aside className={`
          fixed md:static z-40 top-0 left-0 h-full w-72
          border-r border-white/10
          bg-white/5 backdrop-blur-2xl
          p-6 flex flex-col justify-between
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>


          <div>

            <div className="flex items-center gap-3 mb-10">

              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Sparkles/>
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Resume<span className="text-cyan-400">AI</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Career Intelligence
                </p>
              </div>

            </div>



            <nav className="space-y-2">

              {
                navLinks.map(({name,icon:Icon,path})=>(
                  <Link
                    key={name}
                    to={path}
                    onClick={()=>setIsMobileOpen(false)}
                    className="
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    text-slate-300
                    hover:text-white
                    hover:bg-white/10
                    transition
                    "
                  >
                    <Icon size={18} className="text-cyan-400"/>
                    {name}
                  </Link>
                ))
              }

            </nav>

          </div>



          <button
            onClick={onLogoutClick}
            className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            text-red-400
            hover:bg-red-500/10
            transition
            "
          >
            <LogOut size={18}/>
            Logout
          </button>


        </aside>




        {/* Main */}
        <div className="flex-1 min-w-0">

          <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl px-8 py-8">

            <h1 className="text-3xl font-bold">
              Welcome back 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Your AI career preparation dashboard.
            </p>

          </header>



          <main className="p-6 md:p-10">


            {/* Stats */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">


              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <FileSearch className="text-violet-400 mb-4"/>

                <h3 className="text-2xl font-bold">
                  Resume Scan
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Analyze your resume with AI.
                </p>

              </div>



              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <Target className="text-cyan-400 mb-4"/>

                <h3 className="text-2xl font-bold">
                  ATS Score
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Improve job matching chances.
                </p>

              </div>



              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <BarChart3 className="text-emerald-400 mb-4"/>

                <h3 className="text-2xl font-bold">
                  Career Insights
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Get personalized suggestions.
                </p>

              </div>


            </div>




            {/* Workspace */}

            <div className="
            min-h-[350px]
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            flex items-center justify-center
            text-slate-400
            ">

              Your AI workspace will appear here

            </div>


          </main>


        </div>


      </div>

    </>
  );
}