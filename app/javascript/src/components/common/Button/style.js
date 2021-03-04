import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.3em 0.3em 0;
  border: 0;
  border-radius: 2em;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #4eb5f1;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #ffffff;
  }
  :hover {
    background-color: #4095c6;
  }

  ${({ type }) =>
    type === "cancel" &&
    css`
      background-color: #ff3333;
      :hover {
        background-color: #ce2727;
      }
    `}
`;
