import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, ...props }) =>
  isLoggedIn ? <Route {...props} /> : <Redirect to="/admin" />;
