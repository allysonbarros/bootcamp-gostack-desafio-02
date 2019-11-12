import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">
          Seu E-mail
          <Input type="email" name="email" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          Sua Senha
          <Input
            type="password"
            name="password"
            placeholder="Sua senha secreta"
          />
        </label>

        <button type="submit">Entrar no sistema</button>
        <Link to="/forgot-password">Esqueci minha Senha</Link>
      </Form>
    </>
  );
}
