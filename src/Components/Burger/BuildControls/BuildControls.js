import React from "react";
import Classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={Classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingAdd(ctrl.type)}
            remove={() => props.ingDed(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            isAuth={props.isAuth}
          />
        );
      })}
      <button
        onClick={props.odered}
        className={Classes.OrderButton}
        disabled={!props.purchaseble}
      >
        {props.isAuth ? "ORDER NOW" : "Sign up to Order"}
      </button>
    </div>
  );
};

export default buildControls;
