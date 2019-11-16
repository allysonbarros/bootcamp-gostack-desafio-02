import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background: #fff;
  border: 1px solid #dddddd;
  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img.logo {
    height: 24px;
  }

  nav {
    display: flex;
    align-items: center;
    flex: 1;

    a {
      color: #999;
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;

      &.active {
        color: #444;
      }

      &:hover {
        color: #666;
      }
    }

    & > a {
      margin-right: 25px;
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 14px;
      color: #444;
      font-weight: bold;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: #ddd;
  margin: 0 30px;
`;
