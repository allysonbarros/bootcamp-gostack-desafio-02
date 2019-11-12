import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <label htmlFor="email">
          Seu E-mail
          <input type="email" name="email" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          Sua Senha
          <input
            type="password"
            name="password"
            placeholder="Sua senha secreta"
          />
        </label>

        <button type="submit">Entrar no sistema</button>
        <Link to="/forgot-password">Esqueci minha Senha</Link>
      </form>
    </>
  );
}
