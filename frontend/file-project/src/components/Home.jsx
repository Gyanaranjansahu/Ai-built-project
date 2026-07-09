import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  UserCircle2,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import ConfidenceRing from "../components/ConfidenceRing";
import Navbar from "./Nav";
import Footer from "./Footer";

const steps = [
  {
    icon: FileText,
    title: "Paste your resume",
    copy: "Drop in your resume as-is. No reformatting, no templates to fight.",
  },
  {
    icon: UserCircle2,
    title: "Describe yourself",
    copy: "A few honest lines about how you work and what you're looking for.",
  },
  {
    icon: Briefcase,
    title: "Paste the job post",
    copy: "The exact listing you're applying to — Primer reads between the lines.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-b from-[#0F0B2E] via-[#1A1440] to-[#0F0B2E]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Ambient premium backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-3xl" />
            <div className="absolute top-10 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Interview Prep, Made Specific
              </span>

              <h1 className="mt-7 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
                Walk in already <br />
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-blue-300 bg-clip-text text-transparent">
                  knowing the room.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Primer compares your resume with a real job description, shows
                exactly where you match, and creates a personalized 7-day
                interview preparation plan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/analyze"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 ring-1 ring-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/40 hover:-translate-y-0.5"
                >
                  Analyze My Fit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-200 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Create Free Account
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"></div>

              <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-violet-950/50 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-violet-900/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Best Match
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                      Senior Frontend Engineer
                    </h3>
                  </div>

                  <ConfidenceRing value={84} size={72} strokeWidth={7} />
                </div>

                <hr className="my-6 border-white/10" />

                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Skills Matched
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "System Design", "GraphQL"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 shadow-sm"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-white/10 bg-[#130E38]">
          <div className="mx-auto max-w-7xl px-6 py-28">
            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                How It Works
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                Three Inputs. One Honest Read.
              </h2>

              <p className="mt-4 text-slate-300">
                Everything you need to prepare for your next interview.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-900/30"
                >
                  <span className="text-sm font-bold tracking-wide text-violet-300">
                    0{i + 1}
                  </span>

                  <div className="mt-4 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 ring-1 ring-violet-400/20 transition-transform duration-300 group-hover:scale-105">
                    <step.icon className="h-7 w-7 text-violet-300" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>

                  <p className="leading-7 text-slate-300">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}