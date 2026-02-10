import { ProductCard, LoadingSpinner } from "@/shared/components";
import { useWishlistQuery } from "@/features/wishlist/hooks";
import { EmptyState } from "@/shared/ui";
import emptyWishlist from "@/assets/svg/empty_wishlist.svg";

export function WishlistPage() {
  const { data: wishlistItems = [], isLoading } = useWishlistQuery();

  return (
    <>
      <h1 className="py-4 text-center text-2xl font-bold">My Wishlist</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : wishlistItems.length <= 0 ? (
        <EmptyState
          image={emptyWishlist}
          alt="empty_wishlist"
          message="Wishlist is empty!"
        />
      ) : (
        <div className="mx-4 flex flex-wrap justify-center gap-6">
          {wishlistItems?.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
