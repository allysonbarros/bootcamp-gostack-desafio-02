import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-horizontal.svg';
import { Container, Divider } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <img className="logo" src={logo} alt="GymPoint" />

      <Divider />

      <nav>
        <Link className="active" to="/students">
          Alunos
        </Link>

        <Link to="/plans">Planos</Link>

        <Link to="/registrations">Matrículas</Link>

        <Link to="/help-orders">Pedidos de Auxílio</Link>
      </nav>

      <aside>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
