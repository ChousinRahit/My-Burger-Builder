import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../../Store/Actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { checkValidity } from "../../utility/validation";
import classes from "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faHandPointRight
} from "@fortawesome/free-solid-svg-icons";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isFormValid: false,
    isSignUp: true,
    errorMessage: "rhddddddddddde",
    showErrorMessage: false
  };

  inputChangedHandler = (event, controlId) => {
    const updatedControls = {
      ...this.state.controls,
      [controlId]: {
        ...this.state.controls[controlId],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlId].validation
        ),
        touched: true
      }
    };
    this.setState({
      controls: updatedControls
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  componentDidUpdate() {
    if (this.props.error) {
      if (this.state.errorMessage !== this.props.error) {
        this.setState({
          errorMessage: this.props.error,
          showErrorMessage: true
        });
      }
    }
  }

  switchAuthMode = () => {
    this.setState({
      showErrorMessage: false
    });
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  hideErrorMessage = () => {
    if (this.props.error) {
      this.setState({
        showErrorMessage: !this.state.showErrorMessage
      });
    }
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath === "/checkout") {
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    let authRedirectOnAuth = null;
    if (this.props.isAuth) {
      authRedirectOnAuth = <Redirect to={this.props.authRedirectPath} />;
    }

    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          inValid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.Content}>
        {authRedirectOnAuth}
        <h3 className={classes.H3}>
          <span className={classes.Sign}>
            {this.state.isSignUp ? "Sing Up" : "Sign In"}
          </span>
        </h3>
        <div className={classes.Body}>
          <h4 className={classes.H4}>
            Please provide{" "}
            {this.state.isSignUp
              ? "your mail-id and create password."
              : "your credentials."}
          </h4>
          <form onSubmit={this.onSubmitHandler} className={classes.Form}>
            {form}
            <div style={{ float: "left" }}>
              <Button btnType="Success" clicked={this.hideErrorMessage}>
                {" "}
                {!this.state.isSignUp ? "SIGN-IN" : "SIGN-UP"}{" "}
                <FontAwesomeIcon icon={faUser} />
              </Button>
            </div>
          </form>
          <Button btnType="Switch" clicked={this.switchAuthMode}>
            Switch to {this.state.isSignUp ? "Sign-in" : "Sign-up"}{" "}
            <FontAwesomeIcon icon={faSignOutAlt} />{" "}
          </Button>
          {this.state.showErrorMessage ? (
            <p style={{ textAlign: "center", color: "red" }}>
              {" "}
              {this.state.errorMessage}
            </p>
          ) : null}

          {this.state.isSignUp ? (
            <div style={{ margin: "30px", color: "rgba(0,0,0,0.5)" }}>
              <h6>
                <FontAwesomeIcon icon={faHandPointRight} /> Sing Up with any
                valid mail ID ex:- example@exa.com
              </h6>
              <h6>
                <FontAwesomeIcon icon={faHandPointRight} /> Password must be 6
                letter long
              </h6>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token != null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(authActions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedireactPath("/"))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
