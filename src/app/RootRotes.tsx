import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NewsFeed, NotFound, ProfilePage, SignIn } from 'pages';
import SignUp from 'pages/Auth/SignUp';
import { useAuth } from '../hooks/domain/useAuth';
import { Spinner } from 'react-bootstrap';

const RootRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div style={{ display: 'felx', justifyContent: 'center' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Switch>
        <Redirect from="/signup" to="/" />
        <Redirect from="/signin" to="/" />

        <Route exact path="/" component={NewsFeed} />
        <Route exact path="/:username" component={ProfilePage} />
        <Redirect path="/signup" to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Redirect to="/signin" />
      <Route component={NotFound} />
    </Switch>
  );
};
export default RootRoutes;
