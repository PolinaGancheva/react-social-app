import React, { useRef } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as devcamp from 'api/devcamp';
import { MediaModel } from 'types';
import { useMutation } from 'react-query';

type Props = {
  disabled?: boolean;
  onUploaded?: (uploadedMedia: MediaModel) => void;
};
const UploadButton = ({ disabled, onUploaded }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadMedia, { status }] = useMutation(devcamp.uploadMedia, {
    onSuccess: (data) => {
      if (onUploaded) {
        onUploaded(data);
      }
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    uploadMedia(file);
  };

  const isLoading = status === 'loading';

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChange}
      />
      <Button
        variant="light"
        size="sm"
        type="button"
        disabled={isLoading || disabled}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faCamera} style={{ color: 'gray' }} />
        )}
      </Button>
    </>
  );
};

export default UploadButton;
