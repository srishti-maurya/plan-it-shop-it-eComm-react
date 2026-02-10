import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { FaChartBar, FaBook, FaClipboardList, FaStore, FaSignOutAlt } from "react-icons/fa";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: FaChartBar, end: true },
  { to: "/admin/books", label: "Books", icon: FaBook, end: false },
  { to: "/admin/orders", label: "Orders", icon: FaClipboardList, end: false },
];

export function AdminLayout() {
  const { logoutHandler } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t px-3 py-4 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <FaStore className="h-4 w-4" />
            Back to Store
          </Link>
          <button
            onClick={logoutHandler}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <FaSignOutAlt className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
