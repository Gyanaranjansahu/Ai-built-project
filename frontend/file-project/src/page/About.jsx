import { Sparkles, Target, ShieldCheck, Brain } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const values = [
  {
    icon: Brain,
    title: "AI Powered Analysis",
    text: "Advanced AI models analyze resumes, skills, and job descriptions to find meaningful matches.",
  },
  {
    icon: Target,
    title: "Career Focused",
    text: "We help candidates understand their strengths and improve their chances of getting hired.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    text: "Your resume data stays secure with modern protection practices.",
  },
];

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#020617] via-[#111827] to-[#020617] text-white">

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute -top-20 left-10 h-96 w-96 bg-violet-600/30 blur-3xl rounded-full" />
          <div className="absolute right-10 top-20 h-80 w-80 bg-blue-600/20 blur-3xl rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

            <span className="text-violet-300 uppercase tracking-[0.2em] text-sm font-semibold">
              About ResumeAI
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold">
              Helping candidates build
              <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                better careers with AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-slate-300 text-lg leading-8">
              ResumeAI analyzes resumes against real job requirements and
              provides actionable insights to improve your career opportunities.
            </p>

          </div>
        </section>


        {/* Mission */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 gap-10">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <Sparkles className="text-violet-400 mb-5" size={35}/>

              <h2 className="text-3xl font-bold mb-4">
                Our Mission
              </h2>

              <p className="text-slate-300 leading-7">
                Our mission is to remove uncertainty from job applications.
                We combine artificial intelligence and career insights to help
                people present their best professional version.
              </p>

            </div>


            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-3xl font-bold mb-4">
                Why ResumeAI?
              </h2>

              <p className="text-slate-300 leading-7">
                Traditional resume reviews are slow and subjective.
                ResumeAI provides instant feedback based on skills,
                experience, and job requirements.
              </p>

            </div>

          </div>

        </section>


        {/* Values */}

        <section className="max-w-7xl mx-auto px-6 pb-28">

          <div className="grid md:grid-cols-3 gap-8">

            {values.map((item)=>{

              const Icon=item.icon;

              return(
                <div
                key={item.title}
                className="
                rounded-2xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
                hover:-translate-y-2
                transition
                "
                >

                <Icon className="text-cyan-400 mb-5" size={35}/>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300">
                  {item.text}
                </p>

                </div>
              )

            })}

          </div>

        </section>


      </main>

      <Footer/>

    </>
  );
}