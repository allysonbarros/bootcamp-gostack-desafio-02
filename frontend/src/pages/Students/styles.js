import styled from 'styled-components';

export const ActionBar = styled.div`
  display: flex;
`;

export const ActionTitle = styled.h1`
  flex: 1;
  color: #444;
  font-weight: bold;
  font-size: 24px;
`;

export const ActionButtons = styled.div`
  display: flex;

  a {
    height: 36px;
    display: flex;
    color: #fff;
    background: #ee4d64;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    justify-items: center;
    align-items: center;
    padding: 13px 16px;
    margin-right: 16px;
    text-transform: uppercase;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Search = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 0 10px;

  input {
    border: 0;
    background: #fff;
    color: #999;
    margin-left: 8px;

    &::placeholder {
      color: #999;
    }
  }
`;

export const Container = styled.div`
  min-height: 400px;
  margin-top: 20px;
  border-radius: 4px;
  background: #fff;
  padding: 25px;

  table {
    width: 100%;

    thead th {
      font-size: 16px;
      font-weight: bold;
      color: #444;
      text-transform: uppercase;
      text-align: left;
    }

    tbody tr td {
      color: #666;
      font-size: 16px;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
    }

    tbody td.center,
    thead th.center {
      text-align: center;
    }

    a.btn {
      font-size: 15px;
    }

    a.btn:not(:last-child) {
      margin-right: 20px;
    }

    a.btnEditar {
      color: #4d85ee;
    }

    a.btnApagar {
      color: #de3b3b;
    }
  }
`;
