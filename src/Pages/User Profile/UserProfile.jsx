import React from "react";
import "./UserProfile.css";

function UserProfile(props) {
  return (
    <div className=" UserProfile-div ">
      <h1>User Profile</h1>
      <img
        className="UserProfileImg"
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt=""
      />
      <form>
        <div className="inputGrp">
          <input value="RAJESH SINGHA MAHA PATRA" type="text" name="" id="" />
          <i className="bx bxs-edit-alt"></i>
        </div>
        <div className="inputGrp">
          <input value="rajeshsmp500@gmail.com" type="text" name="" id="" />
          <i className="bx bxs-edit-alt"></i>
        </div>
        <div className="inputGrp">
          <input value="+91 8942908195" type="text" name="" id="" />
          <i className="bx bxs-edit-alt"></i>
        </div>
        <div className="inputGrp">
          <input value={"*********"} type="text" name="" id="" />
          <i className="bx bxs-edit-alt"></i>
        </div>

        <div className="btnGroup">
          <button>VERIFY</button>
          <button>SAVE</button>
        </div>
        <button className="downloadBTN">DOWNLOAD</button>
        <p>Verify your account to use 100% of our app</p>
        <a
          href="https://pages.razorpay.com/pl_LqZNxW1c4Uvlx6/view"
          target="_blank"
        >
          Become a primium to download all data
        </a>
      </form>
    </div>
  );
}

export default UserProfile;
