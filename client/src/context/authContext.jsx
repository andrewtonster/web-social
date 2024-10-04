import { createContext, useEffect, useState } from "react";

// create context to be used in nexted children
export const AuthContext = createContext();

// wrap this provider around children and define
// basically defining a state and toggle function
// that all the providers children can use
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Andrew Doe",
      profilePic: "https://i.imgur.com/UMnOBer.png",
    });
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
