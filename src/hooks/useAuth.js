// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  const checkAuthentication = async () => {
    try {
      const authToken = Cookies.get("auth_token");
      if (authToken) {
        const response = await fetch("http://localhost:3000/session_data", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const sessionData = await response.json();
        if (sessionData.user) {
          setIsAuthenticated(true);
          setUserName(sessionData.user.name);
          setUser(sessionData.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error en la API:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [Cookies.get("auth_token")]);

  return { isAuthenticated, user, userName, checkAuthentication };
};

export default useAuth;