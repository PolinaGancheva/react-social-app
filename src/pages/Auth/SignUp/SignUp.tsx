import React from 'react';
import classes from './SignUp.module.css';
import { Formik } from 'formik';
import { SignUpSchema } from './schema';
import { TextInputField } from 'Components/Generic';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import AuthCard from '../AuthCard';
import { useMutation, queryCache } from 'react-query';
import * as devcamp from 'api/devcamp';

type FormValues = {
  name: string;
  username: string;
  password: string;
};

const SignUp = () => {
  const [signUp, { error, reset }] = useMutation(devcamp.signUp, {
    onSuccess: (data) => {
      queryCache.setQueryData('me', data);
    },
  });

  return (
    <div className={classes.container}>
      <AuthCard
        title="Sign Up"
        error={devcamp.extractErrorMsg(error)}
        onErrorClear={() => {
          reset();
        }}
      >
        <Formik<FormValues>
          initialValues={{
            name: '',
            username: '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            await signUp(values);
            actions.setSubmitting(false);
          }}
          validationSchema={SignUpSchema}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form name="sign up" onSubmit={handleSubmit}>
              <TextInputField name="name" label="Full Name" />
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
              <Form.Text>
                Already have an account? <Link to="/signin">Sign in</Link>
              </Form.Text>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
};

export default SignUp;
