import TextInput from "~/components/common/TextInput";
import { mask, unmask } from "~/utils/inputMask";

const PHONE_SIZE = 11;
const PHONE_MASK = "(99) 99999-9999";

const isValid = (value) => value.length <= PHONE_SIZE;

export const phoneFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => mask(value, PHONE_MASK),
  unmask: (value) => unmask(value),
  isValid: isValid,
};
