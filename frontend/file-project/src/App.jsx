
import { Route, Routes } from "react-router-dom";

import P from "./protective/p";
import Protect from "./protective/p";
// import Home from "./components/Home";
// import InterviewReport from "./page/notFound";
// import Login from "./page/login";
// import Register from "./page/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import InterviewReportCard from "../page/notFound.js";
// import NotFound from "../page/notFound.js";
// import Analyze from "./components/Analyze.jsx";
import React, { Suspense } from "react";
import { lazy } from "react";
import LoadingPage from "./page/loading.jsx";
// import Dashboard from "./components/Dashboard.jsx";
const  Analyze = lazy(()=>import("./components/Analyze.jsx")) 
const Login = lazy(()=>import ("./page/login.jsx"))
const Home =lazy(()=>import ("./components/Home.jsx"))
const  Register=lazy(()=>import ("./page/signup.jsx"))
const NotFound=lazy(()=>import ("./page/notFound.jsx"))
const Dashboard=lazy(()=>import ("./components/Dashboard.jsx"))
export default function App() {
  return (
    <>
   <Suspense fallback={<LoadingPage/>}>
   
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/login" element= {<Login/>}  />
        <Route path="/signup" element= {<Register/>}/>
        <Route path="/analyze" element={<Protect><Analyze/></Protect>} />

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      {/* This container is required once so react-toastify can show messages anywhere in the app. */}
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
   </Suspense>
    </>
  )
};
