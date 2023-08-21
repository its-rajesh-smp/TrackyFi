import React, { useEffect, useState } from "react";
import "./App.css";
import MyRoutes from "../Routes/MyRoutes";
import MyLayout from "../Layout/MyLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserAct } from "../Store/Actions/AuthActions";

function App(props) {
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.themeReducer.theme);
  /* -------------------------------------------------------------------------- */
  /*                                 FETCH USER                                 */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAct(setLoading));
  }, []);

  if (loading) {
    return (
      <h1 className="appLoading">
        <i className="bx bx-loader-circle bx-spin"></i>
      </h1>
    );
  }

  return (
    <div className={` App-div ${theme}`}>
      <MyLayout />
      <MyRoutes />
    </div>
  );
}

export default App;
