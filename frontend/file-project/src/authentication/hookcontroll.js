import { useContext, useState } from "react";
import { generateInterview, getAllinterviewReport, getInterviewReportById, login, logout, signup } from "./api.control";
import { authContext } from "./authcontect";


export default function useAuth() {
  const {
    user,
    setUser,
    refreshUser,
    report,setReport,
    reports,setReports,
    authLoading
  } = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const handleLogin = async (data) => {
    try {
      setLoading(true);

      await login(data);

      // Fetch logged-in user from backend
      await refreshUser();

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data) => {
    try {
      setLoading(true);

      await signup(data);

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      return true;
    } catch (error) {
      return false;
    }
  };


  // send file data

  const generate=async({jobDescription,selfDescription,resume})=>{
setLoading(true)
try {
  const response=await generateInterview({jobDescription,selfDescription,resume})
  setReport(response.interviewReport)
} catch (error) {
  console.log(error);
  
}
finally{
  setLoading(false)
}
  }



// get report by id


const getReportById=async(interviewId)=>{
  console.log(interviewId);
  
  try {
    const response=await getInterviewReportById(interviewId)
    setReport(response.InterviewReport)
  
    // console.log(report);
    return response
  } catch (error) {
    console.log(error);
    
  }
  finally{
    setLoading(false)
  }
}


// get all report 

const getReports=async()=>{
  setLoading(true)
  try {
    const response=await getAllinterviewReport()
    setReport(response.interviewReport)
  } catch (error) {
    console.log(error);
    
  }
  finally{
    setLoading(false)
  }
}

  return {
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
    generate,
    getReportById
  };
}