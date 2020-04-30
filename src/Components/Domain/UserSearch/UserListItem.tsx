import React from 'react';
import { UserSummaryModel } from 'types';
import classes from './UserSearch.module.css';
import Thumbnail from '../Thumbnail';

type Props = {
  user: UserSummaryModel;
};
const UserListItem = ({ user }: Props) => {
  return (
    <div className={classes.item}>
      <Thumbnail mediaId={user.avatarId} small />
      <div className={classes.name}>
        {user.name} <div className={classes.username}> ({user.username})</div>
      </div>
    </div>
  );
};
export default UserListItem;
