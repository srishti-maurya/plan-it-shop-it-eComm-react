export function filterByPrice(filteredData, price) {
  return filteredData.filter((item) => item.price <= price);
}
