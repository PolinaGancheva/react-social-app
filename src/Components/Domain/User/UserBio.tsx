import React from 'react';
import classes from './User.module.css';
import { UserDetailsModel, UserSummaryModel } from 'types';
import Thumbnail from '../Thumbnail';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import FollowButton from '../FollowButton';
import { format, parseISO } from 'date-fns';
import {
  faBirthdayCake,
  faCity,
  faLocationArrow,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from 'hooks/domain';

type UserDetailsProps = {
  data: UserDetailsModel & UserSummaryModel;
};

const UserBio = ({ data }: UserDetailsProps) => {
  const { user } = useAuth();

  return (
    <div className={classes.userDetails}>
      <Container>
        <Row>
          <Col>
            <Thumbnail mediaId={data.avatarId} />
          </Col>
          <Col className={classes.sideInfo}>
            <Row>
              <h3> {data.name}</h3>
            </Row>
            <Row>
              <h5> {data.username}</h5>
            </Row>
            <Row>
              Member since:{' '}
              {data.userBio?.created_at
                ? format(parseISO(data.userBio?.created_at), 'MM/dd/yyyy')
                : 'no information'}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  size="lg"
                  color="#138496"
                />{' '}
                Date of birth:{' '}
                {data.userBio?.dateOfBirth
                  ? format(parseISO(data.userBio?.dateOfBirth), 'MM/dd/yyyy')
                  : 'no information'}
              </ListGroupItem>
              <ListGroupItem>
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  size="lg"
                  color="#138496"
                />{' '}
                Country:{' '}
                {data.userBio?.country
                  ? data.userBio?.country
                  : 'no information'}
              </ListGroupItem>
              <ListGroupItem>
                <FontAwesomeIcon icon={faCity} size="lg" color="#138496" />{' '}
                City:{' '}
                {data.userBio?.city ? data.userBio?.city : 'no information'}
              </ListGroupItem>
              <ListGroupItem>
                <FontAwesomeIcon icon={faBriefcase} size="lg" color="#138496" />{' '}
                Works as:{' '}
                {data.userBio?.occupation
                  ? data.userBio?.occupation
                  : 'no information'}
              </ListGroupItem>
              <Row className={classes.follow}>
                <span className={classes.followers}>
                  <span className={classes.value}>{data.followersCount}</span>
                  <span className={classes.label}>Followers</span>
                </span>

                <span className={classes.following}>
                  <span className={classes.value}>{data.followingCount}</span>
                  <span className={classes.label}>Following</span>
                </span>
              </Row>
              {user?.id !== data.id ? (
                <FollowButton following={data.following} id={data.id} />
              ) : (
                ''
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default UserBio;
