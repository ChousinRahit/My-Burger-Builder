import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as authActions from "../../Store/Actions/index";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authActions.logout())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Logout);
