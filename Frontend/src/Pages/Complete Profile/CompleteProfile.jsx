import React, { useState } from "react";
import "./CompleteProfile.css";
import { useDispatch } from "react-redux";
import { verifyUserfunc } from "../../Store/Reducer/authReducer";

function CompleteProfile(props) {
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                                ON BTN SUBMIT                               */
  /* -------------------------------------------------------------------------- */
  const onBtnSubmitHandeler = () => {
    if (!loading) {
      setLoading(true);
      dispatch(verifyUserfunc(name, mobile, setLoading));
    }
  };

  return (
    <div className=" CompleteProfile-div ">
      <div className="CompleteProfile-div__container">
        <h1>WELCOME</h1>
        <div className="imageContainer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="userImg"
          />
        </div>
        <div className="inputContainer">
          <div>
            <label htmlFor="Name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="Name"
              placeholder="Enter Your Name"
              id="name"
            />
          </div>
          <div>
            <label htmlFor="Mobile Number">Mobile Number</label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              name="Mobile Number"
              placeholder="Enter Mobile Number"
              id="mobileNumber"
            />
          </div>
        </div>

        <button onClick={onBtnSubmitHandeler} className="enterBtn">
          {loading ? <i className="bx bx-loader-circle bx-spin"></i> : "ENTER"}
        </button>
      </div>
    </div>
  );
}

export default CompleteProfile;
