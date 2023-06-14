export const toTitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeFirstWord = (str: string) => {
  const words = str.split(" ");
  const capitalizedWords = words.map((word, index) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};
