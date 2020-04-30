import React from 'react';
import { useInfiniteScroll } from 'hooks';
import { UserDetailsModel } from 'types';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import * as devcamp from 'api/devcamp';
import PostList from 'Components/Domain/Post/PostList';
import { Row, Spinner, Alert } from 'react-bootstrap';
import PostForm from 'Components/Domain/Post/PostForm';

type Props = {
  user: UserDetailsModel;
  canCreatePosts: boolean;
};

const UserPosts = ({ user, canCreatePosts }: Props) => {
  const queryKey = ['userPosts', user.id] as any;
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingMore,
    canFetchMore,
    fetchMore,
  } = useInfiniteQuery(
    queryKey,
    (key, userId, cursor) => devcamp.getPosts(userId, cursor, 5),
    {
      getFetchMore: (lastGroup) => lastGroup.cursor,
    }
  );

  const isLoading = status === 'loading' || isFetchingMore;

  const boundaryRef = useInfiniteScroll<HTMLDivElement>({
    loading: isFetching,
    hasMore: !!canFetchMore,
    onLoadMore: fetchMore,
  });
  return (
    <>
      <h3>Posts</h3>
      {canCreatePosts && (
        <>
          <PostForm />
          <hr />
        </>
      )}
      {data.map((page, i) => (
        <PostList key={i} posts={page!.results} />
      ))}

      {isLoading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      ) : status === 'error' ? (
        <Alert variant="danger">{devcamp.extractErrorMsg(error)}</Alert>
      ) : null}
      <div ref={boundaryRef} />
    </>
  );
};
export default UserPosts;
