import { cnpjOnBlur } from "~/structs/cnpj";

export const initialState = {
  cnpj: "",
  credit: "",
  interest: "",
  installments: "",
  company_name: "",
  loan_parcel: "",
};

export const fieldsState = {
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
      type: "money",
      name: "credit",
      placeholder: "Ex: R$: 1.000,00",
    },
  },
  company_name: {
    label: { title: "Razão Social" },
    input: {
      type: "text",
      name: "company_name",
      disabled: true,
    },
  },
  interest: {
    label: { title: "Taxa de Juros (%)" },
    input: {
      type: "percentage",
      name: "interest",
      placeholder: "Ex: 1.5% a.m.",
    },
  },
  installments: {
    label: { title: "Número de vezes" },
    input: {
      type: "text",
      name: "installments",
      placeholder: "Ex: 12x",
    },
  },
  loan_parcel: {
    label: { title: "Preço da parcela" },
    input: {
      type: "money",
      name: "loan_parcel",
      disabled: true,
    },
  },
};
