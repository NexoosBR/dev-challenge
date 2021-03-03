export const signUpReducer = (state, action) => {
  switch (action.type) {
    case "handleChange":
      return handleChange(state, action.payload);
    case "updateValues":
      return updateValues(state, action.payload);
    case "addAddress":
      return addAddress(state);
    case "addPhone":
      return addPhone(state);
    case "removePhone":
      return removePhone(state, action.payload);
    case "removeAddress":
      return removeAddress(state, action.payload);
    default:
      console.error(`Action not found: ${action.type}`);
      return state;
  }
};

const handleChange = (state, { name, value }) => {
  const nameIsNested = name.includes(".");
  if (nameIsNested) {
    const [nameWithPosition, nestedName] = name.split(".");
    const [_, parentName, position] = nameWithPosition.match(/([a-z]*)(\d*)/);
    const nestedIndex = Number(position) - 1;

    const updatedNested = state[parentName].map((attribute, index) => {
      return index === nestedIndex
        ? { ...attribute, [nestedName]: value }
        : attribute;
    });

    return { ...state, [parentName]: updatedNested };
  } else {
    return { ...state, [name]: value };
  }
};

const updateValues = (state, { name, index, data }) => {
  const updatedNested = state[name].map((attribute, idx) =>
    idx === index ? { ...attribute, ...data } : attribute
  );
  return { ...state, [name]: updatedNested };
};

const addAddress = (state) => {
  const addressIds = state.addresses.map(({ id }) => id);
  const maxId = Math.max(...addressIds);

  return {
    ...state,
    addresses: [
      ...state.addresses,
      {
        id: maxId + 1,
        cep: "",
        street: "",
        state: "",
        city: "",
        number: "",
        complement: "",
      },
    ],
  };
};

const addPhone = (state) => {
  const phoneIds = state.phones.map(({ id }) => id);
  const maxId = Math.max(...phoneIds);

  return { ...state, phones: [...state.phones, { id: maxId + 1, phone: "" }] };
};

const removeAddress = (state, { id }) => {
  const newAddresses = state.addresses.filter((address) => address.id !== id);

  return { ...state, addresses: newAddresses };
};

const removePhone = (state, { id }) => {
  const newPhones = state.phones.filter((phone) => phone.id !== id);

  return { ...state, phones: newPhones };
};
