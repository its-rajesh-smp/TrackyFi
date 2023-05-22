import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserfunc,
  sendForgotPassword,
} from "../../Store/Reducer/authReducer";
import { authUsingGoogle } from "../../Firebase/firebase";

function Login(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();
  const [switchLogin, setSwitchLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [onForgot, setOnForgot] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                SWICTH LOGIN                                */
  /* -------------------------------------------------------------------------- */
  const onSwitchLoginHandeler = () => {
    setOnForgot(false);
    setSwitchLogin((p) => !p);
  };

  /* -------------------------------------------------------------------------- */
  /*                          ON LOGIN?SIGNUP BTN CLICK                         */
  /* -------------------------------------------------------------------------- */
  const onContinueBtnClick = (e) => {
    e.preventDefault();
    if (!loader) {
      setLoader(true);
      dispatch(
        createUserfunc(
          { email: email, password: password },
          switchLogin,
          onSwitchLoginHandeler,
          setLoader
        )
      );
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               ON FORGOT CLICK                              */
  /* -------------------------------------------------------------------------- */
  const onForgotBtnClick = (e) => {
    e.preventDefault();
    setOnForgot((p) => !p);
  };

  /* -------------------------------------------------------------------------- */
  /*                          ON SEND FORGOT LINK CLICK                         */
  /* -------------------------------------------------------------------------- */
  const onSendForgotLink = (e) => {
    e.preventDefault();
    if (!loader) {
      setLoader(true);
      dispatch(sendForgotPassword(email, setLoader, setOnForgot));
    }
  };

  const googleAuthHandeler = () => {
    dispatch(authUsingGoogle());
  };

  return (
    <div className={` Login-div ${theme}`}>
      <div className="Login-div__topDiv">
        <h1>expense tracker</h1>
      </div>

      <div className="Login-div__div">
        <div className="Login-div__middleDiv">
          <h1>
            {switchLogin
              ? onForgot
                ? "Forgot Password"
                : "Login"
              : "Create Account"}
          </h1>
          <div className="GoogleBtnContainer">
            <button onClick={googleAuthHandeler}>
              <i className="bx bxl-google"></i>Google
            </button>
            <div className="lineContainer">
              <p className="lines"></p>Or {switchLogin ? "login " : "connect "}
              with
              <p className="lines"></p>
            </div>
          </div>
        </div>

        <form className="Login-div__form">
          <div className="Login-div__form_inpDiv">
            <label htmlFor="Email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name=""
              id=""
              placeholder="Email"
            />
          </div>

          <div className="Login-div__form_inpDiv">
            {!onForgot && (
              <>
                <label htmlFor="Password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Password"
                  name=""
                  id=""
                />
              </>
            )}
            {switchLogin && !onForgot && (
              <p onClick={onForgotBtnClick} className="forgotPass">
                Forgot Password
              </p>
            )}
          </div>

          {!onForgot && (
            <button onClick={onContinueBtnClick}>
              {loader ? (
                <i className="bx bx-loader-circle bx-spin"></i>
              ) : switchLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          )}

          {onForgot && (
            <button onClick={onSendForgotLink}>
              {loader ? (
                <i className="bx bx-loader-circle bx-spin"></i>
              ) : (
                "Send Forgot Password Link"
              )}
            </button>
          )}

          <div className="Login-div__form_switch">
            <p>
              {switchLogin
                ? "Create new account !"
                : "Already have an account?"}
            </p>
            <p onClick={onSwitchLoginHandeler}>
              {switchLogin ? "New User" : "Sign In"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
