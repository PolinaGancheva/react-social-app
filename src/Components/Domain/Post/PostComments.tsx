/*eslint-disable*/
import React, { useEffect } from 'react';
import { PostModel } from 'types';
import { Row, Alert, Spinner } from 'react-bootstrap';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import * as devcamp from 'api/devcamp';
import { deduplicateCache, appendToCache, updateInCache } from 'utils';
import classes from '../Comments/Comment.module.css';
import { CommentList, CommentForm } from '../Comments';

type Props = {
  post: PostModel;
  shouldShowComments: boolean;
  onShowComments: () => void;
};

const PostComments = ({ post, shouldShowComments, onShowComments }: Props) => {
  /*eslint-disable-next-line*/
  const queryKey = ['postComments', post.id] as any;
  const {
    data,
    status,
    error,
    isFetchingMore,
    canFetchMore,
    refetch,
    fetchMore,
  } = useInfiniteQuery(
    queryKey,
    (key, postId, cursor) => devcamp.getComments(postId, cursor, 3),
    {
      getFetchMore: (lastPage) => lastPage.cursor,
      manual: true,
      onSuccess: () => {
        deduplicateCache(queryKey);
      },
    }
  );

  useEffect(() => {
    if (shouldShowComments) {
      refetch();
    }
  }, [refetch, shouldShowComments]);

  const isLoading = status === 'loading' || isFetchingMore;

  return (
    <div className={classes.commentsContainer}>
      {post.commentsCount > 0 && !shouldShowComments ? (
        <span
          className={classes.showMoreText}
          onClick={onShowComments}
          role="button"
          tabIndex={0}
        >
          Show comments
        </span>
      ) : (
        <>
          {data.map((comments, i) => (
            <CommentList key={i} post={post} comments={comments.results} />
          ))}
          {isLoading ? (
            <Row className="justify-content-center">
              <Spinner animation="border" size="sm" />
            </Row>
          ) : error ? (
            <Alert variant="danger">{devcamp.extractErrorMsg(error)}</Alert>
          ) : null}
          {!!canFetchMore && (
            <span
              className={classes.showMoreText}
              onClick={() => fetchMore()}
              role="button"
              tabIndex={0}
            >
              Show more comments
            </span>
          )}
        </>
      )}
      <CommentForm
        post={post}
        onSuccess={(comment) => {
          appendToCache(['postComments', comment.postId], comment);
          updateInCache<PostModel>(['posts'], post.id, (old) => ({
            ...old,
            commentsCount: old.commentsCount + 1,
          }));
          updateInCache<PostModel>(
            ['userPosts', post.user.id],
            post.id,
            (old) => ({
              ...old,
              commentsCount: old.commentsCount + 1,
            })
          );
          console.log(shouldShowComments);
          console.log(onShowComments);
          onShowComments();
        }}
      />
    </div>
  );
};

export default PostComments;
