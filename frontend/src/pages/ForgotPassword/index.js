import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import {} from './styles';

export default function ForgotPassword() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <label htmlFor="email">
          Seu E-mail
          <input type="email" name="email" placeholder="exemplo@email.com" />
        </label>

        <button type="submit">Recuperar a Senha</button>
        <Link to="/">Cancelar</Link>
      </form>
    </>
  );
}
