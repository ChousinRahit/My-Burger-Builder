import React, { Component } from "react";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import asyncComponent from "./hoc/asyncComponent";
import Logout from "./Containers/Auth/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/Actions/index";

const asyncCheckout = asyncComponent(() => {
  return import("./Containers/CheckOut/CheckOut");
});

const asyncOreders = asyncComponent(() => {
  return import("./Containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./Containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={asyncOreders} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
