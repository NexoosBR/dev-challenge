import TextInput from "~/components/common/TextInput";
import { mask, unmask } from "~/utils/inputMask";

const CNPJ_SIZE = 14;
const CNPJ_MASK = "99.999.999/9999-99";

const isValid = (value) => value.length <= CNPJ_SIZE;

export const cnpjFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => mask(value, CNPJ_MASK),
  unmask: (value) => unmask(value),
  isValid: isValid,
  onBlur: (_value, _event, _dispatch) => {},
};
