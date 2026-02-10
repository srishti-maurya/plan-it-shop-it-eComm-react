import { memo } from "react";
import { FaStar, FaHeart, FaTrash } from "react-icons/fa";
import { useRemoveFromCart, useUpdateCartItem } from "@/features/cart/hooks";
import { useWishlistQuery, useAddToWishlist, useRemoveFromWishlist } from "@/features/wishlist/hooks";
import { Badge, Button } from "@/shared/ui";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

function CartItemComponent({ item }: CartItemProps) {
  const {
    title,
    image,
    author,
    price,
    prevPrice,
    rating,
    bestseller,
    newRelease,
    discount,
    _id,
    qty,
  } = item;
  const removeFromCart = useRemoveFromCart();
  const updateCartItem = useUpdateCartItem();
  const { data: wishlistItems = [] } = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const inWishlist = wishlistItems.find((el) => el._id === item._id);

  return (
    <div className="relative flex gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-card">
      <button
        className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-error-400"
        onClick={() =>
          inWishlist ? removeFromWishlistMutation.mutate(_id) : addToWishlistMutation.mutate(item)
        }
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart className={inWishlist ? "text-red-500" : ""} />
      </button>
      {bestseller && (
        <Badge
          variant="bestseller"
          className="absolute left-0 top-3 rounded-none rounded-r"
        >
          Best Seller
        </Badge>
      )}
      {newRelease && (
        <Badge
          variant="newRelease"
          className="absolute left-0 top-3 rounded-none rounded-r"
        >
          New Release
        </Badge>
      )}
      <img src={image} alt={title} loading="lazy" className="h-40 w-28 object-contain" />
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{price}</span>
          <span className="text-xs text-gray-400 line-through">
            {prevPrice}
          </span>
          <span className="text-xs text-dark-green">(Save {discount}%)</span>
        </div>
        <div className="mt-1 inline-flex items-center gap-1 self-start rounded bg-gray-800/80 px-1.5 py-0.5 text-xs text-white">
          <FaStar className="text-amber-400" />
          {rating}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm">Qty:</span>
          <div className="inline-flex items-center rounded border border-secondary">
            {qty === 1 ? (
              <button
                className="px-2 py-0.5 text-secondary hover:bg-red-50 hover:text-red-500"
                onClick={() => removeFromCart.mutate(_id)}
                aria-label="Remove item"
              >
                <FaTrash className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                className="px-2 py-0.5 text-lg text-secondary hover:bg-secondary-50"
                onClick={() => updateCartItem.mutate({ _id, type: "decrement" })}
              >
                {"\u2212"}
              </button>
            )}
            <span className="px-3 text-sm">{qty}</span>
            <button
              className="px-2 py-0.5 text-lg text-secondary hover:bg-secondary-50"
              onClick={() => updateCartItem.mutate({ _id, type: "increment" })}
            >
              +
            </button>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 self-start"
          onClick={() => removeFromCart.mutate(_id)}
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
}

export const CartItem = memo(CartItemComponent);
