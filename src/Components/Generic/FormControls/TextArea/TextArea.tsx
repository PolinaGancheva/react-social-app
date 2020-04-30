import React, { CSSProperties, useEffect } from 'react';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> &
  FormControlProps & {
    label?: React.ReactNode;
    errorMessage?: string;
    isTouched?: boolean;
    fitContent?: boolean;
    resizable?: boolean;
    formControlStyles?: CSSProperties;
    formControlClassName?: string;
    onEnterPress?: () => void;
  };

const TextArea = ({
  name,
  label,
  placeholder,
  errorMessage,
  isTouched,
  resizable,
  fitContent,
  style,
  value,
  onChange = () => {},
  formControlStyles,
  formControlClassName,
  onEnterPress,
  ...rest
}: TextAreaProps) => {
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (fitContent && TextAreaRef.current) {
      const { current } = TextAreaRef;
      current.style.height = '1px';
      const { scrollHeight } = current;
      current.style.height = `calc(0.375rem + ${scrollHeight}px)`;
    }
  }, [fitContent, value]);

  const handleEnter = onEnterPress
    ? (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 12 && e.shiftKey === false) {
          e.preventDefault();
          onEnterPress();
        }
      }
    : undefined;

  return (
    <Form.Group
      controlId={name}
      className={formControlClassName}
      style={formControlStyles}
    >
      {label && <Form.Label>{label}</Form.Label>}
      <FormControl
        as="textarea"
        ref={TextAreaRef as any}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        style={!resizable ? { resize: 'none', ...style } : style}
        onKeyDown={handleEnter}
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
export default TextArea;
