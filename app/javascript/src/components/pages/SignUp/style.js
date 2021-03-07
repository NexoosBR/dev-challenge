import styled from "styled-components";
import { TitleStyled } from "~/styles";

export const Container = styled.div`
  background-color: white;
  padding: 1em 2em;
  margin: 1rem 0;
  border-radius: 4px;
`;

export const Title = styled(TitleStyled)``;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;

  & > * + * {
    margin-top: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 1rem;
  border-radius: 10px;

  button {
    align-self: center;
    margin: 1rem;
  }

  & > * + * {
    margin-top: 16px;
  }
`;

export const Ruler = styled.div`
  border-top: 1px solid black;
`;
