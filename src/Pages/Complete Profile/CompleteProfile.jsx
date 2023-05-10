import React from "react";
import "./CompleteProfile.css";

function CompleteProfile(props) {
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
              type="text"
              name="Name"
              placeholder="Enter Your Name"
              id="name"
            />
          </div>
          <div>
            <label htmlFor="Mobile Number">Mobile Number</label>
            <input
              type="text"
              name="Mobile Number"
              placeholder="Enter Mobile Number"
              id="mobileNumber"
            />
          </div>
        </div>

        <button className="enterBtn">ENTER</button>
      </div>
    </div>
  );
}

export default CompleteProfile;
