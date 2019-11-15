import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { ResetPasswordRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve possuir no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .required('A confirmação da senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas informadas não conferem'),
});

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ password, confirmPassword }) {
    dispatch(ResetPasswordRequest(token, password, confirmPassword));
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

        <button type="submit">
          {loading ? 'Carregando...' : 'Redefinir a Senha'}
        </button>
        <Link to="/">Cancelar</Link>
      </Form>
    </>
  );
}
