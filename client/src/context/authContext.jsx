import { createContext, useEffect, useState } from "react";
import axios from "axios";

// create context to be used in nexted children
export const AuthContext = createContext();

// wrap this provider around children and define
// basically defining a state and toggle function
// that all the providers children can use

const host = import.meta.env.VITE_HOST;

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${host}/api/auth/login`, inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    // we keeping the user information on the local host to access other parts
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
