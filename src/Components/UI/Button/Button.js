import React from "react";
import Classes from "./Button.css";

const button = props => {
  return (
    <button
      className={[Classes.Button, Classes[props.btnType]].join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
