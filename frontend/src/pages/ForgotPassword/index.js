import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function ForgotPassword() {
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

        <button type="submit">Recuperar a Senha</button>
        <Link to="/">Cancelar</Link>
      </Form>
    </>
  );
}
