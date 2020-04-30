import React from 'react';
import classes from './AuthCrad.module.css';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

type Props = {
  title: string;
  children: React.ReactNode;
  error: string | null;
  onErrorClear: () => void;
};
const AuthCard: React.FC<Props> = ({
  title,
  children,
  error,
  onErrorClear,
}: Props) => {
  return (
    <Card className={classes.container}>
      <Card.Body>
        <h3 className={classes.title}>{title}</h3>
        {error && (
          <Alert variant="danger" onClose={onErrorClear} dismissible>
            {error}
          </Alert>
        )}
        {children}
      </Card.Body>
    </Card>
  );
};
export default AuthCard;
