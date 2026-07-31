import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../authentication/authcontect";
import LoadingPage from "../page/loading";

const Protect = ({ children }) => {
  const { user, authLoading } = useContext(authContext);

  if (authLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default Protect