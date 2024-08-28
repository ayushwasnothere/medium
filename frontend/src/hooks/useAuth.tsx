import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me/info`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.data.info) {
          setUser({ ...user, info: res.data.info });
        }
      } catch {
        return;
      }
    };
    handle();
  }, [user?.token]);

  const navigate = useNavigate();

  const logged = async () => {
    if (!user) {
      return false;
    }
    if (!user.token) {
      return false;
    }
    try {
      console.log("sent");
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return res.data.auth;
    } catch {
      return false;
    }
  };

  const userId = () => {
    const decoded: { id: string } = jwtDecode(String(user.token));
    return decoded.id;
  };

  const login = async (data) => {
    setUser({ ...user, token: data });
    navigate("/blogs");
  };

  const logout = async () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(() => {
    return {
      token: user ? user.token : "",
      info: user ? user.info : {},
      logged,
      login,
      logout,
      userId,
    };
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
