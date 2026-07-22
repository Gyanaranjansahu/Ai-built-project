import {
  FileSearch,
  BarChart3,
  Lightbulb,
  Target,
  Sparkles,
  Briefcase
} from "lucide-react";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";


const features=[
{
icon:FileSearch,
title:"AI Resume Analysis",
text:"Get detailed analysis of your resume structure, skills and experience."
},
{
icon:BarChart3,
title:"ATS Score",
text:"Understand how well your resume performs against applicant tracking systems."
},
{
icon:Target,
title:"Job Match Score",
text:"Compare your resume with job descriptions and discover compatibility."
},
{
icon:Lightbulb,
title:"Smart Suggestions",
text:"Receive AI generated recommendations to improve your resume."
},
{
icon:Briefcase,
title:"Career Insights",
text:"Discover missing skills and opportunities for improvement."
},
{
icon:Sparkles,
title:"Interview Preparation",
text:"Prepare better with personalized interview guidance."
}

]


export default function Services(){

return(
<>
<Navbar/>

<main className="bg-gradient-to-b from-[#020617] via-[#111827] to-[#020617] text-white min-h-screen">


<section className="max-w-7xl mx-auto px-6 py-28 text-center">

<p className="text-violet-300 uppercase tracking-widest">
Features
</p>

<h1 className="text-5xl md:text-6xl font-bold mt-5">
Powerful AI tools for
<span className="block text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
 smarter applications
</span>
</h1>

</section>



<section className="max-w-7xl mx-auto px-6 pb-28 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{
features.map((item)=>{

const Icon=item.icon;

return(

<div
key={item.title}
className="
border border-white/10
bg-white/5
rounded-3xl
p-8
backdrop-blur-xl
hover:-translate-y-2
transition
"
>

<Icon size={38} className="text-cyan-400 mb-6"/>

<h2 className="text-xl font-bold mb-3">
{item.title}
</h2>

<p className="text-slate-300 leading-7">
{item.text}
</p>

</div>

)

})
}

</section>


</main>

<Footer/>

</>
)

}