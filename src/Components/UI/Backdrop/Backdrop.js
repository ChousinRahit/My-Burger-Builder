import React from "react";
import Classes from "./Backdrop.css";

const backdrop = props => {
  return props.show ? (
    <div onClick={props.clicked} className={Classes.Backdrop} />
  ) : null;
};

export default backdrop;
