import React from 'react';
import { PostModel, CommentModel } from 'types';
import classes from './Comment.module.css';
import CommentContent from './CommentContent';
import CommentFooter from './CommentFooter';
import Thumbnail from '../Thumbnail';

type Props = {
  post: PostModel;
  comment: CommentModel;
};

const Comment = ({ post, comment }: Props) => {
  return (
    <div className={classes.commentContainer}>
      <div className={classes.commentThumbnail}>
        <Thumbnail mediaId={comment.user.avatarId} small />
      </div>
      <div className={classes.commentContentContainer}>
        <CommentContent post={post} comment={comment} />
        <CommentFooter comment={comment} />
      </div>
    </div>
  );
};
export default Comment;
