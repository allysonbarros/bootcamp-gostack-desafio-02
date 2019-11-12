import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form onSubmit={handleSubmit}>
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
