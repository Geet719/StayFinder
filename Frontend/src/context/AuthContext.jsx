import React, { createContext, useState } from "react";

// Create the context with a default value
export const authDataContext = createContext({
  serverUrl: "https://stayfinder-i3fg.onrender.com", // or your actual server URL http://localhost:8000
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Create the provider component
export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const serverUrl = "https://stayfinder-i3fg.onrender.com"; // or your actual server URL

  // Create the context value object
  const contextValue = {
    serverUrl,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <authDataContext.Provider value={contextValue}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;
