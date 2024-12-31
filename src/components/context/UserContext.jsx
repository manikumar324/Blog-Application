import React, { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// Custom hook to use UserContext


// UserProvider to wrap the application
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if it exists
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: null, email: null };
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user.name && user.email) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
