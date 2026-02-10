import logo from "@/assets/logo/logo.png";
import { FaBars, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { useCartQuery } from "@/features/cart/hooks";
import { useWishlistQuery } from "@/features/wishlist/hooks";
import { Button, Badge } from "@/shared/ui";
import { Disclosure, Menu } from "@headlessui/react";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { isLoggedIn, logoutHandler, navigate, user } = useAuth();
  const { data: cartItems = [] } = useCartQuery();
  const { data: wishlistItems = [] } = useWishlistQuery();
  const location = useLocation();
  const showSearch = location.pathname === "/products";

  return (
    <Disclosure as="nav" aria-label="Main navigation" className="sticky top-0 z-50 bg-white shadow-nav dark:bg-slate-900 dark:shadow-nav-dark">
      {() => (
        <>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
            <div className="flex items-center gap-6">
              <Link to="/">
                <img src={logo} alt="Plan it Shop it - Home" className="h-12" />
              </Link>
              <div className="hidden items-center gap-4 sm:flex">
                <Link
                  to="/"
                  className="text-xs font-bold uppercase text-primary hover:text-secondary dark:text-primary-300 dark:hover:text-secondary-400"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-xs font-bold uppercase text-primary hover:text-secondary dark:text-primary-300 dark:hover:text-secondary-400"
                >
                  Products
                </Link>
              </div>
              {showSearch && (
                <SearchInput className="w-64" />
              )}
            </div>
            <Disclosure.Button className="inline-flex items-center justify-center rounded p-2 text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700 sm:hidden">
              <FaBars className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </Disclosure.Button>
            <div className="hidden items-center gap-4 sm:flex">
              {isLoggedIn ? (
                <Button variant="primary" size="sm" onClick={logoutHandler}>
                  Logout
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  className="relative cursor-pointer text-primary hover:text-secondary dark:text-primary-300 dark:hover:text-secondary-400"
                  onClick={() => navigate("/wishlist")}
                  aria-label="Wishlist"
                >
                  <FaHeart className="h-5 w-5" aria-hidden="true" />
                  {isLoggedIn && (
                    <Badge
                      variant="count"
                      className="absolute -right-2 -top-2"
                    >
                      {wishlistItems.length}
                    </Badge>
                  )}
                </button>
                <button
                  className="relative cursor-pointer text-primary hover:text-secondary dark:text-primary-300 dark:hover:text-secondary-400"
                  onClick={() => navigate("/cart")}
                  aria-label="Cart"
                >
                  <FaShoppingCart className="h-5 w-5" aria-hidden="true" />
                  {isLoggedIn && (
                    <Badge
                      variant="count"
                      className="absolute -right-2 -top-2"
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </button>
                {isLoggedIn && (
                  <Menu as="div" className="relative">
                    <Menu.Button
                      className="cursor-pointer text-primary hover:text-secondary dark:text-primary-300 dark:hover:text-secondary-400"
                      aria-label="User menu"
                    >
                      <FaUser className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 dark:ring-slate-700">
                      {user?.isAdmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? "bg-gray-100 dark:bg-slate-700" : ""} block w-full px-4 py-2 text-left text-sm font-medium text-secondary dark:text-secondary-300`}
                              onClick={() => navigate("/admin")}
                            >
                              Admin Panel
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-gray-100 dark:bg-slate-700" : ""} block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-200`}
                            onClick={() => navigate("/profile")}
                          >
                            My Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-gray-100 dark:bg-slate-700" : ""} block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-200`}
                            onClick={() => navigate("/orders")}
                          >
                            My Orders
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-gray-100 dark:bg-slate-700" : ""} block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-200`}
                            onClick={() => navigate("/addresses")}
                          >
                            My Addresses
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col gap-2 border-t px-4 pb-4 pt-2 dark:border-slate-700">
              {showSearch && (
                <div className="py-2">
                  <SearchInput />
                </div>
              )}
              <Link
                to="/"
                className="rounded px-3 py-2 text-sm font-bold uppercase text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="rounded px-3 py-2 text-sm font-bold uppercase text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
              >
                Products
              </Link>
              {isLoggedIn && user?.isAdmin && (
                <Link
                  to="/admin"
                  className="rounded px-3 py-2 text-sm font-bold uppercase text-secondary hover:bg-gray-100 dark:text-secondary-300 dark:hover:bg-slate-700"
                >
                  Admin Panel
                </Link>
              )}
              {isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    className="rounded px-3 py-2 text-sm font-bold uppercase text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="rounded px-3 py-2 text-sm font-bold uppercase text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/addresses"
                    className="rounded px-3 py-2 text-sm font-bold uppercase text-primary hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
                  >
                    My Addresses
                  </Link>
                </>
              )}
              <div className="flex items-center gap-4 pt-2">
                <ThemeToggle />
                {isLoggedIn ? (
                  <Button variant="primary" size="sm" onClick={logoutHandler}>
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
                <button
                  className="relative text-primary dark:text-primary-300"
                  onClick={() => navigate("/wishlist")}
                  aria-label="Wishlist"
                >
                  <FaHeart className="h-5 w-5" aria-hidden="true" />
                  {isLoggedIn && (
                    <Badge
                      variant="count"
                      className="absolute -right-2 -top-2"
                    >
                      {wishlistItems.length}
                    </Badge>
                  )}
                </button>
                <button
                  className="relative text-primary dark:text-primary-300"
                  onClick={() => navigate("/cart")}
                  aria-label="Cart"
                >
                  <FaShoppingCart className="h-5 w-5" aria-hidden="true" />
                  {isLoggedIn && (
                    <Badge
                      variant="count"
                      className="absolute -right-2 -top-2"
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
