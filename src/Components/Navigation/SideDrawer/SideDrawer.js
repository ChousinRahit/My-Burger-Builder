import React from "react";
import Logo from "../../LOGO/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Classes from "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const sideDrawer = props => {
  let attachedClasses = [Classes.SideDrawer, Classes.Close];

  if (props.open) {
    attachedClasses = [Classes.SideDrawer, Classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={Classes.LSContainer}>
          <Logo height="50px" style={{ margin: "0px" }} />
          <span onClick={props.close} className={Classes.Sclose} />
        </div>

        <nav>
          <NavigationItems
            className={Classes.Nav}
            isAuthenticated={props.isAuth}
            clicked={props.closed}
          />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
