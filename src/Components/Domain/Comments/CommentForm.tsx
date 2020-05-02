import React from 'react';
import { TextAreaField } from 'Components/Generic';
import classnames from 'classnames';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import * as devcamp from 'api/devcamp';
import { UploadButton, UploadPreview } from '../Uploads';
import classes from './Comment.module.css';
import { PostModel, CommentModel } from 'types';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { useAuth } from 'hooks/domain';
import Thumbnail from '../Thumbnail';

const initialValues = { content: '', mediaId: null };

type Props = {
  post: PostModel;
  onSuccess: (data: CommentModel) => void;
};

const CommentForm = ({ post, onSuccess }: Props) => {
  const { user } = useAuth();
  const [createComment] = useMutation(devcamp.createComment, {
    onSuccess,
  });
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          await createComment({
            postId: post.id,
            content: values.content,
            mediaId: values.mediaId,
          });
          actions.resetForm();
        } catch (err) {
          //
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
        <form className={classes.commentForm} onSubmit={handleSubmit}>
          <Thumbnail
            mediaId={user?.avatarId!}
            style={{ marginRight: '0.5rem' }}
            onClick={() => {
              if (user) {
                history.push(`/${user.username}`);
              }
            }}
            small
          />
          <div className={classes.commentFormContent}>
            <TextAreaField
              name="content"
              placeholder="Leave a comment"
              formControlStyles={{ marginBottom: '5px', flexGrow: 1 }}
              isTouched={false}
              disabled={isSubmitting}
              onEnterPress={handleSubmit}
              fitContent
            />

            <div className={classes.commentFormBtns}>
              {(values.content || values.mediaId) && (
                <Button
                  type="submit"
                  variant="light"
                  size="sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}

              <div
                className={classnames(classes.commentFormExtraBtn, {
                  [classes.commentFormExtraBtnsNoContent]: !values.content,
                })}
              >
                <UploadButton
                  disabled={isSubmitting}
                  onUploaded={(media) => {
                    setFieldValue('mediaId', media.id);
                  }}
                />
              </div>
            </div>
            <UploadPreview
              mediaId={values.mediaId}
              disabled={isSubmitting}
              onClear={() => {
                setFieldValue('mediaId', null);
              }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CommentForm;
