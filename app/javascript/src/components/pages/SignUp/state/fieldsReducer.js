import { addAddressField, addPhoneField } from "./fieldsState";

export const fieldsReducer = (state, action) => {
  switch (action.type) {
    case "addAddress":
      return addAddress(state);
    case "addPhone":
      return addPhone(state);
    case "removeAddress":
      return removeAddress(state, action.payload);
    case "removePhone":
      return removePhone(state, action.payload);
    default:
      console.error(`Action not found: ${action.type}`);
      return state;
  }
};

const addAddress = (state) => {
  const name = [...state.addresses].pop().cep.input.name;
  const [_, index] = name.match(/^.*?(\d*)\D*$/);
  const nextAddress = Number(index) + 1;
  const newAddresses = [...state.addresses, addAddressField(nextAddress)];
  return { ...state, addresses: newAddresses };
};

const addPhone = (state) => {
  const name = [...state.phones].pop().input.name;
  const [_, index] = name.match(/^.*?(\d*)\D*$/);
  const nextPhone = Number(index) + 1;
  const newPhones = [...state.phones, addPhoneField(nextPhone)];
  return { ...state, phones: newPhones };
};

const removeAddress = (state, { name }) => {
  const newAddresses = state.addresses.filter(
    (address) => address.cep.input.name !== name
  );
  return { ...state, addresses: newAddresses };
};

const removePhone = (state, { name }) => {
  const newPhones = state.phones.filter((phone) => phone.input.name !== name);
  return { ...state, phones: newPhones };
};
