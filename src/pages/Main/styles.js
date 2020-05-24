import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: Helvetica, Arial, sans-serif;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Form = styled.form`
  font-size: 8px;
  margin-top: 35px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    font-size: 16px;
    border-style: solid;
    border-radius: 4px;
    border-width: ${(props) => (props.error ? '2px' : '1px')};
    border-color: ${(props) => (props.error ? 'red' : '#ddd')};
    ::placeholder {
      color: #aaa;
    }
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);

}`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  padding: 8px 8px 8px 16px;
  margin-left: 10px;
  border-radius: 4px;
  border-width: 2px;
  border: 0;

  justify-content: center;
  display: flex;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #ddd;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
