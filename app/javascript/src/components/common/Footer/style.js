import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 2rem 4rem;
  margin-top: 4rem;
  background-color: #cccccc;
`;
export const Credits = styled.p`
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
