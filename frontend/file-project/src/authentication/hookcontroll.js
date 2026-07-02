import { useContext } from "react";
import { Login, Logout, signup } from "./api.control.js";
import { authContext } from "./authcontect.jsx";
import { toast } from "react-toastify";
// import { useEffect } from "react";
import { userMe } from "./api.control";

// This helper picks the backend error message first, otherwise it shows fallback text.
const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.text || error?.message || fallback;
};

export default function useauth() {
  const { user, setUser, loading, setLoading } = useContext(authContext);

  // signup purpose
  const handleSignup = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const data = await signup({ name, email, password });
      // If signup is successful, show backend success message using toast.
      toast.success(data?.text || "Signup successful");
      // Return true so signup page knows it can redirect to login page.
      return true;
      //  setUser(data.user)
      //   console.log(user);
    } catch (error) {
      console.log(error.message);
      // If signup fails, show backend error message like "user exist".
      toast.error(getErrorMessage(error, "Signup failed"));
      // Return false so signup page stays on the same page.
      return false;
    } finally {
      setLoading(false);
    }
  };

  // login purpose

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await Login({ email, password });
      // Save logged-in user in context so protected pages can use it.
      setUser(data.user);
      // Show login success message from backend.
      toast.success(data?.text || "Login successful");
      // Return true so login page can redirect to home.
      return true;
    } catch (error) {
      console.log(error.message);
      // Show login error message like "invalid password" or "user not exist".
      toast.error(getErrorMessage(error, "Login failed"));
      // Return false so login page does not redirect.
      return false;
    } finally {
      setLoading(false);
    }
  };

  // logout

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await Logout();

      // Remove user from context after logout.
      setUser(null);
      // Show logout success message.
      toast.success(data?.text || "Logout successful");
      // Return true if logout is done.
      return true;
    } catch (error) {
      console.log(error.message);
      // Show logout error if server request fails.
      toast.error(getErrorMessage(error, "Logout failed"));
      // Return false if logout fails.
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect(() => {
  //   const Data = async () => {
  //     let userdata = await userMe();
  //     console.log(userdata);
  //     setLoading(false);
  //   };
  //   Data();
  // }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleLogout,
    handleSignup,
  };
}
