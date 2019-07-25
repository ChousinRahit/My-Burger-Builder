import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.css";

class OrderSummary extends Component {
  // componentWillMount() {
  //   console.log("OrderSummaty dknwdkol");
  // }

  render() {
    const ingrentSummary = Object.keys(this.props.ingredients).map(igkey => {
      return (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span> -
          {this.props.ingredients[igkey]}
        </li>
      );
    });

    return (
      <Aux>
        <div className={classes.OrderSum}>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>{ingrentSummary}</ul>
          <p>
            <strong>Total Price - {this.props.price.toFixed(2)} ₹</strong>
          </p>
          <Button btnType={"Danger"} clicked={this.props.purchaseCanceld}>
            CANCEL
          </Button>
          <Button btnType={"Danger"} clicked={this.props.purchaseContinue}>
            CONTINUE
          </Button>
        </div>

        <div className={classes.Buttons} />
      </Aux>
    );
  }
}

export default OrderSummary;
