import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "One Arranged Marriage",
    author: "Chetan Bhagat",
    categoryName: "contemporary-fiction",
    price: "147",
    prevPrice: "225",
    discount: "35",
    rating: "4.4",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/71fgd+WAkHL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Atomic habbits",
    author: "James Clear",
    categoryName: "self-help",
    price: "512",
    prevPrice: "799",
    discount: "36",
    rating: "4.6",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/51S7KOWir7L._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Attitude Is Everything",
    author: "Jeff Keller",
    categoryName: "self-help",
    price: "139",
    prevPrice: "199",
    discount: "30",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/710jnzKlDTL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Becoming",
    author: "Michelle Obama",
    categoryName: "biographies-autobiographies",
    price: "442",
    prevPrice: "699",
    discount: "37",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91EhnA7oXHL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Can Love Happen Twice",
    author: "Ravinder Singh",
    categoryName: "contemporary-fiction",
    price: "133",
    prevPrice: "199",
    discount: "33",
    rating: "4.3",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91xqVJ2ZkXL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Chanakya Neeti",
    author: "Chanakya",
    categoryName: "spirituality",
    price: "126",
    prevPrice: "175",
    discount: "28",
    rating: "4.4",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81uqBB0yjVL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Death",
    author: "Sadhguru",
    categoryName: "spirituality",
    price: "191",
    prevPrice: "299",
    discount: "36",
    rating: "4.7",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91co3ZyqsML._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Dont Say Yes When You Want To Say No",
    author: "Herbert Fensterheim Ph.D. and Jean Baer",
    categoryName: "self-help",
    price: "345",
    prevPrice: "499",
    discount: "31",
    rating: "3.9",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/81+gfw4wXzL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Dont Sweat The Small Stuff",
    author: "Richard Carlson",
    categoryName: "self-help",
    price: "230",
    prevPrice: "299",
    discount: "23",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/61nmmJxRtsL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Girl In Room 105",
    author: "Chetan Bhagat",
    categoryName: "contemporary-fiction",
    price: "114",
    prevPrice: "199",
    discount: "43",
    rating: "4.4",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81l9tZKRZLL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Half Girlfriend",
    author: "Chetan Bhagat",
    categoryName: "contemporary-fiction",
    price: "99",
    prevPrice: " 250",
    discount: "60",
    rating: "4.2",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/712HEn9SNwL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    categoryName: "self-help",
    price: "295",
    prevPrice: "255",
    discount: "46",
    rating: "4.6",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Karma",
    author: "Sadhguru",
    categoryName: "spirituality",
    price: "148",
    prevPrice: "299",
    discount: "51",
    rating: "4.7",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/9167i2ioFaS._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    categoryName: "self-help",
    price: "386",
    prevPrice: "599",
    discount: "36",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/71rMrK1DdZL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Power Of Letting Go",
    author: "John Purkiss",
    categoryName: "self-help",
    price: "590",
    prevPrice: "0",
    discount: "0",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/61bKDUjhloL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Life's Amazing Secrets",
    author: "Gaur Gopal Das",
    categoryName: "spirituality",
    price: "215",
    prevPrice: "225",
    discount: " 4",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81N7FmJhbhL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "I Too Had A Love Story",
    author: "Ravinder Singh",
    categoryName: "contemporary-fiction",
    price: "191",
    prevPrice: "199",
    discount: " 4",
    rating: "4.4",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81fxf8EaTgL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Meluha",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "302",
    prevPrice: "499",
    discount: "39",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/8181LdPn39L._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Nagas",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "245",
    prevPrice: "450",
    discount: "46",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91+4ShnL4TL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Power Of Now",
    author: "Eckhart Tolle",
    categoryName: "spirituality",
    price: "340",
    prevPrice: "499",
    discount: "32",
    rating: "4.5",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81rTrhtGDvL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Psychology Of Money",
    author: "Morgan Housel",
    categoryName: "self-help",
    price: "267",
    prevPrice: "399",
    discount: "33",
    rating: "4.6",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Ram",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "272",
    prevPrice: "450",
    discount: "40",
    rating: "4.4",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81um1SFs6QL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Ravaan",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "259",
    prevPrice: "499",
    discount: "48",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/812dmVf1V8S._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    categoryName: "self-help",
    price: "243",
    prevPrice: "499",
    discount: "51",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Secrets",
    author: "Rhonda Byrne",
    categoryName: "self-help",
    price: "477",
    prevPrice: "799",
    discount: "40",
    rating: "4.6",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/81fdQIY6ykL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Sita",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "350",
    prevPrice: "299",
    discount: "12",
    rating: "4.5",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/61HK5Tm1QyL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The 5 AM Revolution",
    author: "Dan Luca",
    categoryName: "spirituality",
    price: "169",
    prevPrice: "295",
    discount: "43",
    rating: "4.3",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/611UKbv6bPL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    categoryName: "spirituality",
    price: "229",
    prevPrice: "350",
    discount: "35",
    rating: "4.6",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Bhagavadgita S Radhakrishna",
    author: "S. Radhakrishnan",
    categoryName: "spirituality",
    price: "293",
    prevPrice: "499",
    discount: "41",
    rating: "4.7",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91DhR3OJboL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Power Of Intuition",
    author: "Emma Lucy Knowles",
    categoryName: "spirituality",
    price: "473",
    prevPrice: "599",
    discount: "21",
    rating: "4.5",
    bestseller: true,
    newRelease: false,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/71iJbC57J3L._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "The Subtle Art Of Not Giving A f*",
    author: "Mark Manson",
    categoryName: "self-help",
    price: "269",
    prevPrice: "499",
    discount: "46",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/814jC+rODgL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Think Like A Monk",
    author: "Jay Shetty",
    categoryName: "spirituality",
    price: "338",
    prevPrice: "499",
    discount: "32",
    rating: "4.6",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Unfinished",
    author: "Priyanka Chopra Jonas",
    categoryName: "biographies-autobiographies",
    price: "352",
    prevPrice: "699",
    discount: "50",
    rating: "4.4",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/81tHdhbrGEL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "Vayuputras",
    author: "Amish Tripathi",
    categoryName: "mythology",
    price: "403",
    prevPrice: "599",
    discount: "33",
    rating: "4.6",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/91gLF02WsHL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "You Can Win",
    author: "Shiv Khera",
    categoryName: "self-help",
    price: "279",
    prevPrice: "399",
    discount: "30",
    rating: "4.6",
    bestseller: false,
    newRelease: false,
    expertPick: true,
    image:
      "https://m.media-amazon.com/images/I/81r9oQNPuNL._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    _id: uuid(),
    title: "You Can If You Think You Can",
    author: "Norman Vincent Peale",
    categoryName: "self-help",
    price: "277",
    prevPrice: "350",
    discount: "21",
    rating: "4.7",
    bestseller: false,
    newRelease: true,
    expertPick: false,
    image:
      "https://m.media-amazon.com/images/I/61Fhc8NvxKL._AC_UY436_FMwebp_QL65_.jpg",
  },
];
