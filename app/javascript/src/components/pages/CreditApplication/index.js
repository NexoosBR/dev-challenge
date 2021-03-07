import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/common/Button";
import { FormField, FormFieldProvider } from "~/components/common/FormField";
import { calculateLoan, confirmLoan } from "~/requests/credit";
import { unmask } from "~/utils/inputMask";
import { creditReducer, fieldsState, initialState } from "./state";

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

  const confirm = async () => {
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

    return `Razão Social: ${state.company_name}`;
  };

  const renderLoan = () => (
    <>
      <FormField {...fieldsState.loan_parcel} />
      <Button onClick={confirm}>Confirmar empréstimo</Button>
    </>
  );

  return (
    <div>
      <h1>Solicitação de crédito</h1>

      <FormFieldProvider value={{ state, dispatch }}>
        <form>
          <FormField {...fieldsState.cnpj} />
          <div>
            <p>
              {isClientNotFound ? renderClientNotFound() : renderClientFound()}
            </p>
            <br />
          </div>

          {state.company_name && (
            <>
              <FormField {...fieldsState.credit} />
              <FormField {...fieldsState.interest} />
              <FormField {...fieldsState.installments} />
              <Button onClick={priceQuote}>Solicitar Cotação</Button>
            </>
          )}
        </form>
        {isQuoted && renderLoan()}
        {message && message}
      </FormFieldProvider>

      <br />
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </div>
  );
};

export default CreditApplication;
