import {
  FileText,
  UserCircle2,
  Briefcase,
  Sparkles,
  UploadCloud,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import Navbar from "./Nav";
import Footer from "./Footer";
import { useContext, useState } from "react";
import useAuth from "../authentication/hookcontroll";
import { useNavigate } from "react-router-dom";
import { authContext } from "../authentication/authcontect";

export default function Analyze() {
  const [data, setData] = useState({
    resume: null,
    jobDescription: "",
    selfDescription: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const { resume, jobDescription, selfDescription } = data;

  const { generate, loading, getReportById } = useAuth();
  // fetch from global context
  const { user, getInterviewReportById } = useContext(authContext)
console.log(user.data._id);

  const handleForm = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setMessage("Please enter the job description.");
      return;
    }

    if (!selfDescription.trim()) {
      setMessage("Please enter your description.");
      return;
    }

    try {
      console.log("Sending data...");

let data=await generate({
  resume,
  jobDescription,
  selfDescription,
});
console.log(data);

console.log(user);

navigate(`/dashboard/matchscore/${user.data._id}`);
    } catch (error) {
      console.log(
        "Analysis error:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const inputhandle = (e) => {
    const { name, value, files } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setMessage("");
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#080612] px-5 py-16 sm:px-8">

        {/* Background */}
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <section className="relative z-10 mx-auto max-w-4xl">

          {/* Header */}
          <div className="text-center">

            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
              <Sparkles size={16} />
              AI Resume Intelligence
            </div>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Discover your career

              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                compatibility score
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 sm:text-lg">
              Upload your resume and provide your career details.
              Get an intelligent analysis of your professional fit.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleForm}
            className="mt-14 space-y-6"
          >

            {/* Error Message */}
            {message && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                <AlertCircle size={20} />
                <span>{message}</span>
              </div>
            )}

            {/* Resume */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl transition hover:border-purple-400/40">

              <div className="mb-5 flex items-center gap-4">

                <div className="rounded-2xl bg-purple-500/20 p-3">
                  <FileText className="text-purple-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Upload Resume
                  </h2>

                  <p className="text-sm text-slate-400">
                    PDF, DOC, DOCX supported
                  </p>
                </div>

              </div>

              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] transition hover:bg-white/[0.06]">

                <UploadCloud
                  className="mb-3 text-purple-400"
                  size={35}
                />

                <p className="text-sm text-slate-300">
                  {resume
                    ? resume.name
                    : "Drag & drop your resume here"}
                </p>

                <span className="mt-2 text-xs text-slate-500">
                  or browse files
                </span>

                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={inputhandle}
                  className="hidden"
                />

              </label>

            </div>

            {/* About */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-5 flex items-center gap-4">

                <div className="rounded-2xl bg-blue-500/20 p-3">
                  <UserCircle2 className="text-blue-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    About You
                  </h2>

                  <p className="text-sm text-slate-400">
                    Share your experience and skills
                  </p>
                </div>

              </div>

              <textarea
                name="selfDescription"
                value={selfDescription}
                onChange={inputhandle}
                rows={5}
                placeholder="Tell us about your background, skills and experience..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-white placeholder:text-slate-600 outline-none transition focus:border-purple-400/50"
              />

            </div>

            {/* Job Description */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-5 flex items-center gap-4">

                <div className="rounded-2xl bg-green-500/20 p-3">
                  <Briefcase className="text-green-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Target Role
                  </h2>

                  <p className="text-sm text-slate-400">
                    Paste the job requirements
                  </p>
                </div>

              </div>

              <textarea
                name="jobDescription"
                value={jobDescription}
                onChange={inputhandle}
                rows={7}
                placeholder="Paste job description here..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-white placeholder:text-slate-600 outline-none transition focus:border-purple-400/50"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 py-4 font-semibold text-white shadow-xl shadow-purple-900/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />
                  Analyzing Resume...
                </>
              ) : (
                "Start AI Analysis"
              )}
            </button>

          </form>
        </section>
      </main>

      <Footer />

      {/* FULL PAGE LOADING */}
      {loading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#080612]/90 backdrop-blur-md">

          <div className="flex flex-col items-center text-center">

            <div className="mb-6 rounded-full bg-purple-500/10 p-5">
              <LoaderCircle
                size={50}
                className="animate-spin text-purple-400"
              />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Analyzing Your Resume
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              AI is analyzing your resume, skills and job
              requirements. Please wait...
            </p>

          </div>

        </div>
      )}
    </>
  );
}