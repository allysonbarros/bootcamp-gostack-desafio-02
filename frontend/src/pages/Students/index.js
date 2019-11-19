import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import {
  ActionBar,
  ActionTitle,
  ActionButtons,
  Search,
  Container,
} from './styles';

export default function Students() {
  return (
    <>
      <ActionBar>
        <ActionTitle>Gerenciando alunos</ActionTitle>
        <ActionButtons>
          <a href="#">
            <MdAdd size={22} color="#FFF" />
            CADASTRAR
          </a>
          <Search>
            <MdSearch size={16} color="#999" />
            <input type="text" placeholder="Buscar aluno" />
          </Search>
        </ActionButtons>
      </ActionBar>
      <Container>
        <table>
          <thead>
            <tr>
              <th width="35%">Nome</th>
              <th width="35%">E-mail</th>
              <th width="20%" class="center">
                Idade
              </th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td class="center">20</td>
              <td>
                <a href="#" className="btn btnEditar">
                  editar
                </a>
                <a href="#" className="btn btnApagar">
                  apagar
                </a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td class="center">20</td>
              <td></td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td class="center">20</td>
              <td></td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td class="center">20</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
