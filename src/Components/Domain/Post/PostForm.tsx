import React, { useState } from 'react';
import { Avatar, TextAreaField, TextArea } from 'Components/Generic';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAuth } from 'hooks/domain';
import classes from './PostForm.module.css';
import { NavLink } from 'react-router-dom';
import { useMutation, queryCache } from 'react-query';
import * as devcamp from 'api/devcamp';
import { UploadPreview, UploadButton } from '../Uploads';

type FormValues = {
  content: string;
  mediaId: number | null;
};
const PostForm = () => {
  const { user } = useAuth();
  const [shoudShowModal, setShouldShowModal] = useState(false);
  const [createPost] = useMutation(devcamp.createPost, {
    onSuccess: (data) => {
      queryCache.refetchQueries('posts');
      queryCache.refetchQueries(['userPosts', data.user.id]);
    },
  });

  const showModal = () => setShouldShowModal(true);
  const hideModal = () => setShouldShowModal(false);

  if (!user) {
    return null;
  }

  return (
    <>
      <TextArea
        value=""
        placeholder={`What's on your mind, ${user.username}`}
        formControlStyles={{
          width: '100%',
          marginBottom: 0,
          paddingRight: '4rem',
          marginLeft: '2rem',
        }}
        style={{ cursor: 'pointer' }}
        resizable={false}
        rows={1}
        onFocus={showModal}
      />

      <Formik<FormValues>
        initialValues={{ content: '', mediaId: null }}
        onSubmit={async (values, actions) => {
          await createPost(values);
          actions.setSubmitting(false);
          hideModal();
        }}
      >
        {({ isSubmitting, handleSubmit, values, setFieldValue }) => {
          return (
            <Modal
              show={shoudShowModal}
              onHide={hideModal}
              restoreFocus={false}
              scrollable
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className={classes.formHeader}>
                  <Avatar avatarId={user.avatarId} />
                  <NavLink
                    to={`/${user.username}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {user.name}{' '}
                  </NavLink>
                </div>
                <div>
                  <TextAreaField
                    name="content"
                    placeholder="What's on your mind"
                    disabled={isSubmitting}
                    fitContent
                  />
                </div>
                <UploadPreview
                  mediaId={values.mediaId}
                  containerStyle={{ width: '100%', marginBottom: '1rem' }}
                  imgStyle={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                  }}
                  onClear={() => {
                    setFieldValue('mediaId', null);
                  }}
                />
                <div className={classes.upload}>
                  <span>Add picture to your post</span>
                  <UploadButton
                    disabled={isSubmitting}
                    onUploaded={(media) => {
                      setFieldValue('mediaId', media.id);
                    }}
                  />
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant={
                    !values.content && !values.mediaId ? 'light' : 'primary'
                  }
                  type="button"
                  block
                  disabled={
                    isSubmitting || (!values.content && !values.mediaId)
                  }
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </Button>
              </Modal.Footer>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
export default PostForm;
