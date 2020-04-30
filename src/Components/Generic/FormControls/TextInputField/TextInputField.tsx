import React from 'react';
import { Field, FieldProps } from 'formik';
import TextInput from '../TextInput';
import { TextInputProps } from '../TextInput/TextInput';

type Props = FieldProps & TextInputProps;

const TextInputField = ({ field, form, ...rest }: Props) => {
  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      errorMessage={form.errors[field.name] as string}
      isTouched={!!form.touched[field.name]}
      {...rest}
    />
  );
};
const TextInputFieldWrapper = (props: TextInputProps) => {
  return <Field component={TextInputField} {...props} />;
};
export default TextInputFieldWrapper;
