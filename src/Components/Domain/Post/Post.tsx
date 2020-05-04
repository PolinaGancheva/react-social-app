import React, { useState } from 'react';
import { PostModel } from 'types';
import classes from './Post.module.css';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import PostComments from './PostComments';

type PostProps = {
  data: PostModel;
};

const Post = ({ data }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className={classes.postContainer}>
      <PostHeader posts={data} />
      <PostContent
        title={data.title}
        content={data.content}
        mediaId={data.mediaId}
      />
      <PostActions
        post={data}
        onShowComments={() => {
          setShowComments(!showComments);
        }}
      />
      <PostComments
        post={data}
        shouldShowComments={showComments}
        onShowComments={() => {
          setShowComments(!showComments);
        }}
      />
    </div>
  );
};
export default Post;
