import React from 'react';
import { PostModel } from 'types';
import Post from './Post';
import classes from './Post.module.css';

type PostListProps = {
  posts: PostModel[];
};
const PostList = ({ posts }: PostListProps) => {
  return (
    <div className={classes.postsListContainer}>
      {posts.length
        ? posts.map((post) => <Post key={post.id} data={post} />)
        : 'This user has no posts!'}
    </div>
  );
};
export default PostList;
