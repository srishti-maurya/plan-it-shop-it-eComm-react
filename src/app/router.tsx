import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, AdminRoute, Layout, SkeletonGrid } from "@/shared/components";

const HomePage = lazy(() =>
  import("@/features/home/HomePage").then((m) => ({ default: m.HomePage }))
);
const ProductsPage = lazy(() =>
  import("@/features/products/ProductsPage").then((m) => ({ default: m.ProductsPage }))
);
const ProductDetailPage = lazy(() =>
  import("@/features/products/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage }))
);
const LoginPage = lazy(() =>
  import("@/features/auth/components/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const SignupPage = lazy(() =>
  import("@/features/auth/components/SignupPage").then((m) => ({ default: m.SignupPage }))
);
const LogoutPage = lazy(() =>
  import("@/features/auth/components/LogoutPage").then((m) => ({ default: m.LogoutPage }))
);
const CartPage = lazy(() =>
  import("@/features/cart/CartPage").then((m) => ({ default: m.CartPage }))
);
const WishlistPage = lazy(() =>
  import("@/features/wishlist/WishlistPage").then((m) => ({ default: m.WishlistPage }))
);
const AddressPage = lazy(() =>
  import("@/features/address/AddressPage").then((m) => ({ default: m.AddressPage }))
);
const CheckoutPage = lazy(() =>
  import("@/features/checkout/CheckoutPage").then((m) => ({ default: m.CheckoutPage }))
);
const OrderHistoryPage = lazy(() =>
  import("@/features/orders/OrderHistoryPage").then((m) => ({ default: m.OrderHistoryPage }))
);
const ProfilePage = lazy(() =>
  import("@/features/profile/ProfilePage").then((m) => ({ default: m.ProfilePage }))
);
const NotFoundPage = lazy(() =>
  import("@/shared/components/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);
const AdminLayout = lazy(() =>
  import("@/features/admin/components/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const AdminDashboardPage = lazy(() =>
  import("@/features/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminBooksPage = lazy(() =>
  import("@/features/admin/AdminBooksPage").then((m) => ({ default: m.AdminBooksPage }))
);
const AdminOrdersPage = lazy(() =>
  import("@/features/admin/AdminOrdersPage").then((m) => ({ default: m.AdminOrdersPage }))
);

function PageSkeleton() {
  return (
    <div className="py-8">
      <SkeletonGrid />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/addresses" element={<AddressPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<Suspense fallback={<PageSkeleton />}><AdminLayout /></Suspense>}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
