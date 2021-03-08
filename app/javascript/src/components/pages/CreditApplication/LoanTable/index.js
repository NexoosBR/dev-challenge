import React from "react";
import { moneyMask } from "~/utils/inputMask";
import * as S from "./style";

const LoanTable = ({ installments }) => {
  const localizedDate = (date) =>
    new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return (
    <S.Table>
      <thead>
        <S.TR>
          <S.TH>Parcela</S.TH>
          <S.TH>Valor</S.TH>
          <S.TH>Situação</S.TH>
          <S.TH>Vencimento</S.TH>
        </S.TR>
      </thead>
      <S.TBody>
        {installments.map(({ amount, parcel, status, due_date }) => (
          <S.TR key={parcel}>
            <S.TD>{parcel}</S.TD>
            <S.TD>{moneyMask(String(amount))}</S.TD>
            <S.TD>{status}</S.TD>
            <S.TD>{localizedDate(due_date)}</S.TD>
          </S.TR>
        ))}
      </S.TBody>
    </S.Table>
  );
};

export default LoanTable;
