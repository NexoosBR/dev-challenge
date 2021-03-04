import React, { useContext } from "react";
import PropTypes from "prop-types";
import Label from "~/components/common/Label";
import { cepFormat } from "~/structs/cep";
import { phoneFormat } from "~/structs/phone";
import { textFormat } from "~/structs/text";
import { getNestedValue } from "~/utils/formFunctions";
import { cnpjFormat } from "~/structs/cnpj";
import { FormFieldContext } from "./context";

const formats = {
  text: textFormat,
  cep: cepFormat,
  cnpj: cnpjFormat,
  phone: phoneFormat,
};

const FormField = ({ label, input }) => {
  const { state, dispatch } = useContext(FormFieldContext);

  const { action, mask, unmask, isValid, Component, onBlur } = formats[
    input.type
  ];

  const handleChange = (event) => {
    const payload = event.target;

    const rawValue = unmask(payload.value);
    if (!isValid(rawValue)) return;
    payload.value = mask(rawValue);

    dispatch({ type: action, payload });
  };

  const handleBlur = (event) => {
    const rawValue = unmask(event.target.value);

    onBlur(rawValue, event, dispatch);
  };

  const { name } = input;

  return (
    <Label htmlFor={name} title={label.title}>
      <Component
        name={name}
        value={getNestedValue(state, name)}
        placeholder={input.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={input.disabled}
      />
    </Label>
  );
};

export default FormField;

FormField.defaultProps = {
  validations: [],
};

FormField.propTypes = {
  label: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    className: PropTypes.string,
  }),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    innerLabel: PropTypes.string,
    type: PropTypes.oneOf(["text", "cep", "phone", "cnpj"]),
    maxLength: PropTypes.number,
  }),
  validations: PropTypes.array,
};
