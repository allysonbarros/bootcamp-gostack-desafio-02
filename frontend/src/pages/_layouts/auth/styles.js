import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;
      color: #444;
    }

    span {
      font-size: 12px;
      margin-top: 10px;
      color: #ee4d64;
    }

    input {
      height: 45px;
      padding: 16px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 10px;
      font-size: 16px;
      color: #999;

      &::placeholder {
        color: #999;
      }
    }

    button {
      height: 45px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: #ee4d64;
      border: 0;
      border-radius: 4px;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }

    a {
      color: #999;
      margin-top: 20px;
      font-size: 14px;
      font-weight: bold;

      &:hover {
        color: #666;
      }
    }
  }
`;
