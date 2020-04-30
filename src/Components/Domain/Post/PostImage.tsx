import React from 'react';
import Image from 'react-bootstrap/Image';
import classes from './Post.module.css';

type ImageProps = {
  mediaId?: number;
};

const { REACT_APP_API_URL } = process.env;

const PostImage = ({ mediaId }: ImageProps) => {
  return (
    <Image
      src={`${REACT_APP_API_URL}/media/${mediaId}`}
      alt="Avatar"
      className={classes.postimg}
    />
  );
};

export default PostImage;
