const NEST_SEPARATOR = ".";
const PARTITION_REGEX = /([a-z]*)(\d*)/;

export const getNestedName = (name) => {
  const nameNotNested = !name.includes(".");
  if (nameNotNested) return name;

  const [nameWithPosition, nestedName] = name.split(NEST_SEPARATOR);
  const [_, parentName, position] = nameWithPosition.match(PARTITION_REGEX);
  const index = Number(position) - 1;
  return { parentName, index, nestedName };
};

export const getNestedValue = (state, name) => {
  const nameNotNested = !name.includes(".");
  if (nameNotNested) return state[name];

  const [nameWithPosition, nestedName] = name.split(".");
  const [_, parentName, id] = nameWithPosition.match(/([a-z]*)(\d*)/);
  const nested = state[parentName].find((child) => child.id === Number(id));
  return nested[nestedName];
};
