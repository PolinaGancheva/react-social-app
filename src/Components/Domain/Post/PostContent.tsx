import React from 'react';
import classes from './Post.module.css';
import PostImage from './PostImage';

type PostContentProps = {
  content: string;
  title: string;
  mediaId: number | undefined;
};

const PostContent = ({ content, title, mediaId }: PostContentProps) => {
  return (
    <div className={classes.postContent}>
      <h3>{title}</h3>
      <div>{content}</div>
      {mediaId && <PostImage mediaId={mediaId} />}
    </div>
  );
};
export default PostContent;
