import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  UserCircle2,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

import ConfidenceRing from "../components/ConfidenceRing";
import Navbar from "./Nav";
import Footer from "./Footer";


const steps = [
  {
    icon: FileText,
    title: "Upload your resume",
    copy: "Drop your resume and let AI understand your skills, experience, and achievements.",
  },
  {
    icon: UserCircle2,
    title: "Add your profile",
    copy: "Tell us about your goals, experience, and the role you want.",
  },
  {
    icon: Briefcase,
    title: "Match with jobs",
    copy: "Compare your resume with job descriptions and discover your chances.",
  },
];



export default function Home() {


return (

<>

<Navbar/>


<main
className="
overflow-hidden
bg-[#020617]
"
>


{/* HERO */}

<section
className="
relative
"
>


<div
className="
absolute
inset-0
"
>

<div
className="
absolute
top-0
left-0
h-[30rem]
w-[30rem]
rounded-full
bg-violet-600/30
blur-3xl
"
/>


<div
className="
absolute
right-0
top-20
h-[30rem]
w-[30rem]
rounded-full
bg-cyan-500/20
blur-3xl
"
/>


</div>




<div
className="
relative
mx-auto
max-w-7xl
px-6
py-28
grid
lg:grid-cols-2
gap-16
items-center
"
>


{/* LEFT */}


<div>


<div
className="
inline-flex
items-center
gap-2
rounded-full
border
border-violet-400/20
bg-violet-500/10
px-4
py-2
text-sm
text-violet-300
"
>

<Sparkles size={16}/>

AI Powered Resume Intelligence

</div>




<h1
className="
mt-8
text-5xl
md:text-7xl
font-extrabold
leading-[1.05]
text-white
"
>

Build a resume

<span
className="
block
bg-gradient-to-r
from-violet-400
via-fuchsia-300
to-cyan-300
bg-clip-text
text-transparent
"
>

that gets noticed.

</span>


</h1>




<p
className="
mt-6
max-w-xl
text-lg
leading-8
text-slate-300
"
>

ResumeAI analyzes your resume against real job
descriptions, identifies missing skills, and gives
you actionable improvements to increase your
career opportunities.

</p>




<div
className="
mt-10
flex
flex-wrap
gap-4
"
>


<Link

to="/analyze"

className="
group
flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-violet-500
to-cyan-500
px-7
py-3.5
font-semibold
text-white
shadow-lg
shadow-violet-500/30
transition
hover:-translate-y-1
"

>

Analyze Resume

<ArrowRight
size={18}
className="
transition
group-hover:translate-x-1
"
/>

</Link>




<Link

to="/signup"

className="
rounded-xl
border
border-white/10
bg-white/5
px-7
py-3.5
font-semibold
text-white
backdrop-blur-xl
transition
hover:bg-white/10
hover:-translate-y-1
"

>

Get Started

</Link>


</div>





<div
className="
mt-12
flex
flex-wrap
gap-6
"
>


<div className="flex items-center gap-2 text-slate-300">

<ShieldCheck
className="text-emerald-400"
/>

Secure

</div>


<div className="flex items-center gap-2 text-slate-300">

<Zap
className="text-yellow-400"
/>

Instant AI Analysis

</div>


</div>



</div>








{/* RIGHT CARD */}


<div
className="
relative
flex
justify-center
"
>


<div
className="
absolute
h-80
w-80
rounded-full
bg-cyan-500/20
blur-3xl
"
/>



<div
className="
relative
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/5
p-8
backdrop-blur-2xl
shadow-2xl
shadow-black/50
transition
hover:-translate-y-2
"
>


<div
className="
flex
justify-between
items-center
"
>


<div>

<p
className="
text-xs
uppercase
tracking-widest
text-slate-400
"
>
AI Match Score
</p>


<h2
className="
mt-2
text-2xl
font-bold
text-white
"
>
Frontend Engineer
</h2>


</div>



<ConfidenceRing
value={92}
size={85}
strokeWidth={8}
/>


</div>




<div
className="
my-7
border-t
border-white/10
"
/>



<p
className="
text-sm
text-slate-400
mb-4
"
>
Skills detected
</p>



<div
className="
flex
flex-wrap
gap-2
"
>

{
[
"React",
"Node.js",
"TypeScript",
"AI Tools"
].map(skill=>(

<span
key={skill}
className="
flex
items-center
gap-1
rounded-full
border
border-emerald-400/20
bg-emerald-500/10
px-3
py-1
text-xs
text-emerald-300
"
>

<CheckCircle2 size={13}/>

{skill}

</span>

))
}


</div>


</div>



</div>



</div>


</section>






{/* STEPS */}


<section
className="
border-t
border-white/10
bg-[#050b1f]
"
>


<div
className="
max-w-7xl
mx-auto
px-6
py-24
"
>


<div
className="
text-center
mb-16
"
>

<p
className="
text-sm
uppercase
tracking-[0.25em]
text-cyan-400
"
>
How it works
</p>


<h2
className="
mt-4
text-4xl
font-bold
text-white
"
>

Three steps to a better career

</h2>


</div>




<div
className="
grid
md:grid-cols-3
gap-8
"
>


{
steps.map((step,index)=>(

<div

key={step.title}

className="
rounded-3xl
border
border-white/10
bg-white/5
p-8
backdrop-blur-xl
transition
hover:-translate-y-2
hover:border-violet-400/40
"

>


<span
className="
text-violet-300
font-bold
"
>
0{index+1}
</span>



<div
className="
mt-5
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-violet-500/30
to-cyan-500/30
flex
items-center
justify-center
"
>

<step.icon
className="text-white"
/>

</div>




<h3
className="
mt-6
text-xl
font-bold
text-white
"
>

{step.title}

</h3>



<p
className="
mt-3
text-slate-400
leading-7
"
>

{step.copy}

</p>



</div>


))
}


</div>


</div>


</section>


</main>



<Footer/>


</>

)

}