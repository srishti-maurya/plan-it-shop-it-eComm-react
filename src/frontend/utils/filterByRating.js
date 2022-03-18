export function filterByRating(data, filterBy) {
  if (filterBy === "FOUR_POINT_FIVE_STARS") {
    return data.filter((item) => item.rating >= 4.5);
  } else if (filterBy === "FOUR_STARS") {
    return data.filter((item) => item.rating >= 4);
  } else if (filterBy === "THREE_STARS") {
    return data.filter((item) => item.rating >= 3);
  } else return data;
}
