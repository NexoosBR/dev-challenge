import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/common/Button";
import { FormField, FormFieldProvider } from "~/components/common/FormField";
import { calculateLoan, confirmLoan } from "~/requests/credit";
import { unmask } from "~/utils/inputMask";
import { creditReducer, fieldsState, initialState } from "./state";

import * as S from "./style";

const CreditApplication = () => {
  const [state, dispatch] = useReducer(creditReducer, initialState);
  const [message, setMessage] = useState("");
  const [isQuoted, setIsQuoted] = useState(false);

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
      payload: { name: "loan_parcel", value: data.parcel_amount },
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

    if (resp.status !== 201)
      return setMessage("Algo deu errado, tente novamente");

    setMessage("Empréstimo confirmado!");
  };

  const renderClientNotFound = () => (
    <>
      Cliente não encontrado - <Link to="/cadastro">cadastrar um cliente</Link>
    </>
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
              <p>
                {isClientNotFound
                  ? renderClientNotFound()
                  : renderClientFound()}
              </p>
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
          {message && message}
        </FormFieldProvider>

        <br />
      </S.Container>
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </>
  );
};

export default CreditApplication;
