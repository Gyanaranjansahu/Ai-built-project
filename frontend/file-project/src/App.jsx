
import { Route, Routes } from "react-router-dom";

import P from "./protective/p";
import Protect from "./protective/p";
import Home from "./page/Home";
import InterviewReport from "./page/interviewREport";
import Login from "./page/login";
import Register from "./page/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InterviewReportCard from "./page/interviewREport";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Protect><Home/></Protect>} />
        <Route path="/login" element=  {<Login/>}  />
        <Route path="/register" element= {<Register/>}/>
        <Route path="/interviewReport" element={<InterviewReport />} />
        <Route path="/interviewREport" element={<InterviewReport />} />
        <Route path="/interviewreport" element={<InterviewReport />} />
        <Route path="/interviewCard" element={<InterviewReportCard/>} />
        <Route path="*" element={<InterviewReport />} />
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
    </>
  )
};
