import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { createUserfunc } from "../../Store/Reducer/authReducer";

function Login(props) {
  const dispatch = useDispatch();
  const [switchLogin, setSwitchLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                SWICTH LOGIN                                */
  /* -------------------------------------------------------------------------- */
  const onSwitchLoginHandeler = () => {
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

  return (
    <div className=" Login-div">
      <div className="Login-div__topDiv">
        <h1>expense tracker</h1>
      </div>

      <div className="Login-div__div">
        <div className="Login-div__middleDiv">
          <h1>{switchLogin ? "Login" : "Create Account"}</h1>
          <div className="GoogleBtnContainer">
            <button>
              <i className="bx bxl-google"></i>Google
            </button>
            <div className="lineContainer">
              <p className="lines"></p>Or {switchLogin ? "login" : "connect"}
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
            <label htmlFor="Password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              name=""
              id=""
            />
          </div>

          <button onClick={onContinueBtnClick}>
            {loader ? (
              <i className="bx bx-loader-circle bx-spin"></i>
            ) : switchLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>

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
