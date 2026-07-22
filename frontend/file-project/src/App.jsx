
import { Route, Routes } from "react-router-dom";

import P from "./protective/p";
import Protect from "./protective/p";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { Suspense } from "react";
import { lazy } from "react";
import LoadingPage from "./page/loading.jsx";
const Analyze = lazy(() => import("./components/Analyze.jsx"))
const Login = lazy(() => import("./page/login.jsx"))
const Home = lazy(() => import("./components/Home.jsx"))
const Register = lazy(() => import("./page/signup.jsx"))
const NotFound = lazy(() => import("./page/notFound.jsx"))
const Dashboard = lazy(() => import("./components/Dashboard.jsx"))
const About = lazy(() => import("./page/About.jsx"))
const Services = lazy(() => import("./page/Service.jsx"))
const Contact = lazy(() => import("./page/Contact.jsx"))
export default function App() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/analyze" element={<Protect><Analyze /></Protect>} />

          <Route path="/dashboard" element={<Protect><Dashboard /></Protect>} />


          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route path="/contact" element={<Contact/>} />


          <Route path="*" element={<NotFound />} />
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
