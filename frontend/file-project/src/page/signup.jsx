import React, { useState } from "react";
import "../style/signup.css";
import { motion } from "framer-motion";
import useauth from "../authentication/hookcontroll";
import LoadingPage from "./loading";
import { useNavigate } from "react-router-dom";
import AuthBlueBackground from "../components/AuthBlueBackground";
const Register = () => {
const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
let navigate=useNavigate()
let {loading,handleSignup}=useauth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wait for signup result because hook returns true for success and false for error.
        const success = await handleSignup({name,email,password})
        // Redirect to login only after account is created successfully.
        if (success) {
            navigate("/login")
        }
      
        
    };
if(loading){
   return <LoadingPage/>
}
    return (
        <div className="signup-container">
            {/* This component creates the animated blue auth background behind the signup card. */}
            <AuthBlueBackground />
            <div className="signup-card">
                <div className="signup-header">
                    <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}

                    >Create Account</motion.h1>
                    <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    >Start your journey with us</motion.p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit" className="signup-btn">
                        Create Account
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default Register;
