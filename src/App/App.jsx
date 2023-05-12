import React from "react";
import "./App.css";
import Header from "../Components/Header/Header";
import Login from "../Pages/Login/Login";
import CompleteProfile from "../Pages/Complete Profile/CompleteProfile";
import HomePage from "../Pages/Home Page/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";

function App(props) {
  return (
    <div className=" App-div  ">
      <Header />
      {/* <Login /> */}
      {/* <CompleteProfile /> */}
      {/* <HomePage /> */}
      <Dashboard />
    </div>
  );
}

export default App;
