import { Link } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaHeart } from "react-icons/fa";
import { useAuth } from "@/features/auth/hooks";
import { useOrdersQuery } from "@/features/orders/hooks";
import { OrderCard } from "@/features/orders/components/OrderCard";
import { LoadingSpinner } from "@/shared/components";
import { Button } from "@/shared/ui";

export function ProfilePage() {
  const { user, logoutHandler } = useAuth();
  const { data: orders = [], isLoading } = useOrdersQuery();

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold dark:text-slate-100">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-card dark:bg-slate-800 dark:shadow-card-dark">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto dark:bg-primary-900/30 dark:text-primary-300">
              <FaUser className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold dark:text-slate-100">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email?.split("@")[0] || "User"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">{user?.email}</p>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                to="/orders"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <FaShoppingBag className="h-4 w-4 text-primary dark:text-primary-300" aria-hidden="true" />
                My Orders
              </Link>
              <Link
                to="/addresses"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <FaMapMarkerAlt className="h-4 w-4 text-primary dark:text-primary-300" aria-hidden="true" />
                My Addresses
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <FaHeart className="h-4 w-4 text-primary dark:text-primary-300" aria-hidden="true" />
                My Wishlist
              </Link>
            </div>

            <div className="mt-6">
              <Button variant="outline" size="full" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-card dark:bg-slate-800 dark:shadow-card-dark">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold dark:text-slate-100">Recent Orders</h3>
              {orders.length > 3 && (
                <Link
                  to="/orders"
                  className="text-sm font-medium text-secondary hover:underline dark:text-secondary-300"
                >
                  View all
                </Link>
              )}
            </div>

            {isLoading ? (
              <div className="flex min-h-[200px] items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="py-8 text-center">
                <FaShoppingBag className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600" aria-hidden="true" />
                <p className="mt-4 text-gray-500 dark:text-slate-400">No orders yet</p>
                <Link
                  to="/products"
                  className="mt-2 inline-block text-sm font-medium text-secondary hover:underline dark:text-secondary-300"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
