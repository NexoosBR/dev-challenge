import TextInput from "~/components/common/TextInput";

export const textFormat = {
  action: "handleChange",
  Component: TextInput,
  mask: (value) => value,
  unmask: (value) => value,
  isValid: () => true,
  onBlur: () => {},
};
