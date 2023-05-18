import React, { useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";

function UserProfile(props) {
  const selector = useSelector((state) => state.authReducer);
  console.log(selector);

  const [name, setName] = useState(selector.userName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" UserProfile-div ">
      <h1>User Profile</h1>

      <img
        className="UserProfileImg"
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt=""
      />

      <form>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          name=""
          id=""
        />

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="text"
          name=""
          id=""
        />

        <input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}
          type="text"
          name=""
          id=""
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="text"
          name=""
          id=""
        />

        <div className="btnGroup">
          {!selector.isEmailVerified && <button>VERIFY</button>}
          <button>SAVE</button>
        </div>

        {selector.VIP && <button className="downloadBTN">DOWNLOAD</button>}

        {!selector.isEmailVerified && (
          <p>Verify your account to use 100% of our app</p>
        )}

        {!selector.VIP && (
          <a
            href="https://pages.razorpay.com/pl_LqZNxW1c4Uvlx6/view"
            target="_blank"
          >
            Become a primium to download all data
          </a>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
