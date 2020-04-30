import React from 'react';
import classes from './Thumbnail.module.css';
import placeholder from './placeholder.jpg';
import Image from 'react-bootstrap/Image';

type AvatarProps = {
  mediaId: number | null;
  small?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const { REACT_APP_API_URL } = process.env;

const Thumbnail = ({ mediaId, small, style, onClick }: AvatarProps) => {
  return (
    <Image
      src={mediaId ? `${REACT_APP_API_URL}/media/${mediaId}` : placeholder}
      alt="Avatar"
      thumbnail
      className={small ? classes.smallThumbnail : classes.thumbnail}
      onClick={onClick}
    />
  );
};
export default Thumbnail;
