import React from 'react';
import classes from './NotFound.module.css';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={classes.contanier}>
      <h1>Oops!</h1>
      <h2>404 Page Not Found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <NavLink to="/">Go To Homepage</NavLink>
    </div>
  );
};
export default NotFound;
