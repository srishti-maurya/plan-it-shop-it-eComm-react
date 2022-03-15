import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "contemporary-fiction",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "self-help",
    description:
      "one that is written with the intention to instruct its readers on solving personal problems",
  },
  {
    _id: uuid(),
    categoryName: "biographies-autobiographies",
    description: "a detailed description of a person's life",
  },
  {
    _id: uuid(),
    categoryName: "spirituality",
    description:
      "devoted to the reading of lives of saints, writings of Doctors and the Fathers of the Church, theological works written by holy people, and doctrinal writings of Church authorities",
  },
  {
    _id: uuid(),
    categoryName: "mythology",
    description:
      "The main characters in myths are usually gods or supernatural heroes.",
  },
];
