import {
  FileText,
  UserCircle2,
  Briefcase,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import Navbar from "./Nav";
import Footer from "./Footer";

export default function Analyze() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#080612] px-5 py-16 sm:px-8">
        {/* Background Effects */}
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


          {/* Cards */}
          <div className="mt-14 space-y-6">


            {/* Resume Card */}
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


              <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] transition hover:bg-white/[0.06]">

                <UploadCloud className="mb-3 text-purple-400" size={35}/>

                <p className="text-sm text-slate-300">
                  Drag & drop your resume here
                </p>

                <span className="mt-2 text-xs text-slate-500">
                  or browse files
                </span>

              </div>

            </div>



            {/* About */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-5 flex items-center gap-4">

                <div className="rounded-2xl bg-blue-500/20 p-3">
                  <UserCircle2 className="text-blue-400"/>
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
                rows="5"
                placeholder="Tell us about your background, skills and experience..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-white placeholder:text-slate-600 outline-none transition focus:border-purple-400/50"
              />

            </div>




            {/* Job Description */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-5 flex items-center gap-4">

                <div className="rounded-2xl bg-green-500/20 p-3">
                  <Briefcase className="text-green-400"/>
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
                rows="7"
                placeholder="Paste job description here..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-white placeholder:text-slate-600 outline-none transition focus:border-purple-400/50"
              />

            </div>


            {/* Button */}
            <button
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 py-4 font-semibold text-white shadow-xl shadow-purple-900/30 transition hover:scale-[1.02]"
            >
              Start AI Analysis
            </button>


          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}