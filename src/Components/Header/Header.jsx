import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className=" Header-div ">
      <div className="Header-div__top">
        <i className="bx bxs-bank"></i>
        <i className="bx bx-stats"></i>
        <i className="bx bxs-category"></i>
      </div>
      <div className="Header-div__bottom">
        <i className="bx bxs-user-circle"></i>
        <i className="bx bxs-log-out"></i>
      </div>
    </div>
  );
}

export default Header;
