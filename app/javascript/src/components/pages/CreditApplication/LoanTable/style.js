import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid #333333;
`;

export const TBody = styled.tbody`
  tr:nth-child(2n) {
    background-color: #eeeeee;
  }
`;

export const TR = styled.tr``;

export const TH = styled.th`
  font-weight: bolder;
  background-color: #dddddd;
  padding: 1rem;
`;

export const TD = styled.td`
  padding: 0.5rem;
  border: 1px solid #999;
`;
