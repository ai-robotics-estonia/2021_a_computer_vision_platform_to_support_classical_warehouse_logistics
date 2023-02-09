import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import AppFormGroup from '../../../components/AppFormGroup';
import LoginForm from '../../../types/form/LoginForm';

const defaultValues: LoginForm = {
  email: '',
  password: '',
};

interface PropsType {
  isInvalid?: boolean;
  isRegistered?: boolean;
  isNotActivated?: boolean;
  onSubmit?(data: LoginForm): void;
  onRegister?(): void;
}

export default function LoginModal({
  onSubmit = () => {},
  onRegister = () => {},
  isInvalid,
  isRegistered,
  isNotActivated,
}: PropsType) {
  const form = useForm<LoginForm>({ defaultValues });
  const { handleSubmit } = form;

  return (
    <Modal show>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRegistered && (
            <Alert variant="success">Account has been created</Alert>
          )}
          {isInvalid && (
            <Alert variant="danger">Invalid email or password</Alert>
          )}
          {isNotActivated && <Alert variant="danger">User not activated</Alert>}
          <AppFormGroup name="email" isRequired form={form} label="Email" />
          <AppFormGroup
            isRequired
            name="password"
            form={form}
            label="Password"
            type="password"
          />
          Do not have an account?{' '}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              onRegister();
            }}
          >
            Register
          </a>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button type="submit">Login</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
