import React, { Component } from "react";

import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummmary/OrderSummary";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import Spinner from "../../Components/UI/Spinner/Spinner";

import * as actions from "../../Store/Actions/index";
// import chain from "../../Assets/Images/chain.png";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
    window.scrollTo(0, 0);
  }

  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ing)
      .map(igKey => {
        return this.props.ing[igKey];
      })
      .reduce((prev, next) => {
        return prev + next;
      }, 0);
    return sum > 0;
  };

  purchaseHandlr = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    //alert("You Continue...!");
    // this.setState({
    //   Loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Max Schwarzmüller",
    //     address: {
    //       street: "Teststreet 1",
    //       zipCode: "41351",
    //       country: "Germany"
    //     },
    //     email: "test@test.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({
    //       Loading: false,
    //       purchasing: false
    //     });
    //     console.log(response);

    //     // response.headers("Access-Control-Allow-Origin", "*");
    //     // response.headers("Access-Control-Allow-Headers");
    //   })
    //   .catch(error => {
    //     console.log(error);

    //     this.setState({
    //       Loading: false,
    //       purchasing: false
    //     });
    //   });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ing
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.err ? (
      <h2 style={{ textAlign: "center", marginTop: "50vh" }}>
        Ingredients cant be loaded
      </h2>
    ) : (
      <Spinner />
    );

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <div style={{ margin: "0" }}>
            <BuildControls
              ingAdd={this.props.onIngredientAdded}
              ingDed={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              price={this.props.Tprice}
              purchaseble={this.updatePurchaseState()}
              odered={this.purchaseHandlr}
              isAuth={this.props.isAuth}
            />
          </div>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCanceld={this.purchaseCanceledHandler}
          purchaseContinue={this.purchaseContinue}
          price={this.props.Tprice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCanceledHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    Tprice: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuth: state.auth.token != null
  };
};

const mapDispathchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purcaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedireactPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispathchToProps
)(withErrorHandler(BurgerBuilder, axios));
