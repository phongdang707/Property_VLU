import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  // <Route
  // {...rest}
  // render={props =>
  //     this.props.signin.isAuthenticated ? (
  //         <Component {...props}></Component>
  //     ):(
  //         <Redirect to={{pathname:"/",state:{from:props.location}}}
  //     )}></Route>
  <Route
    {...rest}
    render={props =>
      this.props.signin.isAuthenticated ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: props.location } }}
        ></Redirect>
      )
    }
  ></Route>
);
