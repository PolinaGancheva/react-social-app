import React from 'react';
import classes from './Avatar.module.css';
import placeholder from './placeholder.jpg';

type AvatarProps = {
  avatarId: number;
};
const { REACT_APP_API_URL } = process.env;

const Avatar = ({ avatarId }: AvatarProps) => {
  return (
    <img
      src={avatarId ? `${REACT_APP_API_URL}/media/${avatarId}` : placeholder}
      alt="Avatar"
      className={classes.thumbnail}
    />
  );
};
export default Avatar;
