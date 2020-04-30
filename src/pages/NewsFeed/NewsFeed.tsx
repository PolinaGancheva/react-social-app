import React from 'react';
import { useInfiniteScroll } from 'hooks';
import { UserDetailsModel } from 'types';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import * as devcamp from 'api/devcamp';
import PostList from 'Components/Domain/Post/PostList';
import { Row, Spinner, Alert, Col } from 'react-bootstrap';
import PostForm from 'Components/Domain/Post/PostForm';

type Props = {
  user: UserDetailsModel;
};

const NewsFeed = ({ user }: Props) => {
  const queryKey = 'posts' as any;
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
    (key, cursor) => devcamp.getFollowingPosts(cursor, 5),
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
      <Row className="justify-content-center">
        <Col md={8} lg={8} sm={12}>
          <PostForm />
          <hr />
          {data.map((page, i) => (
            <PostList key={i} posts={page!.results} />
          ))}
        </Col>
      </Row>
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
export default NewsFeed;
