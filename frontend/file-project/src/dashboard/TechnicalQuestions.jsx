import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Brain,
  Sparkles,
  Target,
} from "lucide-react";
import { authContext } from "../authentication/authcontect";
import useAuth from "../authentication/hookcontroll";
import { useParams } from "react-router-dom";

export default function TechnicalQuestions() {
  const [open, setOpen] = useState(null);
  const { report ,getReport} = useContext(authContext);
const{getReportById}=useAuth()
const {id}=useParams()

 useEffect(() => {
    async function fetchReport() {
      if (!id) return;

      await getReportById(id);
      getReport(id);
    }

    fetchReport();
  }, [id]);
  // Extract technical questions directly from InterviewReport or root report
  const questions =
    report?.InterviewReport?.technicalQuestions ||
    report?.technicalQuestions ||
    [];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Code2 className="text-cyan-400" size={30} />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Technical Interview Questions
            </h1>
            <p className="text-slate-400 mt-1 text-sm md:text-base">
              {report?.InterviewReport?.title
                ? `Custom Questions for ${report.InterviewReport.title}`
                : "AI Generated Questions & Model Answers"}
            </p>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-slate-500 p-8 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
            No technical questions available in this report.
          </div>
        ) : (
          questions.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden transition-colors duration-200 hover:border-slate-700"
            >
              {/* Question Trigger */}
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-800/40 transition text-left gap-4"
              >
                <div className="text-left space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                      Question {index + 1}
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold text-slate-100">
                    {item.question}
                  </h2>
                </div>

                <div className="shrink-0 p-1">
                  {open === index ? (
                    <ChevronUp className="text-cyan-400" />
                  ) : (
                    <ChevronDown className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Answer Content */}
              {open === index && (
                <div className="border-t border-slate-800/80 p-6 animate-in fade-in duration-300 space-y-6 bg-slate-950/30">
                  {/* Model Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Brain size={20} className="text-violet-400" />
                      <h3 className="font-semibold text-violet-300 text-sm md:text-base">
                        AI Recommended Answer
                      </h3>
                    </div>

                    <p className="leading-7 md:leading-8 text-slate-300 text-sm md:text-base bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
                      {item.answer}
                    </p>
                  </div>

                  {/* Interviewer Intention */}
                  {item.intention && (
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-cyan-400" />
                        <span className="font-semibold text-cyan-400 text-sm">
                          Interviewer Intention
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.intention}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}