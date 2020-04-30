import React from 'react';
import { Field, FieldProps } from 'formik';
import TextArea, { TextAreaProps } from '../TextArea/TextArea';

type Props = FieldProps & TextAreaProps;

const TextAreaField = ({
  field,
  form,
  isTouched,
  errorMessage,
  ...rest
}: Props) => {
  return (
    <TextArea
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      errorMessage={errorMessage ?? (form.errors[field.name] as string)}
      isTouched={isTouched ?? !!form.touched[field.name]}
      {...rest}
    />
  );
};
const TextAreaWrapper = (props: TextAreaProps) => {
  return <Field component={TextAreaField} {...props} />;
};
export default TextAreaWrapper;
