import React from 'react';
import { PostModel } from 'types';
import { NavLink } from 'react-router-dom';
import classes from './Post.module.css';
import Avatar from '../../Generic/Avatar/Avatar';
import { formatDistance, parseISO } from 'date-fns';
import PostMenu from './PostMenu';

type PostHeaderProps = {
  posts: PostModel;
};

const PostHeader = ({ posts }: PostHeaderProps) => {
  return (
    <div className={classes.headerContainer}>
      <Avatar avatarId={posts.user.avatarId} />
      <div className={classes.postAuhthor}>
        <NavLink to={`/${posts.user.username}`}>{posts.user.name}</NavLink>
        <div className={classes.timestamps}>
          {formatDistance(parseISO(posts.created_at), new Date())} ago
        </div>
      </div>
      <PostMenu posts={posts} />
    </div>
  );
};
export default PostHeader;
