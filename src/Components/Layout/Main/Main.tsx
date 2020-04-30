import React from 'react';
import classes from './Main.module.css';

const Main: React.FC = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default Main;
