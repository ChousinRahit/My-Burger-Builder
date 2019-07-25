import React, { Component } from "react";
import classes from "./Order.css";

class Order extends Component {
  state = {
    details: false
  };

  showDetails = () => {
    this.setState({
      details: true
    });
  };
  hideDetails = () => {
    this.setState({
      details: false
    });
  };
  render() {
    const ingredients = [];

    for (let ingredientName in this.props.ingredients) {
      ingredients.push({
        name: ingredientName,
        amount: this.props.ingredients[ingredientName]
      });
    }

    let ingredientOutput = ingredients.map(ig => {
      return (
        <span key={ig.name} className={classes.Ing}>
          {ig.name} - {ig.amount}
        </span>
      );
    });

    // console.log(this.props);

    const ingredientsDetails = (
      <div className={classes.ingDetails}>
        <h4>
          <span>Orderd By </span>
          <span>{this.props.name}</span>
        </h4>
        <h5>
          <span className={classes.OnlyBigScreen}>Phone </span>
          <span>{this.props.number}</span>
        </h5>
        <h5>
          <span className={classes.OnlyBigScreen}>Street </span>

          <span>{this.props.street}</span>
        </h5>
        <h5>
          <span className={classes.OnlyBigScreen}>Mail </span>
          <span>{this.props.email}</span>
        </h5>
        <h5>
          <span className={classes.OnlyBigScreen}>Zip-code </span>

          <span>{this.props.zipcode}</span>
        </h5>
        <h5>
          <span className={classes.OnlyBigScreen}>Delivery Method </span>

          <span>{this.props.method}</span>
        </h5>
      </div>
    );

    let ingredientsList = (
      <div className={classes.ingList}>
        {ingredientOutput}
        <p>
          Price :{" "}
          <strong>
            <span className={classes.Ing}>{Number(this.props.price)} ₹</span>
          </strong>
        </p>
        <p>
          {" "}
          Ordered by: <span className={classes.Ing}>
            {this.props.name}
          </span>{" "}
        </p>
      </div>
    );

    let outPutData = this.state.details ? ingredientsDetails : ingredientsList;

    let actI = null;
    let actD = null;

    if (this.state.details) {
      actD = classes.Active;
    } else {
      actI = classes.Active;
    }

    return (
      <div className={classes.Order}>
        <div className={classes.OredrHeader}>
          <ul className={classes.Lists}>
            <li className={actI} onClick={this.hideDetails}>
              <span
                style={{
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                  cursor: "pointer"
                }}
              >
                Ingredients
              </span>
            </li>
            <li className={actD} onClick={this.showDetails}>
              <span
                style={{
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                  cursor: "pointer"
                }}
              >
                Deatils
              </span>
            </li>
          </ul>
        </div>
        {outPutData}
      </div>
    );
  }
}

export default Order;
