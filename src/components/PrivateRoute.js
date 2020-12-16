import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, exact, ...props }) => {
  //   var {component, ...props} = props
  const isAuthed = localStorage.getItem('token');
  return isAuthed ? (
    <Route exact {...props} component={component} />
  ) : (
    <Redirect to="/users/login" />
  );
};
export default PrivateRoute;
