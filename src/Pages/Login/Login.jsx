import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPassword } from "../../Store/Reducer/authReducer";
import { authUsingGoogle } from "../../Firebase/firebase";
import {
  forgotPassAct,
  signInAct,
  signUpAct,
} from "../../Store/Actions/AuthActions";

function Login(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [switchLogin, setSwitchLogin] = useState(false); // This State is used to switch betwen login form and create new account form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [onForgot, setOnForgot] = useState(false); // This state is used to change the form to forgot password form

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
      switchLogin
        ? dispatch(signInAct({ email, password }, setLoader))
        : dispatch(signUpAct({ email, password }, setLoader));
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
      forgotPassAct(email, setLoader, setOnForgot);
    }
  };

  const googleAuthHandeler = () => {
    dispatch(authUsingGoogle());
  };

  return (
    <div className={` Login-div ${theme}`}>
      <div className="Login-div__topDiv">
        <h1>trackyFi</h1>
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
