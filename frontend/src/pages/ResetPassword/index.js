import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve possuir no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .required('A confirmação da senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas informadas não conferem'),
});

export default function ResetPassword() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="password">
          Nova Senha
          <Input
            type="password"
            name="password"
            placeholder="Sua senha secreta"
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirmação da Nova Senha
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Sua senha secreta"
          />
        </label>

        <button type="submit">Redefinir a Senha</button>
        <Link to="/">Cancelar</Link>
      </Form>
    </>
  );
}
