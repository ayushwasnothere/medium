import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.info) {
          setInfo(res.data.info);
        }
      } catch {
        return;
      }
    };
    handle();
  }, []);

  const navigate = useNavigate();

  const logged = async () => {
    if (!token) {
      return false;
    }
    try {
      console.log("sent");
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.auth;
    } catch {
      return false;
    }
  };

  const userId = () => {
    const decoded: { id: string } = jwtDecode(String(token));
    return decoded.id;
  };

  const login = async (data) => {
    setToken(data);
    navigate("/blogs");
  };

  const logout = async () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(() => {
    return {
      token,
      logged,
      login,
      logout,
      userId,
      info,
    };
  }, [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
