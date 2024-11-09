export const firstLetterUpper = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const unicodeToChar = (text) => {
  return String.fromCharCode(text);
};
