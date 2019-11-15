import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { PasswordRecoveryRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(PasswordRecoveryRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">
          Seu E-mail
          <Input type="email" name="email" placeholder="exemplo@email.com" />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Recuperar a Senha'}
        </button>
        <Link to="/">Cancelar</Link>
      </Form>
    </>
  );
}
