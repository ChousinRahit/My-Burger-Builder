import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Classes from "./DrawerToggle.css";

const drawerToggle = props => {
  return (
    <Aux>
      <div onClick={props.menuClick} className={Classes.DrawerToggle}>
        <div />
        <div />
        <div />
      </div>
    </Aux>
  );
};

export default drawerToggle;
