import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OpenRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (token) {
      navigate("/code-shift", { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [token, navigate]);

  if (checkingAuth) return null;

  return children;
};

export default OpenRoute;
