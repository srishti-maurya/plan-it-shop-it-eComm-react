export function filterByCategory(
  sortedData,
  CONTEMPORARY_FICTION,
  SELF_HELP,
  BIOGRAPHIES_AUTOBIOGRAPHIES,
  SPIRITUALITY,
  MYTHOLOGY,
  ALL_CATEGORY,
  BEST_SELLERS,
  NEW_RELEASES,
  EXPERT_PICKS
) {
  const filteredlist = [];
  if (
    CONTEMPORARY_FICTION === false &&
    SELF_HELP === false &&
    BIOGRAPHIES_AUTOBIOGRAPHIES === false &&
    SPIRITUALITY === false &&
    MYTHOLOGY === false &&
    ALL_CATEGORY === false &&
    BEST_SELLERS === false &&
    NEW_RELEASES === false &&
    EXPERT_PICKS === false
  ) {
    return sortedData;
  }

  if (CONTEMPORARY_FICTION) {
    let newList = sortedData.filter(
      (item) => item.categoryName === "contemporary-fiction"
    );
    filteredlist.push(...newList);
  }

  if (SELF_HELP) {
    let newList = sortedData.filter(
      (item) => item.categoryName === "self-help"
    );
    filteredlist.push(...newList);
  }

  if (BIOGRAPHIES_AUTOBIOGRAPHIES) {
    let newList = sortedData.filter(
      (item) => item.categoryName === "biographies-autobiographies"
    );
    filteredlist.push(...newList);
  }

  if (SPIRITUALITY) {
    let newList = sortedData.filter(
      (item) => item.categoryName === "spirituality"
    );
    filteredlist.push(...newList);
  }

  if (MYTHOLOGY) {
    let newList = sortedData.filter(
      (item) => item.categoryName === "mythology"
    );
    filteredlist.push(...newList);
  }

  if (BEST_SELLERS) {
    let newList = sortedData.filter((item) => item.bestseller);
    filteredlist.push(...newList);
  }

  if (NEW_RELEASES) {
    let newList = sortedData.filter((item) => item.newRelease);
    filteredlist.push(...newList);
  }

  if (EXPERT_PICKS) {
    let newList = sortedData.filter((item) => item.expertPick);
    filteredlist.push(...newList);
  }

  if (ALL_CATEGORY) {
    return sortedData;
  }
  return filteredlist;
}
