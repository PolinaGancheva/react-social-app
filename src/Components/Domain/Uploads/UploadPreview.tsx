import React from 'react';
import classes from './UploadPreview.module.css';
import classnames from 'classnames';

type Props = {
  mediaId?: number | null;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  imgStyle?: React.CSSProperties;
  imgClassName?: string;
  onClear?: () => void;
  disabled?: boolean;
};

const { REACT_APP_API_URL } = process.env;

const UploadPreview = ({
  mediaId,
  containerClassName,
  containerStyle,
  imgClassName,
  imgStyle,
  onClear,
}: Props) => {
  if (!mediaId) {
    return null;
  }

  return (
    <div
      className={classnames(classes.container, containerClassName)}
      style={containerStyle}
    >
      <img
        src={`${REACT_APP_API_URL}/media/${mediaId}`}
        alt={`Media ${mediaId}`}
        className={classnames(classes.img, imgClassName)}
        style={imgStyle}
      />
      <button
        type="button"
        className={classnames('close', classes.clearImgBtn)}
        onClick={() => {
          onClear?.();
        }}
      >
        <span className="aria-hidden">x</span>
      </button>
    </div>
  );
};
export default UploadPreview;
