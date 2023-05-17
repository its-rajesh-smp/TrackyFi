import React, { useEffect, useState } from "react";
import "./App.css";
import MyRoutes from "../Routes/MyRoutes";
import MyLayout from "../Layout/MyLayout";
import { useDispatch } from "react-redux";
import { fetchUsefunc } from "../Store/Reducer/authReducer";

function App(props) {
  const [loading, setLoading] = useState(true);
  /* -------------------------------------------------------------------------- */
  /*                                 FETCH USER                                 */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsefunc(setLoading));
  }, []);

  if (loading) {
    return (
      <h1 className="appLoading">
        <i className="bx bx-loader-circle bx-spin"></i>
      </h1>
    );
  }

  return (
    <div className=" App-div  ">
      <MyLayout />
      <MyRoutes />
    </div>
  );
}

export default App;
