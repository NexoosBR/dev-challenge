import TextInput from "~/components/common/TextInput";
import { moneyMask, unmask } from "~/utils/inputMask";

export const moneyFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => moneyMask(value),
  unmask: (value) => unmask(value),
  isValid: () => true,
};
