export function capitalizeWords(str, word = false) {
  if (!str) return "";

  if (word) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
