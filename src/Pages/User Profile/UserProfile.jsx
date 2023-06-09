import React, { useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayment,
  sendEmailVerification,
  updateProfile,
} from "../../Store/Reducer/authReducer";
import { onDownload } from "../../Store/Reducer/transectionReducer";

function UserProfile(props) {
  const selector = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [name, setName] = useState(selector.userName);
  const [email, setEmail] = useState(selector.email);
  const [phone, setPhone] = useState(selector.userMobile);
  const [password, setPassword] = useState("************");
  const [loader, setLoader] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                             ON VERIFY BTN CLICK                            */
  /* -------------------------------------------------------------------------- */
  const onVerify = (e) => {
    e.preventDefault();
    if (!loader) {
      setLoader(true);
      dispatch(sendEmailVerification(setLoader));
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              ON EDIT BTN CLICK                             */
  /* -------------------------------------------------------------------------- */
  const onEdit = (e) => {
    e.preventDefault();
    setToggleEdit((p) => !p);
  };

  /* -------------------------------------------------------------------------- */
  /*                             ON CANCLE BTN CLICK                            */
  /* -------------------------------------------------------------------------- */
  const onCancle = (e) => {
    e.preventDefault();
    setToggleEdit(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                              ON SAVE BTN CLICK                             */
  /* -------------------------------------------------------------------------- */
  const onSave = (e) => {
    e.preventDefault();
    if (!loader) {
      setLoader(true);
      dispatch(updateProfile(name, phone, password, setLoader, setToggleEdit));
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              ON CODE ADD CLICK                             */
  /* -------------------------------------------------------------------------- */
  const onClickUnlockVip = (e) => {
    e.preventDefault();
    const enteredCode = prompt("Enter VIP CODE:- (PUT ANY RANDOM)");
    if (enteredCode.trim() === "") {
      return;
    }
    dispatch(fetchPayment(enteredCode));
  };

  /* -------------------------------------------------------------------------- */
  /*                            ON DOWNLOAD BTN CLICK                           */
  /* -------------------------------------------------------------------------- */

  const onDownloadHandeler = (e) => {
    e.preventDefault();
    dispatch(onDownload());
  };

  return (
    <div className=" UserProfile-div ">
      <h1>User Profile</h1>

      <img
        className="UserProfileImg"
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt=""
      />

      <form>
        {loader && <i className="bx bx-loader-circle bx-spin"></i>}

        <input
          disabled={!toggleEdit}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          name=""
          id=""
        />

        <input
          disabled={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="text"
          name=""
          id=""
        />

        <input
          disabled={!toggleEdit}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}
          type="text"
          name=""
          id=""
        />

        <input
          disabled={!toggleEdit}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="text"
          name=""
          id=""
        />

        <div className="btnGroup">
          {!selector.emailVerified && (
            <button onClick={onVerify}>VERIFY YOUR EMAIL</button>
          )}
          <button
            onClick={toggleEdit ? onSave : onEdit}
            disabled={!selector.emailVerified}
          >
            {toggleEdit ? "SAVE" : "EDIT"}
          </button>

          {toggleEdit && <button onClick={onCancle}>CANCLE</button>}
        </div>

        {selector.VIP && (
          <>
            <button onClick={onDownloadHandeler} className="downloadBTN">
              DOWNLOAD
            </button>
          </>
        )}

        {!selector.emailVerified && (
          <p>Verify your account to use 100% of our app</p>
        )}

        {!selector.VIP && (
          <p style={{ cursor: "pointer" }} onClick={onClickUnlockVip}>Unlock VIP</p>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
