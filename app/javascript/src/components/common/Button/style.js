import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  width: fit-content;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #ffffff;
  }

  background-color: ${({ theme }) => theme.colors.primary};
  :hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  ${({ type }) => {
    if (type === "cancel") return cancelType;
    if (type === "accept") return acceptType;
  }}
`;

const cancelType = css`
  background-color: ${({ theme }) => theme.colors.alert};
  :hover {
    background-color: ${({ theme }) => theme.colors.alertDark};
  }
`;

const acceptType = css`
  background-color: ${({ theme }) => theme.colors.success};
  :hover {
    background-color: ${({ theme }) => theme.colors.successDark};
  }
`;
