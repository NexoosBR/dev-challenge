import React, { useReducer, useState } from "react";
import Address from "./Address";
import FormField from "./FormField";
import {
  SignUpContext,
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

  const postForm = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <SignUpContext.Provider value={{ state, dispatch }}>
      <h1>Cadastro</h1>

      <form>
        <FormField {...fields.company_name} />

        <FormField {...fields.cnpj} />

        {fields.addresses.map((address, index) => (
          <React.Fragment key={address.cep.input.name}>
            <Address {...address} />
            {index > 0 && (
              <button onClick={(e) => removeAddress(e, address.cep.input.name)}>
                Remover Endereço
              </button>
            )}
          </React.Fragment>
        ))}
        <button onClick={addAddress}>Adicionar Endereço</button>

        {fields.phones.map((phone, index) => (
          <React.Fragment key={phone.input.name}>
            <FormField {...phone} />
            {index > 0 && (
              <button onClick={(e) => removePhone(e, phone.input.name)}>
                Remover Telefone
              </button>
            )}
          </React.Fragment>
        ))}

        <button onClick={addPhone}>Adicionar Telefone</button>
        <button onClick={postForm}>Cadastrar</button>
      </form>
    </SignUpContext.Provider>
  );
};

export default SignUp;
