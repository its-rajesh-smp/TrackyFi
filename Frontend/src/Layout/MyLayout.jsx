import React from "react";
import { useSelector } from "react-redux";

// Components
import Header from "../Components/Header/Header";
import Theme from "../Components/Theme/Theme";
import Notification from "../Components/Notification/Notification";

function MyLayout(props) {
  const isVerified = useSelector((state) => state.authReducer.isVerified);

  return (
    <>
      <Notification />
      <Theme />
      {isVerified && <Header />}
    </>
  );
}

export default MyLayout;
