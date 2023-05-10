import React from "react";
import "./App.css";
import Header from "../Components/Header/Header";
import Login from "../Pages/Login/Login";
import CompleteProfile from "../Pages/Complete Profile/CompleteProfile";

function App(props) {
  return (
    <div className=" App-div  ">
      {/* <Header /> */}
      {/* <Login /> */}
      <CompleteProfile />
    </div>
  );
}

export default App;
