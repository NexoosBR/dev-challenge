import TextInput from "~/components/common/TextInput";
import { floatMask, unmask } from "~/utils/inputMask";

export const percentageFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => floatMask(value),
  unmask: (value) => unmask(value),
  isValid: () => true,
};
