import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Brain,
  Sparkles,
  MessageCircle,
  Target,
} from "lucide-react";
import { authContext } from "../authentication/authcontect";
import { useParams } from "react-router-dom";
import useAuth from "../authentication/hookcontroll";

export default function BehavioralQuestions() {
  const [open, setOpen] = useState(null);
  const { report , getReport } = useContext(authContext);
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





  // Read behavioral questions directly from InterviewReport object or root report
  const questions =
    report?.InterviewReport?.behavioralQuestions ||
    report?.behavioralQuestions ||
    [];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
            <HeartHandshake className="text-pink-400" size={30} />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Behavioral Interview Questions
            </h1>

            <p className="text-slate-400 mt-2 text-sm md:text-base">
              {report?.InterviewReport?.title
                ? `Behavioral & HR Round Questions for ${report.InterviewReport.title}`
                : "AI Generated HR Questions with Recommended Answers"}
            </p>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-slate-500 p-8 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
            No behavioral questions available in this report.
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
                className="w-full flex justify-between items-center p-6 hover:bg-slate-800/40 transition text-left gap-4"
              >
                <div className="text-left space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold border border-pink-500/20">
                      HR Round #{index + 1}
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold text-slate-100">
                    {item.question}
                  </h2>
                </div>

                <div className="shrink-0 p-1">
                  {open === index ? (
                    <ChevronUp className="text-pink-400" />
                  ) : (
                    <ChevronDown className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              {open === index && (
                <div className="border-t border-slate-800 p-6 animate-in fade-in duration-300 space-y-6 bg-slate-950/30">
                  {/* Model Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle size={20} className="text-pink-400" />
                      <h3 className="font-semibold text-pink-300 text-sm md:text-base">
                        AI Recommended Answer
                      </h3>
                    </div>

                    <p className="text-slate-300 leading-7 md:leading-8 text-sm md:text-base bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
                      {item.answer}
                    </p>
                  </div>

                  {/* Interviewer Intention (Dynamic if backend provides, else standard hint) */}
                  {item.intention ? (
                    <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-pink-400" />
                        <span className="font-semibold text-pink-400 text-sm">
                          Interviewer Intention
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.intention}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={18} className="text-pink-400" />
                        <span className="font-semibold text-pink-400 text-sm">
                          Interview Tip
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Keep your answer concise (1–2 minutes), speak confidently,
                        and ground your response in specific experiences from your projects or internships.
                      </p>
                    </div>
                  )}

                  {/* Pro Tip - STAR Method */}
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={18} className="text-cyan-400" />
                      <span className="font-semibold text-cyan-400 text-sm">
                        Pro Strategy
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      Use the <strong className="text-cyan-300">STAR Method</strong> (Situation, Task,
                      Action, Result) when answering. It structures your real-life experiences clearly and impactfully.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}