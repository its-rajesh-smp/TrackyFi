import React from "react";
import { useSelector } from "react-redux";

// Components
import Header from "../Components/Header/Header";
import Login from "../Pages/Login/Login";
import CompleteProfile from "../Pages/Complete Profile/CompleteProfile";
import Theme from "../Components/Theme/Theme";

function MyLayout(props) {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isVerified = useSelector((state) => state.authReducer.isVerified);

  return (
    <>
      <Theme />
      {isVerified && <Header />}
      {!isAuth && <Login />}
      {!isVerified && isAuth && <CompleteProfile />}
    </>
  );
}

export default MyLayout;
