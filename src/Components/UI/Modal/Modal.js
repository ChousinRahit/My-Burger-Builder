import React from "react";
import Classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
// import chain from "../../../Assets/Images/chain.png";

const modal = props => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />

      <div
        className={Classes.Modal}
        style={{
          margin: 0,
          padding: "5px",
          borderRadius: "50px",
          backgroundColor: "rgb(143,92,44)",
          transform: props.show ? "translateY(0)" : "translateY(-200vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {/*props.show ? (
          <img src={chain} alt="Chain" style={{ cursor: "pointer" }} />
      ) : null*/}
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
