import React, { useState } from 'react';
import classes from './Comment.module.css';
import { PostModel, CommentModel } from 'types';
import { Link } from 'react-router-dom';
import CommentMenu from './CommentMenu';

const { REACT_APP_API_URL } = process.env;

type CommentContentProps = {
  post: PostModel;
  comment: CommentModel;
};

const CommentContent = ({ post, comment }: CommentContentProps) => {
  const [showWholeComment, setShowWholeComment] = useState(
    (comment.content?.length ?? 0) < 100
  );
  return (
    <>
      <div className={classes.commentContent}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            className={classes.commentContentAuthor}
            to={`/${comment.user.username}`}
          >
            {comment.user.name}
          </Link>
          <CommentMenu post={post} comment={comment} />
        </div>
        {comment.content && (
          <>
            <div className={classes.commentContentText}>
              {showWholeComment
                ? comment.content
                : comment.content.slice(0, 100)}
            </div>
            {!showWholeComment && (
              <div
                role="button"
                tabIndex={0}
                className={classes.showMoreText}
                onClick={() => {
                  setShowWholeComment(true);
                }}
              >
                Show more
              </div>
            )}
          </>
        )}
        {comment.mediaId && (
          <img
            className={classes.commentMedia}
            src={`${REACT_APP_API_URL}/media/${comment.mediaId}`}
            alt={`Media ${comment.mediaId}`}
          />
        )}
      </div>
    </>
  );
};
export default CommentContent;
