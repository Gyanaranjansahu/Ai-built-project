import { createContext, useEffect, useState } from "react";
import { userMe, getInterviewReportById } from "./api.control";

export const authContext = createContext();

export function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  // =========================
  // GET CURRENT USER
  // =========================
  const refreshUser = async () => {
    try {
      const data = await userMe();

      setUser(data);

      console.log("User:", data);
    } catch (error) {
      console.log("User error:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // =========================
  // GET INTERVIEW REPORT
  // =========================
  // IMPORTANT:
  // This function does NOT run automatically.
  // It only runs when you call getReport(id).
  const getReport = async (id) => {
    try {
      const data = await getInterviewReportById(id);
     
      // console.log(data);
setReport(data)
      return data;
    } catch (error) {
      console.log(
        "Report error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };
  console.log(report);
  

  // =========================
  // AUTH CHECK ONLY
  // =========================
  useEffect(() => {
    refreshUser();
    console.log(user);
  }, []);


//   useEffect(()=>{
//  getReport()
//   },[])


  return (
    <authContext.Provider
      value={{
        user,
        setUser,

        authLoading,
        refreshUser,

        // Single report
        report,
        setReport,
        getReport,

        // Multiple reports
        reports,
        setReports,
      }}
    >
      {children}
    </authContext.Provider>
  );
}