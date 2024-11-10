export const firstLetterUpper = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const unicodeToChar = (input: number): string => {
  return String.fromCharCode(input);
};
