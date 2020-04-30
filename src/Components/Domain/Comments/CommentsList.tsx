import React from 'react';
import { CommentModel, PostModel } from 'types';
import classes from './Comment.module.css';
import Comment from './Comment';

type CommentListProps = {
  post: PostModel;
  comments: CommentModel[];
};
const CommentList = ({ post, comments }: CommentListProps) => {
  return (
    <div className={classes.commentListContainer}>
      {comments.map((comment) => (
        <Comment key={comment.id} post={post} comment={comment} />
      ))}
    </div>
  );
};
export default CommentList;
