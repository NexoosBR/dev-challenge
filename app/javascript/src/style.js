import styled from "styled-components";

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  min-height: 80vh;

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;
