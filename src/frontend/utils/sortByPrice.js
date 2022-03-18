export function sortByPrice(data, sortBy) {
  if (sortBy === "HIGH_TO_LOW") {
    return [...data].sort((item1, item2) => item2.price - item1.price);
  } else if (sortBy === "LOW_TO_HIGH") {
    return [...data].sort((item1, item2) => item1.price - item2.price);
  } else return data;
}
