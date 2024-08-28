import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLogged(res.data.auth);
      })
      .catch((err) => {
        setIsLogged(err.response.data.auth);
      });
  }, []);
  if (!isLogged) {
    navigate("/signin");
  } else {
    return children;
  }
};
