import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  UserCircle2,
  Briefcase,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
// import Layout from "../components/Layout";
import Navbar from "./Nav";
import Footer from "./Footer";

export default function Analyze() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume || !selfDescription || !jobDescription) {
      setError("Please fill all the fields.");
      return;
    }

    navigate("/results");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E] px-6 pt-16 pb-24 relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="pointer-events-none absolute top-40 left-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-40 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="max-w-3xl mx-auto relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-400">
            Analyze my fit
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Three inputs, one honest read.
          </h1>

          <p className="text-slate-300 text-lg mt-4">
            Fill these in and Primer will tell you exactly how you stack up.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            {/* Resume */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl ring-1 ring-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-violet-400" />
                <label className="font-display text-lg font-semibold text-white">
                  Your Resume
                </label>
              </div>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 border border-white/10 rounded-xl bg-white/5 p-3 outline-none focus:ring-2 focus:ring-violet-400/50 transition-all"
              />

              {resume && (
                <p className="text-sm text-slate-400 mt-3 pl-1">
                  Selected: <span className="text-violet-300">{resume.name}</span>
                </p>
              )}
            </div>

            {/* Self Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl ring-1 ring-white/5">
              <div className="flex items-center gap-3 mb-4">
                <UserCircle2 className="w-5 h-5 text-violet-400" />
                <label className="font-display text-lg font-semibold text-white">
                  Describe Yourself
                </label>
              </div>

              <textarea
                rows={5}
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 resize-none text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/40 transition-all"
              />
            </div>

            {/* Job Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl ring-1 ring-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-violet-400" />
                <label className="font-display text-lg font-semibold text-white">
                  Job Description
                </label>
              </div>

              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description..."
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 resize-none text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/40 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 backdrop-blur-md">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium shadow-lg shadow-violet-900/40 ring-1 ring-white/10 hover:shadow-xl hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Analyze My Fit
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
}