import React from "react";
import "./App.css";
import MyRoutes from "../Routes/MyRoutes";
import MyLayout from "../Layout/MyLayout";

function App(props) {
  return (
    <div className=" App-div  ">
      <MyLayout />
      <MyRoutes />
    </div>
  );
}

export default App;
