import React from "react";
import { useSelector } from "react-redux";

// Components
import Header from "../Components/Header/Header";
import Theme from "../Components/Theme/Theme";

function MyLayout(props) {
  const isVerified = useSelector((state) => state.authReducer.isVerified);

  return (
    <>
      <Theme />
      {isVerified && <Header />}
    </>
  );
}

export default MyLayout;
