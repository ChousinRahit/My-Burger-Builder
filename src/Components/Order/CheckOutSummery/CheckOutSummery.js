import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

const CheckOutSummery = props => {
  return (
    <div className={classes.CheckOutSummery}>
      <h1>
        Yummy it will taste Delicious{" "}
        <span style={{ color: "rgba(200,0,0,0.5)" }}>
          <FontAwesomeIcon icon={faSmile} />
        </span>
      </h1>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckOutSummery;
