export const toCategoryCase = (text: string) => {
  const category = text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return category;
};
