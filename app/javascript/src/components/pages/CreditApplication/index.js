import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/common/Button";
import { FormField, FormFieldProvider } from "~/components/common/FormField";
import { calculateLoan, confirmLoan } from "~/requests/credit";
import { moneyMask, unmask } from "~/utils/inputMask";
import LoanTable from "./LoanTable";
import {
  creditReducer,
  fieldsState,
  initialState,
  loanInitialState,
} from "./state";

import * as S from "./style";

const CreditApplication = () => {
  const [state, dispatch] = useReducer(creditReducer, initialState);
  const [isQuoted, setIsQuoted] = useState(false);
  const [loan, setLoan] = useState(loanInitialState);

  const isClientNotFound = state.company_name === null;

  const priceQuote = async (e) => {
    e.preventDefault();

    const cnpj = unmask(state.cnpj);

    const payload = {
      credit: {
        amount: unmask(state.credit),
        interest: state.interest,
        installments: state.installments,
      },
    };

    const resp = await calculateLoan(cnpj, payload);
    const data = await resp.json();
    dispatch({
      type: "handleChange",
      payload: {
        name: "loan_parcel",
        value: moneyMask(String(data.parcel_amount)),
      },
    });
    setIsQuoted(true);
  };

  const confirm = async (e) => {
    e.preventDefault();

    const cnpj = unmask(state.cnpj);
    const payload = {
      credit: {
        amount: unmask(state.credit),
        interest: state.interest,
        installments: state.installments,
      },
    };
    const resp = await confirmLoan(cnpj, payload);
    const data = await resp.json();
    setLoan({ ...data, isLoaded: true });
  };

  const renderClientNotFound = () => (
    <p>
      Cliente não encontrado - <Link to="/cadastro">cadastrar um cliente</Link>
    </p>
  );

  const renderClientFound = () => {
    if (!state.company_name) return "";

    return <FormField {...fieldsState.company_name} />;
  };

  return (
    <>
      <S.Container>
        <S.Title>Solicitação de crédito</S.Title>

        <FormFieldProvider value={{ state, dispatch }}>
          <S.Form>
            <S.FormGroup>
              <S.Subtitle>Empresa</S.Subtitle>

              <FormField {...fieldsState.cnpj} />
              {isClientNotFound ? renderClientNotFound() : renderClientFound()}
            </S.FormGroup>

            {state.company_name && (
              <S.FormGroup>
                <S.Subtitle>Simular Empréstimo</S.Subtitle>

                <FormField {...fieldsState.credit} />
                <FormField {...fieldsState.interest} />
                <FormField {...fieldsState.installments} />
                {isQuoted && <FormField {...fieldsState.loan_parcel} />}
                <Button onClick={priceQuote}>Solicitar Cotação</Button>
                {isQuoted && (
                  <Button onClick={confirm}>Confirmar empréstimo</Button>
                )}
              </S.FormGroup>
            )}
          </S.Form>
          {loan.isLoaded && <LoanTable installments={loan.installments} />}
        </FormFieldProvider>

        <br />
      </S.Container>
      <Link to="/">
        <Button type="secondary">Voltar</Button>
      </Link>
    </>
  );
};

export default CreditApplication;
