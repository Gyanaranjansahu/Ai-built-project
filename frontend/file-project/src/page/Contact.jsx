import { Mail, MapPin, Send } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";


export default function Contact(){

return(
<>

<Navbar/>

<main className="
min-h-screen
bg-gradient-to-b from-[#020617] via-[#111827] to-[#020617]
text-white
">


<section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-12">


<div>

<p className="text-violet-300 uppercase tracking-widest">
Contact
</p>

<h1 className="text-5xl font-bold mt-5">
Let's build your
<span className="block text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
career advantage
</span>
</h1>


<p className="mt-6 text-slate-300 leading-8">
Have questions about ResumeAI?
Our team is here to help.
</p>



<div className="mt-10 space-y-5">


<div className="flex gap-4 items-center">
<Mail className="text-cyan-400"/>
<span>support@resumeai.com</span>
</div>


<div className="flex gap-4 items-center">
<MapPin className="text-cyan-400"/>
<span>Remote First Team</span>
</div>


</div>


</div>



<div className="
bg-white/5
border border-white/10
rounded-3xl
p-8
backdrop-blur-xl
">


<form className="space-y-5">


<input
placeholder="Your Name"
className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none"
/>


<input
placeholder="Email Address"
className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none"
/>


<textarea
rows="5"
placeholder="Message"
className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none"
/>


<button
className="
w-full
flex
justify-center
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-violet-500
to-blue-500
py-4
font-semibold
hover:scale-[1.02]
transition
"
>

Send Message
<Send size={18}/>

</button>


</form>


</div>


</section>


</main>

<Footer/>

</>
)

}