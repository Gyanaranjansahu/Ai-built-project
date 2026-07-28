import { createContext, useEffect, useState } from "react";
import { userMe } from "./api.control";

export const authContext = createContext();

export function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await userMe();
      console.log(data);
      
      setUser(data);
      console.log(user);
      
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

console.log(user);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        refreshUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}