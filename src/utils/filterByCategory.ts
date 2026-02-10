import type { Product } from "@/types";

export function filterByCategory(
  sortedData: Product[],
  CONTEMPORARY_FICTION: boolean,
  SELF_HELP: boolean,
  BIOGRAPHIES_AUTOBIOGRAPHIES: boolean,
  SPIRITUALITY: boolean,
  MYTHOLOGY: boolean,
  ALL_CATEGORY: boolean,
  BEST_SELLERS: boolean,
  NEW_RELEASES: boolean,
  EXPERT_PICKS: boolean
): Product[] {
  const filteredlist: Product[] = [];
  if (
    !CONTEMPORARY_FICTION && !SELF_HELP && !BIOGRAPHIES_AUTOBIOGRAPHIES &&
    !SPIRITUALITY && !MYTHOLOGY && !ALL_CATEGORY &&
    !BEST_SELLERS && !NEW_RELEASES && !EXPERT_PICKS
  ) {
    return sortedData;
  }

  if (CONTEMPORARY_FICTION) filteredlist.push(...sortedData.filter((item) => item.categoryName === "contemporary-fiction"));
  if (SELF_HELP) filteredlist.push(...sortedData.filter((item) => item.categoryName === "self-help"));
  if (BIOGRAPHIES_AUTOBIOGRAPHIES) filteredlist.push(...sortedData.filter((item) => item.categoryName === "biographies-autobiographies"));
  if (SPIRITUALITY) filteredlist.push(...sortedData.filter((item) => item.categoryName === "spirituality"));
  if (MYTHOLOGY) filteredlist.push(...sortedData.filter((item) => item.categoryName === "mythology"));
  if (BEST_SELLERS) filteredlist.push(...sortedData.filter((item) => item.bestseller));
  if (NEW_RELEASES) filteredlist.push(...sortedData.filter((item) => item.newRelease));
  if (EXPERT_PICKS) filteredlist.push(...sortedData.filter((item) => item.expertPick));
  if (ALL_CATEGORY) return sortedData;

  return filteredlist;
}
