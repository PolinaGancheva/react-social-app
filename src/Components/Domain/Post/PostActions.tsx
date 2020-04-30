import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PostModel } from 'types';
import * as devcamp from 'api/devcamp';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faComment,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import classes from './Post.module.css';
import { updateInCache } from 'utils';

type PostActionProps = {
  onClick?: () => void;
  icon: IconDefinition;
  text: string;
  performed: boolean;
};

const PostAction = ({ onClick, icon, text, performed }: PostActionProps) => {
  return (
    <Col className="mt-1 mt-sm-0" xs={12} sm={4}>
      <button
        type="button"
        className={classnames(classes.postAction, {
          [classes.postActionPerformed]: performed,
        })}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} />
        <span>{text}</span>
      </button>
    </Col>
  );
};

type PostActionsProps = {
  post: PostModel;
  onShowComments?: () => void;
};

const PostActions = ({ post, onShowComments }: PostActionsProps) => {
  const likeUpdater = (old: PostModel) => ({
    ...old,
    liked: !old.liked,
    disliked: false,
    likesCount: old.liked ? old.likesCount - 1 : old.likesCount + 1,
    dislikesCount: old.disliked ? old.dislikesCount - 1 : old.dislikesCount,
  });

  const dislikeUpdater = (old: PostModel) => ({
    ...old,
    liked: false,
    disliked: !old.disliked,
    likesCount: old.liked ? old.likesCount - 1 : old.likesCount,
    dislikesCount: old.disliked ? old.dislikesCount - 1 : old.dislikesCount + 1,
  });

  const [like, { status: likeStatus }] = useMutation(devcamp.likePost, {
    onSuccess: () => {
      updateInCache<PostModel>(['posts'], post.id, likeUpdater);
      updateInCache<PostModel>(
        ['userPosts', post.user.id],
        post.id,
        likeUpdater
      );
    },
  });

  const [dislike, { status: dislikeStatus }] = useMutation(
    devcamp.dislikePost,
    {
      onSuccess: () => {
        updateInCache<PostModel>(['posts'], post.id, dislikeUpdater);
        updateInCache<PostModel>(
          ['userPosts', post.user.id],
          post.id,
          dislikeUpdater
        );
      },
    }
  );

  const isLoading = likeStatus === 'loading' || dislikeStatus === 'loading';
  return (
    <Row className="px=sm-3 pb-sm px-1 pb-1">
      <PostAction
        text={`${post.likesCount} Likes`}
        icon={faThumbsUp}
        onClick={isLoading ? undefined : () => like(post.id)}
        performed={post.liked}
      />
      <PostAction
        text={`${post.dislikesCount} Dislikes`}
        icon={faThumbsDown}
        onClick={isLoading ? undefined : () => dislike(post.id)}
        performed={post.disliked}
      />
      <PostAction
        text={`${post.commentsCount} Comments`}
        icon={faComment}
        onClick={onShowComments}
        performed={false}
      />
    </Row>
  );
};

export default PostActions;
