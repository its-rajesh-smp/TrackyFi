import React from "react";
import ReactDOM from "react-dom";
import "./Notification.css";
import { useSelector } from "react-redux";

function Notification(props) {
  const selector = useSelector((state) => state.notificationReducer);

  return ReactDOM.createPortal(
    <>{selector.isVisible && <p>{selector.message}</p>}</>,
    document.querySelector("#notification")
  );
}

export default Notification;
