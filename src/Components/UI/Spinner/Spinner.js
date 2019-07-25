import React from "react";
import classes from "./spinner.css";

const spinner = () => {
  return (
    <div style={{height:"100vh"}}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};
export default spinner;
