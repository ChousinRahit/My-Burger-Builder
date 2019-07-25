import React, { Component } from "react";

import { connect } from "react-redux";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import withErrorHandler from "../../../withErrorHandler/withErrorHandler";
import * as orderActions from "../../../Store/Actions/index";
import { checkValidity } from "../../../utility/validation";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      number: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Phone No."
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 10,
          maxLength: 10
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "Fastest",
        validation: {},
        valid: true
      }
    },
    isFormValid: false
  };

  oderHandler = event => {
    event.preventDefault();
    const orderData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      orderData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: this.props.Tprice,
      orderPersonDetails: orderData,
      userId: this.props.userId
    };
    this.props.onOrderBurgerStart(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let isVaalid = true;
    for (let key in updatedOrderForm) {
      isVaalid = updatedOrderForm[key].valid && isVaalid;
    }

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: isVaalid
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = !this.props.loading ? (
      <form onSubmit={this.oderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              key={formElement.id}
              inValid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button
          btnType="Success"
          clicked={this.oderHandler}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    ) : (
      <Spinner />
    );

    return (
      <React.Fragment>
        <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
          <h4 style={{ fontSize: "2em" }}>Enter your contact data</h4>
        </div>
        <div className={classes.ContactData}>{form}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    Tprice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurgerStart: (order, token) =>
      dispatch(orderActions.purchaseBurger(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
