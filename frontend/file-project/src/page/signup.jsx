import React, { useState } from "react";
import { Eye, EyeOff, BrainCircuit, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import useauth from "../authentication/hookcontroll";
import LoadingPage from "./loading";
import Navbar from "../components/Nav";


const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);


  const navigate = useNavigate();

  const {loading, handleSignup} = useauth();



  const handleSubmit = async(e)=>{

    e.preventDefault();

    setError("");


    if(!name || !email || !password){

      setError("Please fill in all fields.");
      return;

    }


    const res = await handleSignup({
      name,
      email,
      password
    });



    const success =
      typeof res === "object"
      ?
      res.success
      :
      res;



    if(success){

      navigate("/login");

    }
    else{

      setError(
        typeof res === "object" && res.message
        ?
        res.message
        :
        "Signup failed. Please try again."
      );

    }

  };



  if(loading){

    return <LoadingPage/>

  }



return (

<>

<Navbar/>


<div
className="
min-h-screen
pt-20
flex
items-center
justify-center
relative
overflow-hidden
bg-[#020617]
px-4
"
>


{/* Background Glow */}

<div
className="
absolute
top-20
left-10
h-72
w-72
rounded-full
bg-violet-600/20
blur-3xl
"
/>


<div
className="
absolute
bottom-10
right-10
h-72
w-72
rounded-full
bg-cyan-500/20
blur-3xl
"
/>



{/* Auth Card */}

<div
className="
relative
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-2xl
p-6
sm:p-8
shadow-2xl
shadow-black/40
"
>



{/* Logo */}

<div
className="
flex
justify-center
mb-7
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-violet-500
to-cyan-400
flex
items-center
justify-center
shadow-lg
shadow-violet-500/30
"
>

<BrainCircuit
className="text-white"
size={28}
/>


</div>



<div>

<h1
className="
text-xl
font-bold
text-white
"
>
Resume
<span className="text-cyan-400">
AI
</span>
</h1>


<p
className="
text-xs
text-slate-400
"
>
Smart Career Engine
</p>


</div>


</div>


</div>




<div className="text-center mb-8">


<div
className="
inline-flex
items-center
gap-2
rounded-full
bg-violet-500/10
border
border-violet-400/20
px-3
py-1
text-xs
text-violet-300
mb-4
"
>

<Sparkles size={14}/>

AI Resume Analysis

</div>



<h2
className="
text-3xl
font-bold
text-white
"
>
Create account
</h2>


<p
className="
mt-2
text-sm
text-slate-400
"
>
Start improving your resume with AI
</p>


</div>




<form
onSubmit={handleSubmit}
className="
space-y-5
"
>



<div>

<label className="text-sm text-slate-300">
Name
</label>


<input

type="text"

value={name}

onChange={(e)=>{
setName(e.target.value);
if(error)setError("");
}}

placeholder="John Doe"

className="
mt-2
w-full
rounded-xl
bg-black/20
border
border-white/10
px-4
py-3
text-white
placeholder:text-slate-500
outline-none
focus:border-violet-500
focus:ring-2
focus:ring-violet-500/30
transition
"

/>

</div>




<div>

<label className="text-sm text-slate-300">
Email
</label>


<input

type="email"

value={email}

onChange={(e)=>{
setEmail(e.target.value);
if(error)setError("");
}}

placeholder="example@email.com"

className="
mt-2
w-full
rounded-xl
bg-black/20
border
border-white/10
px-4
py-3
text-white
placeholder:text-slate-500
outline-none
focus:border-violet-500
focus:ring-2
focus:ring-violet-500/30
transition
"

/>

</div>





<div>

<label className="text-sm text-slate-300">
Password
</label>


<div className="relative">


<input

type={showPassword ? "text":"password"}

value={password}

onChange={(e)=>{
setPassword(e.target.value);
if(error)setError("");
}}

placeholder="********"

className="
mt-2
w-full
rounded-xl
bg-black/20
border
border-white/10
px-4
py-3
text-white
placeholder:text-slate-500
outline-none
focus:border-violet-500
focus:ring-2
focus:ring-violet-500/30
transition
"

/>


<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-5
text-slate-400
hover:text-white
"

>

{
showPassword
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}

</button>


</div>


</div>





{
error && (

<div
className="
rounded-xl
border
border-red-500/20
bg-red-500/10
px-4
py-3
text-sm
text-red-400
"
>

{error}

</div>

)
}






<button

disabled={loading}

className="
w-full
rounded-xl
py-3
font-semibold
text-white
bg-gradient-to-r
from-violet-500
to-cyan-500
shadow-lg
shadow-violet-500/20
transition
hover:-translate-y-1
hover:shadow-violet-500/40
disabled:opacity-50
"

>

{
loading
?
"Creating account..."
:
"Create Account"
}

</button>




</form>




<p
className="
text-center
text-sm
text-slate-400
mt-7
"
>

Already have an account?

<Link
to="/login"
className="
ml-2
text-cyan-400
hover:text-cyan-300
font-medium
"
>
Login
</Link>


</p>



</div>



</div>


</>

)

};


export default Register;