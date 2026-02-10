import { useCartQuery } from "@/features/cart/hooks";
import { LoadingSpinner } from "@/shared/components";
import { CartItem } from "./components/CartItem";
import { CartBill } from "./components/CartBill";
import { EmptyState } from "@/shared/ui";
import emptyCart from "@/assets/svg/empty_cart.svg";

export function CartPage() {
  const { data: cartItems = [], isLoading } = useCartQuery();

  return (
    <>
      <h1 className="py-4 text-center text-2xl font-bold">My Cart</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : cartItems.length <= 0 ? (
        <EmptyState image={emptyCart} alt="empty_cart" message="Cart is empty!" />
      ) : (
        <section className="mx-4 grid grid-cols-1 gap-8 lg:mx-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <CartBill />
        </section>
      )}
    </>
  );
}
