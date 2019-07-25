import React from "react";
import Classes from "./NavigatinoItem.css";
import { NavLink } from "react-router-dom";

const navigatinoItem = props => {
  return (
    <li className={Classes.NavigatinoItem} onClick={props.clicked}>
      <div className={Classes.DivOfNavs}>
        <NavLink to={props.link} exact activeClassName={Classes.active}>
          {props.children}
        </NavLink>
      </div>
    </li>
  );
};

export default navigatinoItem;
