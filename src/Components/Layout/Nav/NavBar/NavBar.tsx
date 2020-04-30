import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../../app/mylogo.svg';
import { Nav, Navbar } from 'react-bootstrap';
import UserSearch from 'Components/Domain/UserSearch';
import { useAuth } from 'hooks/domain';
import { useMutation, queryCache } from 'react-query';
import * as devcamp from 'api/devcamp';

const NavBar: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [signOut] = useMutation(devcamp.signOut, {
    onSuccess: () => {
      queryCache.setQueryData('me', undefined);
    },
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={NavLink} to={user ? '/' : '/signin'}>
        <img src={logo} alt="logo" /> SocioLovers
      </Navbar.Brand>
      {user && <UserSearch />}

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>

        {user ? (
          <Nav>
            <Nav.Link eventKey={1} as={NavLink} to={`/${user.username}`}>
              Profile
            </Nav.Link>
            <Nav.Link eventKey={2} as={NavLink} to="/">
              News Feed
            </Nav.Link>
            <Nav.Link
              eventKey={4}
              as={NavLink}
              to="/login"
              onClick={() => signOut()}
              exact
            >
              Sign Out
            </Nav.Link>
          </Nav>
        ) : !isLoading ? (
          <Nav>
            <Nav.Link eventKey={1} as={NavLink} to="/signin">
              Sign In
            </Nav.Link>
            <Nav.Link eventKey={2} as={NavLink} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
