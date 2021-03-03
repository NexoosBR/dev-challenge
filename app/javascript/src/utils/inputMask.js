const NUMBER_MASK_PLACEHOLDER = "9";

const insertAt = (str, insertedStr, pos) =>
  [str.slice(0, pos), insertedStr, str.slice(pos)].join("");

export const mask = (value, mask) => {
  let maskedValue = value;

  mask.split("").forEach((char, index) => {
    if (index >= maskedValue.length) return;

    if (char !== NUMBER_MASK_PLACEHOLDER)
      maskedValue = insertAt(maskedValue, char, index);
  });

  return maskedValue;
};

export const unmask = (value) => value.replace(/[^\d]/g, "");
