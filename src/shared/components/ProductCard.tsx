import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useCartQuery, useAddToCart } from '@/features/cart/hooks';
import {
  useWishlistQuery,
  useAddToWishlist,
  useRemoveFromWishlist,
} from '@/features/wishlist/hooks';
import { useAuth } from '@/features/auth/hooks';
import { Button, Badge } from '@/shared/ui';
import type { Product } from '@/types';

interface ProductCardProps {
  item: Product;
}

function ProductCardComponent({ item }: ProductCardProps) {
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
  } = item;
  const { data: cartItems = [] } = useCartQuery();
  const addToCartMutation = useAddToCart();
  const { navigate } = useAuth();
  const { data: wishlistItems = [] } = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const matchedItem = cartItems.find((el) => el._id === item._id);
  const inWishlist = wishlistItems.find((el) => el._id === item._id);

  return (
    <div className="group relative w-60 rounded-lg bg-white shadow-sm transition-shadow hover:shadow-card">
      <button
        className="absolute right-2 top-2 z-10 cursor-pointer p-1 text-gray-400 transition-colors hover:text-error-400"
        onClick={() =>
          inWishlist
            ? removeFromWishlistMutation.mutate(_id)
            : addToWishlistMutation.mutate(item)
        }
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FaHeart className={inWishlist ? 'text-red-500' : ''} />
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
      <Link to={`/products/${_id}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="mx-auto h-52 cursor-pointer object-contain pt-2 transition-transform hover:scale-105"
        />
      </Link>
      <div className="absolute bottom-[43%] right-[10%] flex items-center gap-1 rounded bg-gray-800/80 px-1.5 py-0.5 text-xs text-white">
        {rating}
        <FaStar className="text-amber-400" />
      </div>
      <div className="p-3 text-center">
        <Link to={`/products/${_id}`}>
          <h3 className="truncate text-base font-semibold hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">{author}</p>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          <span className="font-semibold">{price}</span>
          <span className="text-xs text-gray-400 line-through">
            {prevPrice}
          </span>
          <span className="text-xs text-dark-green">(Save {discount}%)</span>
        </div>
        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={() => {
            console.log('clicked', matchedItem);

            matchedItem ? navigate('/cart') : addToCartMutation.mutate(item);
          }}
        >
          {matchedItem ? 'Go to Cart' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}

export const ProductCard = memo(ProductCardComponent);
