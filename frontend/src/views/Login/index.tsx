import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AuthService from '../../services/AuthService';
import LoginForm from '../../types/form/LoginForm';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import useTriggerArray from '../../hooks/useTriggerArray';

const TRIGGER = {
  REG: 'r',
  INVALID: 'inv',
  NOT_ACTIVE: 'na',
  EXISTS: 'ex',
};

export default function Login() {
  const [register, setRegister] = useState(false);
  const { values, handleTriggers, handleAllOff } = useTriggerArray([
    TRIGGER.REG,
    TRIGGER.INVALID,
    TRIGGER.NOT_ACTIVE,
    TRIGGER.EXISTS,
  ]);
  const { handleUser } = useContext(UserContext);

  const handleLogin = async (data: LoginForm) => {
    const user = await AuthService.login(data);
    if (user) {
      if (!user.isValidated) return handleTriggers([TRIGGER.NOT_ACTIVE]);
      handleAllOff();
      handleUser(user);
      return;
    }
    handleTriggers([TRIGGER.INVALID]);
  };

  const handleRegister = async (data: LoginForm) => {
    const user = await AuthService.register(data);
    if (!user) return handleTriggers([TRIGGER.EXISTS]);
    setRegister(false);
    handleTriggers([TRIGGER.REG]);
  };

  return (
    <>
      {!register && (
        <LoginModal
          isInvalid={values[TRIGGER.INVALID]}
          isRegistered={values[TRIGGER.REG]}
          isNotActivated={values[TRIGGER.NOT_ACTIVE]}
          onSubmit={handleLogin}
          onRegister={() => setRegister(true)}
        />
      )}
      {register && (
        <RegisterModal
          isExists={values[TRIGGER.EXISTS]}
          onSubmit={handleRegister}
          onLogin={() => setRegister(false)}
        />
      )}
    </>
  );
}
