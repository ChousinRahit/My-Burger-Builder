import React, { Component } from "react";
import CheckOutSummery from "../../Components/Order/CheckOutSummery/CheckOutSummery";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class CheckOut extends Component {
  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  CheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {
    let checkOutSummery = null;
  
    checkOutSummery = this.props.ing ? (
      !this.props.purchased ? (
        <React.Fragment>
          <CheckOutSummery
            ingredients={this.props.ing}
            onCheckoutCancelled={this.CheckoutCancelledHandler}
            onCheckoutContinue={this.CheckoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )
    ) : (
      <Redirect to="/" />
    );

    return <div>{checkOutSummery}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(CheckOut);
