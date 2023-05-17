import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserfunc } from "../../Store/Reducer/authReducer";

function Header(props) {
  const dispatch = useDispatch();
  const onLogOutBtnClick = () => {
    dispatch(logoutUserfunc());
  };

  return (
    <div className=" Header-div ">
      <div className="Header-div__top">
        <NavLink to={"/"}>
          <i className="bx bxs-bank"></i>
        </NavLink>

        <NavLink to={"/dashboard"}>
          <i className="bx bx-stats"></i>
        </NavLink>

        <NavLink>
          <i className="bx bxs-category"></i>
        </NavLink>
      </div>

      <div className="Header-div__bottom">
        <NavLink to={"/user"}>
          <i className="bx bxs-user-circle"></i>
        </NavLink>

        <i onClick={onLogOutBtnClick} className="bx bxs-log-out"></i>
      </div>
    </div>
  );
}

export default Header;
