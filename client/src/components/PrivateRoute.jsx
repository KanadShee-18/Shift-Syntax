import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/sign-in", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
};

export default PrivateRoute;
