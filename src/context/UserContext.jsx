// src/context/UserContext.js
import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

// UserProvider to wrap the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    Name: null,
    Email: null,
  });

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
