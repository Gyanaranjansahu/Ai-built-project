import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { authContext } from "../authentication/authcontect.jsx";
import { useParams } from "react-router-dom";
import useAuth from "../authentication/hookcontroll.js";

export default function PreparationPlan() {
 const{ getReportById}=useAuth()
  const { report ,getReport } = useContext(authContext);
const{id}=useParams()





  useEffect(() => {
    async function fetchReport() {
      if (!id) return;

      await getReportById(id);
      getReport(id);
    }

    fetchReport();
  }, [id]);
  // Extract real backend data from report context with fallback
  const rawPreparationPlan =
    report?.InterviewReport?.preparationPlan ||
    report?.preparationPlan || [];

  const skillGaps =
    report?.InterviewReport?.skillGaps ||
    report?.skillGaps || [];

  // Track checked tasks using mongo `_id` or `day-index`
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (dayId, taskIdx) => {
    const key = `${dayId}-${taskIdx}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Progress Calculation
  const totalTasks = rawPreparationPlan.reduce(
    (acc, day) => acc + (day.tasks?.length || 0),
    0
  );
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks
    ? Math.round((completedCount / totalTasks) * 100)
    : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] px-4 py-12 text-slate-100 sm:px-6 lg:px-10">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* =========================
            HEADER & PROGRESS BAR
        ========================= */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 backdrop-blur-md">
              <Sparkles size={13} className="animate-pulse" />
              <span>Personalized Study Plan</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              7-Day Preparation Plan
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Custom roadmap derived from your technical assessment.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl md:w-64">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Trophy size={14} className="text-amber-400" /> Plan Progress
              </span>
              <span className="text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* =========================
            SKILL GAPS SECTION
        ========================= */}
        {skillGaps.length > 0 && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-rose-500/20 bg-rose-950/20 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
                <Target size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Focus Areas</h2>
                <p className="text-xs text-slate-400">
                  Targeted concepts to address during this 7-day sprint
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {skillGaps.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/50 p-4 transition-all hover:border-rose-500/30"
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight size={16} className="text-rose-400" />
                    <span className="text-sm font-semibold text-slate-200">
                      {item.skill}
                    </span>
                  </div>

                  {item.severity && (
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                        item.severity === "high"
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : item.severity === "medium"
                          ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                          : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {item.severity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================
            TIMELINE ROADMAP
        ========================= */}
        <div className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/50 before:via-violet-500/30 before:to-transparent sm:before:left-8">
          {rawPreparationPlan.map((dayItem) => {
            const dayId = dayItem._id || dayItem.day;

            return (
              <div
                key={dayId}
                className="group relative pl-12 sm:pl-16"
              >
                {/* Timeline Day Node */}
                <div className="absolute left-1.5 top-5 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-xs font-bold text-cyan-400 shadow-lg shadow-cyan-500/20 ring-4 ring-[#07080c] transition-transform duration-300 group-hover:scale-110 sm:left-4 sm:h-10 sm:w-10">
                  D{dayItem.day}
                </div>

                {/* Day Card */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-cyan-500/5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-900/40 to-transparent p-5 sm:p-6">
                    <div>
                      <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                        Day {dayItem.day} Focus
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                        {dayItem.focus}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                      <BookOpen size={20} />
                    </div>
                  </div>

                  {/* Tasks Checklist */}
                  <div className="p-5 sm:p-6">
                    <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Tasks to Complete
                    </h3>

                    <div className="space-y-3">
                      {dayItem.tasks?.map((taskText, taskIdx) => {
                        const isDone = completedTasks[`${dayId}-${taskIdx}`];

                        return (
                          <button
                            key={taskIdx}
                            onClick={() => toggleTask(dayId, taskIdx)}
                            className={`group/task flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 ${
                              isDone
                                ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                                : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                            }`}
                          >
                            <div className="mt-0.5 shrink-0 transition-transform duration-200 group-hover/task:scale-110">
                              {isDone ? (
                                <CheckCircle2
                                  size={20}
                                  className="text-emerald-400"
                                />
                              ) : (
                                <Circle
                                  size={20}
                                  className="text-slate-500 group-hover/task:text-cyan-400"
                                />
                              )}
                            </div>

                            <span
                              className={`text-sm font-medium transition-all duration-200 sm:text-base ${
                                isDone
                                  ? "text-slate-500 line-through"
                                  : "text-slate-200 group-hover/task:text-white"
                              }`}
                            >
                              {taskText}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}