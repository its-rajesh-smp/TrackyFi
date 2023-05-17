import React from "react";
import Header from "../Components/Header/Header";
import Login from "../Pages/Login/Login";
import { useSelector } from "react-redux";

function MyLayout(props) {
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  return (
    <>
      {isAuth && <Header />}
      <Login />
    </>
  );
}

export default MyLayout;
