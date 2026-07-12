import React, { useState } from "react";
import "../style/signup.css";

import useauth from "../authentication/hookcontroll";
import LoadingPage from "./loading";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav";
// import AuthBlueBackground from "../components/AuthBlueBackground";
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()
    let { loading, handleSignup } = useauth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wait for signup result because hook returns true for success and false for error.
        const success = await handleSignup({ name, email, password })
        console.log(success);
        // Redirect to login only after account is created successfully.
        if (success) {
            navigate("/login")
        }


    };
    if (loading) {
        return <LoadingPage />
    }
    return (
      <>
      <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E] px-6">
            <div className="w-full max-w-sm">
                <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                    {/* <Compass className="w-5 h-5 text-amber" /> */}
                    <span className="font-display text-lg font-semibold text-white">Primer</span>
                </Link>

                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-violet-950/40 ring-1 ring-white/5">
                    <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

                    <h1 className="relative font-display text-2xl font-semibold text-white mb-1">
                        Create your account
                    </h1>
                    <p className="relative text-slate-300 text-sm mb-6">
                        Free to start — your first fit analysis is on us.
                    </p>

                    <form onSubmit={handleSubmit} className="relative space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Name
                            </label>
                            <div className="relative">
                                {/* <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /> */}
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jordan Lee"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /> */}
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /> */}
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/40 transition-colors"
                                />
                            </div>
                        </div>

                        {/* {error && <p className="text-sm text-red-400">{error}</p>} */}

                        <button

                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium shadow-lg shadow-violet-900/40 ring-1 ring-white/10 hover:shadow-xl hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg cursor-pointer"
                        >
                            {loading ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    <p className="relative text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white hover:text-violet-300 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      </>
    );
};

export default Register;