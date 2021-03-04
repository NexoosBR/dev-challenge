import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/common/Button";
import { FormField, FormFieldProvider } from "~/components/common/FormField";
import { cnpjOnBlur } from "~/structs/cnpj";
import { unmask } from "~/utils/inputMask";

const fieldsInitialState = {
  cnpj: {
    label: { title: "CNPJ" },
    input: {
      type: "cnpj",
      name: "cnpj",
      placeholder: "Ex: 00.000.000/0000-00",
      onBlur: cnpjOnBlur,
    },
  },
  credit: {
    label: { title: "Solicitação de Crédito" },
    input: {
      type: "text",
      name: "credit",
      placeholder: "Ex: R$: 1.000,00",
    },
  },
};

const initialState = {
  cnpj: "",
  company_name: "",
  credit: "",
};

const creditReducer = (state, action) => {
  switch (action.type) {
    case "handleChange":
      return handleChange(state, action.payload);
    case "updateValues":
      return { ...state, ...action.payload };
    default:
      console.error(`Action not found: ${action.type}`);
      return state;
  }
};

const handleChange = (state, { name, value }) => {
  return { ...state, [name]: value };
};

const CreditApplication = () => {
  const [state, dispatch] = useReducer(creditReducer, initialState);
  const [message, setMessage] = useState("");

  const isClientNotFound = state.company_name === null;

  const clientNotFound = () => (
    <p>
      Cliente não encontrado - <Link to="/cadastro">cadastrar um cliente</Link>
    </p>
  );

  const submit = async (e) => {
    e.preventDefault();

    const cnpj = unmask(state.cnpj);
    const resp = await fetch(`/v1/clients/${cnpj}/credits`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credit: { amount: state.credit } }),
    });
    if (resp.status !== 201)
      return setMessage("Não foi possível cadastrar, tente novamente");

    setMessage("Crédito aprovado!");
  };
  return (
    <div>
      <h1>Solicitação de crédito</h1>

      <FormFieldProvider value={{ state, dispatch }}>
        <form>
          <FormField {...fieldsInitialState.cnpj} />
          <div>
            Razão Social:{" "}
            {isClientNotFound ? clientNotFound() : state.company_name}
          </div>

          {state.company_name && (
            <>
              <FormField {...fieldsInitialState.credit} />
              <Button onClick={submit}>Solicitar Crédito</Button>
            </>
          )}
        </form>
        {message && message}
      </FormFieldProvider>
    </div>
  );
};

export default CreditApplication;
