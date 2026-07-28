import { Suspense, lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Protect from "./protective/p";
import LoadingPage from "./page/loading.jsx";
import { authContext } from "./authentication/authcontect.jsx";

const Home = lazy(() => import("./components/Home.jsx"));
const Login = lazy(() => import("./page/login.jsx"));
const Register = lazy(() => import("./page/signup.jsx"));
const Analyze = lazy(() => import("./components/Analyze.jsx"));
const Dashboard = lazy(() => import("./components/Dashboard.jsx"));
const About = lazy(() => import("./page/About.jsx"));
const Services = lazy(() => import("./page/Service.jsx"));
const Contact = lazy(() => import("./page/Contact.jsx"));
const NotFound = lazy(() => import("./page/notFound.jsx"));

export default function App() {
  const { authLoading } = useContext(authContext);

  // Wait until auth check completes
  if (authLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/analyze"
            element={
              <Protect>
                <Analyze />
              </Protect>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Protect>
                <Dashboard />
              </Protect>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

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
  );
}