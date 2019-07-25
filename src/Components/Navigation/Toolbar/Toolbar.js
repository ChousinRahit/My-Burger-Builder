import React from "react";
import Classes from "./Toolbar.css";
import Logo from "../../LOGO/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "./DrawerToggle";

const toolbar = props => {
  return (
    <header className={Classes.Toolbar}>
      <DrawerToggle menuClick={props.menuClick} />
      <Logo height="80%" />
      <nav className={Classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/>
      </nav>
    </header>
  );
};

export default toolbar;
