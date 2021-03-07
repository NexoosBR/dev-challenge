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
import * as S from "./style";

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

  const renderAddress = (address, index) => {
    const key = address.cep.input.name;

    return (
      <S.FormGroup key={key}>
        {index === 0 ? (
          <>
            <S.Subtitle>Endereço</S.Subtitle>
            <Address {...address} />
          </>
        ) : (
          <>
            <Address {...address} />
            <Button type="cancel" onClick={(e) => removeAddress(e, key)}>
              Remover Endereço
            </Button>
          </>
        )}
      </S.FormGroup>
    );
  };

  const renderPhone = (phone, index) => {
    const key = phone.input.name;

    return (
      <S.FormGroup key={key}>
        {index === 0 ? (
          <>
            <S.Subtitle>Contato</S.Subtitle>
            <FormField {...phone} />
          </>
        ) : (
          <>
            <FormField {...phone} />
            <Button type="cancel" onClick={(e) => removePhone(e, key)}>
              Remover Telefone
            </Button>
          </>
        )}
      </S.FormGroup>
    );
  };

  return (
    <FormFieldProvider value={{ state, dispatch }}>
      <S.Container>
        <S.Title>Cadastro</S.Title>

        <S.Form>
          <S.FormGroup>
            <S.Subtitle>Empresa</S.Subtitle>
            <FormField {...fields.company_name} />
            <FormField {...fields.cnpj} />
          </S.FormGroup>

          {fields.addresses.map(renderAddress)}
          <Button onClick={addAddress}>Adicionar Outro Endereço</Button>

          {fields.phones.map(renderPhone)}
          <Button onClick={addPhone}>Adicionar Outro Telefone</Button>

          <Button onClick={postForm} type="accept">
            Cadastrar
          </Button>
        </S.Form>
        {message === "success" && "Participante cadastrado com sucesso"}
        {message === "error" && "Ocorreu um erro, tente novamente"}
      </S.Container>
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </FormFieldProvider>
  );
};

export default SignUp;
