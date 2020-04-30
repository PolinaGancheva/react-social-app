import React from 'react';
import classes from './SignIn.module.css';
import { TextInputField } from 'Components/Generic';
import { SignInSchema } from './schema';
import Form from 'react-bootstrap/Form';
import AuthCard from '../AuthCard/AuthCard';
import { Formik } from 'formik';
import { useMutation, queryCache } from 'react-query';
import * as devcamp from 'api/devcamp';

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const [signIn, { error, reset }] = useMutation(devcamp.signIn, {
    onSuccess: (data) => {
      queryCache.setQueryData('me', data);
    },
  });

  return (
    <div className={classes.container}>
      <AuthCard
        title="Sign In"
        error={devcamp.extractErrorMsg(error)}
        onErrorClear={() => {
          reset();
        }}
      >
        <Formik<FormValues>
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            await signIn(values);
            actions.setSubmitting(false);
          }}
          validationSchema={SignInSchema}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form name="sigin" onSubmit={handleSubmit}>
              <TextInputField name="username" label="Username" />
              <TextInputField
                type="password"
                name="password"
                label="Password"
                autoComplete="new-password"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={classes.button}
              >
                {isSubmitting ? 'Submiting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
};

export default SignIn;
