import React from "react";
import Classes from "./BuildControl.css";
import Button from "../../../UI/Button/Button";

const buildControl = props => {
  return (
    <div className={Classes.BuildControl}>
      <div className={Classes.Label}>{props.label}</div>
      <Button
        btnType="Less"
        className={Classes.Less}
        clicked={props.remove}
        disabled={props.disabled}
      >
        Less
      </Button>
      <Button btnType="Success" className={Classes.More} clicked={props.added}>
        More
      </Button>
    </div>
  );
};

export default buildControl;
