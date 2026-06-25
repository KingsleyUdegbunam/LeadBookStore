export const sortBooks = (sortBy, booksCopy) => {
  switch (sortBy?.value) {
    case "popularity":
      booksCopy.sort((a, b) => b.reviews - a.reviews);
      break;
    case "price:low to high":
      booksCopy.sort((a, b) => a.price.paperback - b.price.paperback);
      break;
    case "price:high to low":
      booksCopy.sort((a, b) => b.price.paperback - a.price.paperback);
      break;

    default:
      break;
  }
};
