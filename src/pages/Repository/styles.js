import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
}`;

export const Loading = styled.div`
  color: #eee;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 1.5s linear infinite;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 480px;
  }

  a {
    color: #7159c1;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  small {
    color: #555;
    margin-top: 5px;
  }
`;

export const IssuesList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #ddd;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #ddd;
    border-radius: 10px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #ddd;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #ddd;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600px;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #888;
    }
  }
`;

export const Button = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;

  button {
    background: #7159c1;
    border: 0;
    padding: 5px 15px;
    margin: 5px;
    border-radius: 4px;
    margin-bottom: 10px;

    justify-content: center;
    font-weight: bold;
    color: white;
  }
`;

export const PageController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 10px;
  button {
    background: #7159c1;
    padding: 2px 0px 0px 5px;
    margin: 10px;
    border-radius: 4px;
    border-width: 2px;
    border: 0;
  }
`;
