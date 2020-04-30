import React from 'react';
import * as devcamp from 'api/devcamp';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import classes from './Comment.module.css';
import { updateInCache } from 'utils';
import { CommentModel } from 'types';
import { formatDistanceToNow } from 'date-fns';

type CommentActionProps = {
  onClick?: () => void;
  icon: IconDefinition;
  text: string;
  performed: boolean;
};

const CommentAction = ({
  onClick,
  icon,
  text,
  performed,
}: CommentActionProps) => {
  return (
    <button
      type="button"
      tabIndex={0}
      className={classnames(classes.commentAction, {
        [classes.commentActionPerformed]: performed,
      })}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </button>
  );
};

const Separator = () => {
  return <span className={classes.commentFooterSeparator}> . </span>;
};

type Props = {
  comment: CommentModel;
};

const CommentFooter = ({ comment }: Props) => {
  const [like, { status: likeStatus }] = useMutation(devcamp.likeComment, {
    onSuccess: () => {
      updateInCache<CommentModel>(
        ['postComments', comment.postId],
        comment.id,
        (old) => ({
          ...old,
          liked: !old.liked,
          disliked: false,
          likesCount: old.liked ? old.likesCount - 1 : old.likesCount + 1,
          dislikesCount: old.disliked
            ? old.dislikesCount - 1
            : old.dislikesCount,
        })
      );
    },
  });
  const [dislike, { status: dislikeStatus }] = useMutation(
    devcamp.dislikeComment,
    {
      onSuccess: () => {
        updateInCache<CommentModel>(
          ['postComments', comment.postId],
          comment.id,
          (old) => ({
            ...old,
            liked: false,
            disliked: !old.disliked,
            likesCount: old.liked ? old.likesCount - 1 : old.likesCount,
            dislikesCount: old.disliked
              ? old.dislikesCount - 1
              : old.dislikesCount + 1,
          })
        );
      },
    }
  );

  const isLoading = likeStatus === 'loading' || dislikeStatus === 'loading';

  return (
    <div className={classes.commentFooter}>
      <CommentAction
        text={`${comment.likesCount}`}
        icon={faThumbsUp}
        onClick={isLoading ? undefined : () => like(comment.id)}
        performed={comment.liked}
      />
      <Separator />
      <CommentAction
        text={`${comment.dislikesCount}`}
        icon={faThumbsDown}
        onClick={isLoading ? undefined : () => dislike(comment.id)}
        performed={comment.disliked}
      />
      <Separator />
      {formatDistanceToNow(new Date(comment.created_at), {
        includeSeconds: true,
        addSuffix: true,
      })}
    </div>
  );
};
export default CommentFooter;
