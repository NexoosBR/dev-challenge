import React from "react";
import { FormFieldContext } from "./context";

const FormFieldProvider = ({ value, children }) => {
  return (
    <FormFieldContext.Provider value={value}>
      {children}
    </FormFieldContext.Provider>
  );
};

export default FormFieldProvider;
