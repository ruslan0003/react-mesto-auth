import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { ROUTES_MAP } from '../utils/routesMap.js';

const ProtectedRoute = (props) => {
  const { loggedIn, children, ...rest } = props;
  return loggedIn ? <Route {...rest}>{children}</Route> : <Redirect to={ROUTES_MAP.LOGIN} />;
}

export default ProtectedRoute; 