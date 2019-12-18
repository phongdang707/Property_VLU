import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Index from "./index";
import HomeIndex from "./home/homeIndex";
import { PrivateRoute } from "../helpers/PrivateRoute";
import { login } from "../actions/index";
import { connect } from "react-redux";
import Test from "./Test";
import PrintFullContract from "./addFullContract";

class ChangeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { signin: "" };
  }

  render() {
    let isLoggedIn;
    if (this.props.signin.isAuthenticated) {
      isLoggedIn = this.props.signin.isAuthenticated;
    }
    const PrivateRoute = () => {
      return isLoggedIn ? (
        <Redirect to="/admin" component={Index} />
      ) : (
        <Route path="/" component={HomeIndex} />
      );
    };
    console.log(this.props.signin);
    console.log("state: ", this.state);
    console.log(this.props.signin.isAuthenticated);

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLoggedIn ? (
                <Redirect to="/admin" component={Index} />
              ) : (
                <HomeIndex />
              )
            }
          />
          {isLoggedIn ? (
            <Route path="/admin" component={Index} />
          ) : (
            <Route path="/" component={HomeIndex} />
          )}
          {/* <Route path="/admin" component={Index} /> */}
          <Route exact path="/" component={HomeIndex} />
          <Route
            path="/Print/:id"
            render={props => <PrintFullContract {...props.match.params} />}
          />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    signin: state.signin
  };
};

export default connect(mapStateToProps, { login })(ChangeLayout);
