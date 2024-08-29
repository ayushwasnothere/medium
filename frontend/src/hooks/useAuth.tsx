import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Info {
  email: string;
  id: string;
  name: string;
}

interface User {
  token?: string;
  info?: Info | null;
}

interface AuthContextType {
  token: string | null;
  info: Info | null;
  logged: () => Promise<boolean>;
  login: (data: string) => Promise<void>;
  logout: () => Promise<void>;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me/info`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (res.data.info) {
          const info: Info = res.data.info;
          setUser({ ...user, info });
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

  const login = async (data: string) => {
    setUser({ ...user, token: data });
    navigate("/blogs");
  };

  const logout = async () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value: AuthContextType = useMemo(() => {
    return {
      token: user?.token || null,
      info: user?.info || null,
      userId: user?.info?.id || null,
      logged,
      login,
      logout,
    };
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
