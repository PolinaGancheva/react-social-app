import React from 'react';
import { RouteComponentProps } from 'react-router';
import UserBio from 'Components/Domain/User';
import * as devcamp from 'api/devcamp';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from 'hooks/domain';
import { useQuery } from 'react-query';
import UserPosts from './UserPosts';
import classes from './ProfilePage.module.css';

type Props = RouteComponentProps<{ username: string }>;

const ProfilePage = ({
  match: {
    params: { username },
  },
}: Props) => {
  const { user: authedUser } = useAuth();
  const { data: user, status, error } = useQuery(['user', username], (key, u) =>
    devcamp.getUser(u)
  );

  if (status === 'loading') {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" />
      </Row>
    );
  }
  if (status === 'error') {
    return (
      <Row className="justify-content-center">
        <Alert variant="danger">{devcamp.extractErrorMsg(error)}</Alert>
      </Row>
    );
  }

  if (!user || !authedUser) {
    return null;
  }
  return (
    <div className={classes.container}>
      <Container fluid>
        <Row>
          <Col md={12} lg={4}>
            <UserBio data={user} />
          </Col>
          <Col md={12} lg={7}>
            <UserPosts user={user} canCreatePosts={user.id === authedUser.id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ProfilePage;
