import TextInput from "~/components/common/TextInput";
import { mask, unmask } from "~/utils/inputMask";

const CNPJ_SIZE = 14;
const CNPJ_MASK = "99.999.999/9999-99";

export const cnpjOnBlur = async (value, _event, dispatch) => {
  const resp = await fetch(`/v1/clients/${value}`);
  if (resp.status !== 200) {
    const payload = { company_name: null };
    return dispatch({ type: "updateValues", payload });
  }

  const data = await resp.json();
  const payload = { company_name: data.name };
  dispatch({ type: "updateValues", payload });
};

const isValid = (value) => value.length <= CNPJ_SIZE;

export const cnpjFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => mask(value, CNPJ_MASK),
  unmask: (value) => unmask(value),
  isValid: isValid,
};
