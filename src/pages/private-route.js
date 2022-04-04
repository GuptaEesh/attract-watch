import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../helpers";

export function PrivateRoute({ component }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? component : <Navigate to="/loginMe" replace />;
}
