export const calculateLoan = async (cnpj, body) => {
  return fetch(`/v1/clients/${cnpj}/credits/calculate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const confirmLoan = async (cnpj, body) => {
  return fetch(`/v1/clients/${cnpj}/credits`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
