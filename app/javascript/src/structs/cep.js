import TextInput from "~/components/common/TextInput";
import { getNestedName } from "~/utils/formFunctions";
import { mask, unmask } from "~/utils/inputMask";

const CEP_SIZE = 8;
const CEP_MASK = "99999-999";

const isValid = (value) => value.length <= CEP_SIZE;

export const cepOnBlur = (value, event, dispatch) => {
  if (value.length != CEP_SIZE) return;

  const { parentName, index } = getNestedName(event.target.name);
  fetch(`https://viacep.com.br/ws/${value}/json/`)
    .then((resp) => resp.json())
    .then((data) => {
      const payloadData = {
        street: data.logradouro,
        city: data.localidade,
        state: data.uf,
      };
      dispatch({
        type: "updateValues",
        payload: { name: parentName, index: index, data: payloadData },
      });
    });
};

export const cepFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => mask(value, CEP_MASK),
  unmask: (value) => unmask(value),
  isValid: isValid,
};
