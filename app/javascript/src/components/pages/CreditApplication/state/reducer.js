export const creditReducer = (state, action) => {
  switch (action.type) {
    case "handleChange":
      return handleChange(state, action.payload);
    case "updateValues":
      return { ...state, ...action.payload };
    default:
      console.error(`Action not found: ${action.type}`);
      return state;
  }
};

const handleChange = (state, { name, value }) => {
  return { ...state, [name]: value };
};
