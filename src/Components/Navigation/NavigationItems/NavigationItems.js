import React from "react";
import NavigationItem from "./NavigatinoItem/NavigatinoItem";
import Classes from "./NavigationItems.css";

const navigationItems = props => {
  return (
    <ul className={Classes.NavigationItems}>
      <NavigationItem link="/" clicked={props.clicked}>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders" clicked={props.clicked}>
          Orders
        </NavigationItem>
      ) : null}

      {props.isAuthenticated ? (
        <NavigationItem link="/logout" clicked={props.clicked}>
          Log-out{" "}
        </NavigationItem>
      ) : (
        <NavigationItem link="/auth" clicked={props.clicked}>
          Authenticate{" "}
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
