import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from 'js-cookie'


const ProtectedRoute = ({  children }) => {
  const token = Cookie.get("userToken")
  
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
