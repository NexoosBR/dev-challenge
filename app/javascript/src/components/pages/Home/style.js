import styled from "styled-components";
import { TitleStyled } from "~/styles";

export const Title = styled(TitleStyled)``;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  & > * {
    margin: 0 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  height: 200px;
  width: 300px;
  border: 1px solid #333333;
  border-radius: 10px;
  box-shadow: 0 0 10px #333333;

  &:hover {
    border: 1px solid rgb(81, 203, 238);
    box-shadow: 0 0 10px rgba(81, 203, 238, 1);
  }

  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
`;
