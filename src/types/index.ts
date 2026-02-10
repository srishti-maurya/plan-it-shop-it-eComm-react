export type CategorySlug =
  | 'contemporary-fiction'
  | 'self-help'
  | 'biographies-autobiographies'
  | 'spirituality'
  | 'mythology';

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewPayload {
  rating: number;
  title: string;
  comment: string;
}

export interface Product {
  _id: string;
  title: string;
  author: string;
  categoryName: CategorySlug;
  price: string;
  prevPrice: string;
  discount: string;
  rating: string;
  bestseller: boolean;
  newRelease: boolean;
  expertPick: boolean;
  image: string;
  reviews?: Review[];
  reviewCount?: number;
}

export interface CartItem extends Product {
  qty: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem extends Product {
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  categoryName: CategorySlug;
  description: string;
}

export interface Address {
  _id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  type: "percentage" | "flat";
  value: number;
  minCartValue: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
  cart: CartItem[];
  wishlist: WishlistItem[];
  addresses: Address[];
  orders: Order[];
}

export interface ProductPayload {
  title: string;
  author: string;
  categoryName: CategorySlug;
  price: string;
  prevPrice: string;
  discount: string;
  rating: string;
  bestseller: boolean;
  newRelease: boolean;
  expertPick: boolean;
  image: string;
}

export interface AdminOrder extends Order {
  userId: string;
  userName: string;
}

export interface AuthResponse {
  encodedToken: string;
  createdUser?: User;
  foundUser?: User;
}

export type SortDirection = '' | 'HIGH_TO_LOW' | 'LOW_TO_HIGH';

export type RatingFilter = '' | 'FOUR_POINT_FIVE_STARS' | 'FOUR_STARS' | 'THREE_STARS';

export interface CategoryFlags {
  CONTEMPORARY_FICTION: boolean;
  SELF_HELP: boolean;
  BIOGRAPHIES_AUTOBIOGRAPHIES: boolean;
  SPIRITUALITY: boolean;
  MYTHOLOGY: boolean;
  ALL_CATEGORY: boolean;
}

export interface CollectionFlags {
  BEST_SELLERS: boolean;
  NEW_RELEASES: boolean;
  EXPERT_PICKS: boolean;
}

export interface FilterState {
  sortBy: SortDirection;
  category: CategoryFlags;
  collections: CollectionFlags;
  filterBy: RatingFilter;
  filterPrice: number;
  searchTerm: string;
}

export type FilterAction =
  | { type: 'HIGH_TO_LOW' }
  | { type: 'LOW_TO_HIGH' }
  | { type: 'FOUR_POINT_FIVE_STARS' }
  | { type: 'FOUR_STARS' }
  | { type: 'THREE_STARS' }
  | { type: 'FILTER_BY_PRICE'; payload: number }
  | { type: 'CONTEMPORARY_FICTION' }
  | { type: 'SELF_HELP' }
  | { type: 'BIOGRAPHIES_AUTOBIOGRAPHIES' }
  | { type: 'SPIRITUALITY' }
  | { type: 'MYTHOLOGY' }
  | { type: 'ALL_CATEGORY' }
  | { type: 'BEST_SELLERS' }
  | { type: 'NEW_RELEASES' }
  | { type: 'EXPERT_PICKS' }
  | { type: 'CLEAR' };

// Order types
export type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  _id: string;
  title: string;
  author: string;
  image: string;
  price: string;
  qty: number;
}

export type PaymentStatus = "pending" | "completed" | "failed";

export interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: Address;
  couponCode: string | null;
  couponDiscount: number;
  deliveryCharge: number;
  status: OrderStatus;
  paymentMethodId?: string;
  paymentStatus?: PaymentStatus;
  createdAt: string;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: Address;
  couponCode: string | null;
  couponDiscount: number;
  deliveryCharge: number;
  paymentMethodId?: string;
  paymentStatus?: PaymentStatus;
}
