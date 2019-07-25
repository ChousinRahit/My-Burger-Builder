import React from "react";
import burgerLogo from "../../Assets/Images/burgerLogo.png";
import Classes from "./logo.css";

const logo = props => {
  return (
    <div className={Classes.Logo} style={{height:props.height}}>
      <img src={burgerLogo} alt="myBurger" />
    </div>
  );
};
export default logo;
