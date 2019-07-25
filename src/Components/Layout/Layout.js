import React, { Component } from "react";

import { connect } from "react-redux";
import Classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Footer from "../UI/footer/footer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  menuClickShow = () => {
    this.setState({ showSideDrawer: true });
  };
  menuClickHide = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <div className={Classes.Content}>
        <div>
          <Toolbar
            menuClick={this.menuClickShow}
            isAuth={this.props.isAuthenticated}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
            close={this.menuClickHide}
            isAuth={this.props.isAuthenticated}
          />
        </div>

        <div  className={Classes.Main}>
          <main>{this.props.children}</main>
        </div>

        <div className={Classes.Footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
