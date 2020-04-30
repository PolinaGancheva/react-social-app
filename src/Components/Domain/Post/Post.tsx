import React from 'react';
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
  let shouldShowComments = true;
  return (
    <div className={classes.postContainer}>
      <PostHeader posts={data} />
      <PostContent
        title={data.title}
        content={data.content}
        mediaId={data.mediaId}
      />
      <PostActions post={data} />
      <PostComments
        post={data}
        shouldShowComments={shouldShowComments}
        onShowComments={() => {
          shouldShowComments = !shouldShowComments;
        }}
      />
    </div>
  );
};
export default Post;
