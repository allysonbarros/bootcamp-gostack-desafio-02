import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-horizontal.svg';
import { Container, Divider } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

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
        <button type="button">sair do sistema</button>
      </aside>
    </Container>
  );
}
