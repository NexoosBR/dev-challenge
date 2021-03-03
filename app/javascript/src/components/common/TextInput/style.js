import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  outline: 0;
  transition: all 0.15s ease-in-out;
  border: 1px solid #dddddd;

  &:focus,
  &:hover {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }

  &:disabled {
    box-shadow: 0 0;
    border: 1px solid #dddddd;
  }
`;
