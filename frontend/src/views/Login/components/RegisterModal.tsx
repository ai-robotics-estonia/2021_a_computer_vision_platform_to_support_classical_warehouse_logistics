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
  onSubmit?(data: LoginForm): void;
  onLogin?(): void;
  isExists?: boolean;
}

export default function RegisterModal({
  onSubmit = () => {},
  onLogin = () => {},
  isExists,
}: PropsType) {
  const form = useForm<LoginForm>({ defaultValues });
  const { handleSubmit } = form;

  return (
    <Modal show>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isExists && <Alert variant="danger">User already exists</Alert>}
          <AppFormGroup name="email" isRequired form={form} label="Email" />
          <AppFormGroup
            isRequired
            name="password"
            form={form}
            label="Password"
            type="password"
          />
          Have an account?{' '}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              onLogin();
            }}
          >
            Login
          </a>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
