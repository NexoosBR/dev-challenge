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

const RIGHT_TO_LEFT_GROUP_BY_THREE = /(?=(?:...)*$)/;
const moneyInternationalized = {
  ptBr: { moneySeparator: ".", centsSeparator: ",", moneyPrefix: "R$: " },
};

export const moneyMask = (value) => {
  let maskedValue = value.padStart(3, "0");
  const {
    moneyPrefix,
    moneySeparator,
    centsSeparator,
  } = moneyInternationalized.ptBr;

  const centsPosition = maskedValue.length - 2;
  const money = maskedValue.slice(0, centsPosition);
  const cents = maskedValue.slice(centsPosition);

  const moneyByThousands = money.split(RIGHT_TO_LEFT_GROUP_BY_THREE);

  const moneyWithSeparator = [
    Number(moneyByThousands[0]),
    ...moneyByThousands.slice(1),
  ].join(moneySeparator);

  return moneyPrefix + moneyWithSeparator + centsSeparator + cents;
};

export const floatMask = (value, precision = 2) => {
  let maskedValue = value.padStart(precision + 1, "0");

  const floatPosition = maskedValue.length - precision;
  const integer = maskedValue.slice(0, floatPosition);
  const floating = maskedValue.slice(floatPosition);

  return `${Number(integer)}.${floating}`;
};

export const unmask = (value) => value.replace(/[^\d]/g, "");
