import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../Components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import * as orderActions from "../../Store/Actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
    window.scrollTo(0, 0);
  }

  render() {
    let oredrPlaceHolder = null;
    oredrPlaceHolder =
      this.props.orders.length === 0 ? (
        <div style={{ minHeight: "100vh" }}>
          <div style={{ textAlign: "center", marginTop: "48vh" }}>
            <h4>It seems you have not ordered any Burger</h4>
            <h5>Please order one...!</h5>
          </div>
        </div>
      ) : null;

    return (
      <div>
        {oredrPlaceHolder}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.props.orders.map(order => {
              return (
                <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price}
                  name={order.orderPersonDetails.name}
                  street={order.orderPersonDetails.street}
                  zipcode={order.orderPersonDetails.zipCode}
                  method={order.orderPersonDetails.deliveryMethod}
                  email={order.orderPersonDetails.email}
                  number={order.orderPersonDetails.number}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    isAuth: state.auth.token != null,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userID) =>
      dispatch(orderActions.getBackOrders(token, userID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
