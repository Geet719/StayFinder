import React, { createContext, useContext, useState, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

// Create context
export const UserDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [user, setUserData] = useState(null);

  // Function to fetch current user
  const getCorrectUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/currentUser", {
        withCredentials: true,
      });
      setUserData(result.data.user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    getCorrectUser();
  }, []);

  // Value to be provided by context
  const value = {
    user,
    setUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
