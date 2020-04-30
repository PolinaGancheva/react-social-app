import React from 'react';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> &
  FormControlProps & {
    label?: React.ReactNode;
    errorMessage?: string;
    isTouched?: boolean;
  };

const TextInput = ({
  type = 'text',
  name,
  label,
  placeholder,
  errorMessage,
  isTouched,
  value,
  ...rest
}: TextInputProps) => {
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <FormControl
        type={type}
        name={name}
        value={value ?? ''}
        placeholder={placeholder}
        className={
          isTouched && !errorMessage
            ? 'is-valid'
            : isTouched && !!errorMessage
            ? 'is-invalid'
            : undefined
        }
        {...rest}
      />
      {isTouched && errorMessage && (
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
      )}
    </Form.Group>
  );
};
export default TextInput;
