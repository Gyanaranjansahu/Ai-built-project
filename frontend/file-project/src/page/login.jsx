import { useState } from "react";
import "../style/login.css";
import { motion } from "framer-motion"
import useauth from "../authentication/hookcontroll";
import LoadingPage from "./loading";
import { Link, useNavigate } from "react-router-dom";
import AuthBlueBackground from "../components/AuthBlueBackground";
function Login() {
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
    let {handleLogin,loading}=useauth()
 let navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wait for login result because hook returns true for success and false for error.
        const success = await handleLogin({email,password})
        // Redirect only after successful login, otherwise toast error stays on login page.
        if (success) {
            setEmail("")
            setPassword("")
            navigate("/")
        }
    };
if(loading){
    return <LoadingPage/>
}
    return (
        <div className="login-container">
            {/* This component creates the animated blue auth background behind the login card. */}
            <AuthBlueBackground />
            <div className="login-card">
                <div className="login-header">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}>Welcome Back</motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                    >Please login to continue</motion.p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                        />
                    </div>

                    <div className="extra-options">
                        <label className="remember">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <a href="#">Forgot Password?</a>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ backgroundColor: "#1e3c72" }}
                        transition={{ duration: 0.3 }}

                        type="submit" className="login-btn">
                        Login
                    </motion.button>
                </form>

                <div className="signup-link">
                    <p>
                        Don't have an account? <Link to="/register">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
