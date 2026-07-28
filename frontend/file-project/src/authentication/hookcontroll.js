import { useContext, useState } from "react";
import { login, logout, signup } from "./api.control";
import { authContext } from "./authcontect";

export default function useAuth() {
  const {
    user,
    setUser,
    refreshUser,
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

  return {
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
  };
}