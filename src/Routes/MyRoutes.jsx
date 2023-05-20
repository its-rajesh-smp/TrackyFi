import React from "react";

import HomePage from "../Pages/Home Page/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserProfile from "../Pages/User Profile/UserProfile";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function MyRoutes(props) {
  const isVarified = useSelector((state) => state.authReducer.isVerified);

  return (
    <Routes>
      {isVarified && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<HomePage />} />
        </>
      )}
    </Routes>
  );
}

export default MyRoutes;
