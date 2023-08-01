import React from "react";

import HomePage from "../Pages/Home Page/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserProfile from "../Pages/User Profile/UserProfile";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryPage from "../Pages/Category Page/CategoryPage";
import Login from "../Pages/Login/Login";
import CompleteProfile from "../Pages/Complete Profile/CompleteProfile";

function MyRoutes(props) {
  const isVerified = useSelector((state) => state.authReducer.verified);
  const isAuth = useSelector((state) => state.authReducer.auth);

  return (
    <Routes>
      {isVerified && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<HomePage />} />
        </>
      )}

      {!isAuth && <Route path="*" element={<Login />} />}

      {!isVerified && isAuth && (
        <Route path="*" element={<CompleteProfile />} />
      )}
    </Routes>
  );
}

export default MyRoutes;
