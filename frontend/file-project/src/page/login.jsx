import { useContext, useState } from "react";
import { Eye, EyeOff, BrainCircuit, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useauth from "../authentication/hookcontroll";
import LoadingPage from "./loading";
import { authContext, Authprovider } from "../authentication/authcontect";
import Navbar from "../components/Nav";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { authLoading, refreshUser } = useContext(authContext);

  const { handleLogin, loading } = useauth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const res = await handleLogin({
      email,
      password,
    });

    if (res) {
      setEmail("");
      setPassword("");
      navigate("/analyze");
    } else {
      setError(res.message || "Login failed. Please try again.");
    }
  };

  if (authLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <style>{`
        @keyframes lgDrift {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(26px,-20px); }
        }
        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lgItemIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lgLogoGlow {
          0%,100% { box-shadow: 0 8px 24px -6px rgba(139,92,246,0.5); }
          50% { box-shadow: 0 8px 30px -4px rgba(34,211,238,0.55); }
        }
        .lg-card { animation: lgFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .lg-item { opacity: 0; animation: lgItemIn .5s cubic-bezier(.22,1,.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .lg-card, .lg-item { opacity: 1; animation: none !important; }
          .lg-anim { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 pt-24 pb-12 sm:px-6">
        {/* fine grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%,#000 40%,transparent 100%)",
          }}
        />

        {/* Background Glow */}
        <div
          className="lg-anim pointer-events-none absolute left-6 top-24 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl sm:h-72 sm:w-72"
          style={{ animation: "lgDrift 14s ease-in-out infinite" }}
        />
        <div
          className="lg-anim pointer-events-none absolute bottom-10 right-6 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl sm:h-72 sm:w-72"
          style={{ animation: "lgDrift 18s ease-in-out infinite reverse" }}
        />

        {/* Auth Card */}
        <div className="lg-card relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8">
          {/* top hairline beam */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3">
              <div
                className="lg-anim flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30"
                style={{ animation: "lgLogoGlow 4s ease-in-out infinite" }}
              >
                <BrainCircuit size={28} className="text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  Resume<span className="text-cyan-400">AI</span>
                </h1>
                <p className="text-xs text-slate-400">Smart Career Engine</p>
              </div>
            </div>
          </div>

          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              <Sparkles size={14} />
              Welcome Back
            </div>

            <h1 className="text-3xl font-bold text-white">Sign in to ResumeAI</h1>

            <p className="mt-2 text-sm text-slate-400">
              Continue improving your career profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="lg-item" style={{ animationDelay: ".08s" }}>
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="example@email.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
              />
            </div>

            <div className="lg-item" style={{ animationDelay: ".16s" }}>
              <label className="text-sm text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="********"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-5 text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="lg-item group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/50 active:scale-95 disabled:opacity-50"
              style={{ animationDelay: ".24s" }}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="ml-2 font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;