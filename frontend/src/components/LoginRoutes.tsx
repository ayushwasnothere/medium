import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, logged } = useAuth();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const res = await logged();
      setAuth(res);
    };
    handleAuth();
  }, [token]);

  if (auth === null) {
    return <div>loading...</div>;
  }

  if (auth) {
    return <Navigate to="/blogs" />;
  }
  return children;
};
