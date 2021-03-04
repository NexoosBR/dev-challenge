import { cepOnBlur } from "~/structs/cep";

export const addPhoneField = (nesting) => ({
  label: { title: "Telefone" },
  input: {
    type: "phone",
    name: `phones${nesting}.phone`,
    placeholder: "Ex: (11) 00000-0000",
  },
});

export const addAddressField = (nesting) => ({
  cep: {
    label: { title: "CEP" },
    input: {
      type: "cep",
      name: `addresses${nesting}.cep`,
      placeholder: "Ex: 00000-000",
      onBlur: cepOnBlur,
    },
  },
  street: {
    label: { title: "Endereço" },
    input: {
      type: "text",
      name: `addresses${nesting}.street`,
      placeholder: "Ex: Avenida Paulista",
      disabled: true,
    },
  },
  state: {
    label: { title: "Estado" },
    input: {
      type: "text",
      name: `addresses${nesting}.state`,
      placeholder: "Ex: SP",
      disabled: true,
    },
  },
  city: {
    label: { title: "Cidade" },
    input: {
      type: "text",
      name: `addresses${nesting}.city`,
      placeholder: "Ex: São Paulo",
      disabled: true,
    },
  },
  number: {
    label: { title: "Número" },
    input: {
      type: "text",
      name: `addresses${nesting}.number`,
      placeholder: "Ex: 00",
    },
  },
  complement: {
    label: { title: "Complemento" },
    input: {
      type: "text",
      name: `addresses${nesting}.complement`,
      placeholder: "Ex: Casa 2",
    },
  },
});

export const formFieldsInitialState = {
  company_name: {
    label: { title: "Razão Social" },
    input: {
      type: "text",
      name: "company_name",
      placeholder: "Ex: Empresa Fictícia",
    },
  },

  cnpj: {
    label: { title: "CNPJ" },
    input: {
      type: "cnpj",
      name: "cnpj",
      placeholder: "Ex: 00.000.000/0000-00",
    },
  },

  addresses: [addAddressField(1)],
  phones: [addPhoneField(1)],
};
