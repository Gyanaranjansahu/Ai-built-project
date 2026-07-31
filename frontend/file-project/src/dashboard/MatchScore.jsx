import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Loader2,
} from "lucide-react";

import { authContext } from "../authentication/authcontect.jsx";
import useAuth from "../authentication/hookcontroll.js";

export default function MatchScore() {
  const { report, getReport } = useContext(authContext);
  const { getReportById } = useAuth();

  const { id } = useParams();

  const [count, setCount] = useState(0);

  // =========================
  // GET REPORT
  // =========================
  useEffect(() => {
    async function fetchReport() {
      if (!id) return;

      await getReportById(id);
      getReport(id);
    }

    fetchReport();
  }, [id]);

  // =========================
  // REPORT DATA
  // =========================
  const score = report?.InterviewReport?.matchScore || 0;
  const title = report?.InterviewReport?.title || "Job Role";
  const skillGaps = report?.InterviewReport?.skillGaps || [];

  // =========================
  // SCORE ANIMATION
  // =========================
  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current += 1;

      if (current >= score) {
        current = score;
        clearInterval(timer);
      }

      setCount(current);
    }, 15);

    return () => clearInterval(timer);
  }, [score]);

  // Dynamic Theme Colors based on score
  const getThemeColor = (value) => {
    if (value >= 80) {
      return {
        text: "text-emerald-400",
        stroke: "stroke-emerald-400",
        gradientFrom: "from-emerald-500/20",
        bgBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        glow: "shadow-emerald-500/10",
      };
    }
    if (value >= 60) {
      return {
        text: "text-blue-400",
        stroke: "stroke-blue-400",
        gradientFrom: "from-blue-500/20",
        bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        glow: "shadow-blue-500/10",
      };
    }
    return {
      text: "text-amber-400",
      stroke: "stroke-amber-400",
      gradientFrom: "from-amber-500/20",
      bgBadge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "shadow-amber-500/10",
    };
  };

  const currentTheme = getThemeColor(score);

  // SVG Gauge constants
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  // =========================
  // LOADING
  // =========================
  if (!report) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07080c] text-white">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          </div>
          <p className="animate-pulse text-sm font-medium tracking-wide text-slate-400">
            Analyzing your report details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl">
        {/* =========================
            JOB TITLE / HEADER
        ========================= */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-400 backdrop-blur-md transition-all hover:border-blue-500/30">
            <Sparkles size={13} className="animate-pulse" />
            <span>Resume Analysis Report</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
        </div>

        {/* =========================
            MATCH SCORE CARD
        ========================= */}
        <div className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 ${currentTheme.glow}`}>
          {/* Subtle card top gradient */}
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${currentTheme.gradientFrom} to-transparent opacity-50`} />

          <p className="relative text-xs font-semibold uppercase tracking-widest text-slate-400">
            Overall Match Score
          </p>

          <div className="relative mt-6 flex flex-col items-center justify-center">
            {/* Animated Circular Gauge */}
            <div className="relative flex items-center justify-center">
              <svg className="h-52 w-52 -rotate-90 transform">
                {/* Background Track */}
                <circle
                  cx="104"
                  cy="104"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="104"
                  cy="104"
                  r={radius}
                  className={`${currentTheme.stroke} transition-all duration-300 ease-out`}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Central Score Display */}
              <div className="absolute flex items-baseline justify-center">
                <span className={`text-6xl font-black tracking-tight ${currentTheme.text}`}>
                  {count}
                </span>
                <span className="ml-1 text-2xl font-bold text-slate-500">%</span>
              </div>
            </div>

            {/* Assessment Indicator Tag */}
            <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${currentTheme.bgBadge}`}>
              <TrendingUp size={13} />
              <span>
                {score >= 80 ? "Strong Fit" : score >= 60 ? "Moderate Fit" : "Needs Work"}
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            SKILL GAPS SECTION
        ========================= */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-xl backdrop-blur-xl transition-all">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
            <div>
              <h2 className="text-lg font-bold text-white">Skill Gaps</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Key areas identified for improvement
              </p>
            </div>

            <span className="flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-white/5 px-2.5 text-xs font-semibold text-slate-300 ring-1 ring-white/10">
              {skillGaps.length}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {skillGaps.length > 0 ? (
              <div className="space-y-3.5">
                {skillGaps.map((item, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 transition-transform duration-300 group-hover:scale-110">
                        <AlertCircle size={20} />
                      </div>

                      <p className="text-sm font-semibold text-slate-100 sm:text-base">
                        {item.skill}
                      </p>
                    </div>

                    <span
                      className={`
                        shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase transition-colors
                        ${
                          item.severity === "high"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : item.severity === "medium"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                        }
                      `}
                    >
                      {item.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  No critical skill gaps found!
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Your resume covers all required competencies for this role.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            ANALYZE ANOTHER RESUME BUTTON
        ========================= */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/analyze"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/35 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          >
            <RotateCcw
              size={17}
              className="transition-transform duration-500 group-hover:-rotate-180"
            />
            <span>Analyze Another Resume</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}