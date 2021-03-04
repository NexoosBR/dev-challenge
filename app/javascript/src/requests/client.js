import { unmask } from "~/utils/inputMask";

const serializeClient = (data) => ({
  client: {
    name: data.company_name,
    cnpj: unmask(data.cnpj),
    phones: data.phones.map(({ phone }) => unmask(phone)),
    addresses_attributes: data.addresses.map((address) => ({
      cep: unmask(address.cep),
      city: address.city,
      state: address.state,
      street: address.street,
      number: address.number,
      complement: address.complement,
    })),
  },
});

export const createClient = (state) => {
  const data = serializeClient(state);
  return fetch("/v1/clients", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
