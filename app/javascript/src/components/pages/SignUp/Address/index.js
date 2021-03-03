import React from "react";
import FormField from "../FormField";

const Address = ({ cep, street, state, city, number, complement }) => {
  return (
    <>
      <FormField {...cep} />
      <FormField {...street} />
      <FormField {...state} />
      <FormField {...city} />
      <FormField {...number} />
      <FormField {...complement} />
    </>
  );
};

export default Address;
