import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/common/Button";
import { createClient } from "~/requests/client";
import Address from "./Address";
import { FormFieldProvider, FormField } from "~/components/common/FormField";
import {
  signUpReducer,
  fieldsReducer,
  initialSignUpState,
  formFieldsInitialState,
} from "./state";

const SignUp = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialSignUpState);
  const [fields, dispatchFields] = useReducer(
    fieldsReducer,
    formFieldsInitialState
  );
  const [message, setMessage] = useState("");

  const addAddress = (e) => {
    e.preventDefault();
    dispatch({ type: "addAddress" });
    dispatchFields({ type: "addAddress" });
  };

  const removeAddress = (e, name) => {
    e.preventDefault();
    const [_, index] = name.match(/^.*?(\d*)\D*$/);
    dispatch({ type: "removeAddress", payload: { id: Number(index) } });
    dispatchFields({ type: "removeAddress", payload: { name: name } });
  };

  const addPhone = (e) => {
    e.preventDefault();
    dispatch({ type: "addPhone" });
    dispatchFields({ type: "addPhone" });
  };

  const removePhone = (e, name) => {
    e.preventDefault();
    const [_, index] = name.match(/^.*?(\d*)\D*$/);
    dispatch({ type: "removePhone", payload: { id: Number(index) } });
    dispatchFields({ type: "removePhone", payload: { name: name } });
  };

  const postForm = async (e) => {
    e.preventDefault();
    const resp = await createClient(state);
    resp.status === 201 ? setMessage("success") : setMessage("error");
  };

  return (
    <FormFieldProvider value={{ state, dispatch }}>
      <h1>Cadastro</h1>

      <form>
        <FormField {...fields.company_name} />

        <FormField {...fields.cnpj} />

        {fields.addresses.map((address, index) => (
          <div key={address.cep.input.name}>
            <Address {...address} />
            {index > 0 && (
              <Button
                type="cancel"
                onClick={(e) => removeAddress(e, address.cep.input.name)}
              >
                Remover Endereço
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addAddress}>Adicionar Outro Endereço</Button>

        {fields.phones.map((phone, index) => (
          <div key={phone.input.name}>
            <FormField {...phone} />
            {index > 0 && (
              <Button
                type="cancel"
                onClick={(e) => removePhone(e, phone.input.name)}
              >
                Remover Telefone
              </Button>
            )}
          </div>
        ))}

        <Button onClick={addPhone}>Adicionar Outro Telefone</Button>
        <br />
        <Link to="/">
          <Button>Voltar</Button>
        </Link>
        <Button onClick={postForm}>Cadastrar</Button>
      </form>
      {message === "success" && "Participante cadastrado com sucesso"}
      {message === "error" && "Ocorreu um erro, tente novamente"}
    </FormFieldProvider>
  );
};

export default SignUp;
