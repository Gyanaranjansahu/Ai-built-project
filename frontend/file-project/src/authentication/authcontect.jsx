import { createContext, useEffect, useState } from "react";
import { userMe, getInterviewReportById } from "./api.control";

export const authContext = createContext();

export function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);


  const refreshUser = async () => {
    try {

      const data = await userMe();

      if(data){
        setUser(data);
      }else{
        setUser(null);
      }

    } catch (error) {
      console.log("Auth Check Error:", error.message);
      setUser(null);

    } finally {
      setAuthLoading(false);
    }
  };


  const getReport = async(id)=>{

    try {

      const data = await getInterviewReportById(id);

      setReport(data);

      return data;

    } catch(error){

      console.log(error);
      throw error;

    }
  }


  useEffect(()=>{

    refreshUser();

  },[]);


  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        refreshUser,

        report,
        setReport,

        reports,
        setReports,

        getReport
      }}
    >

      {children}

    </authContext.Provider>
  );
}