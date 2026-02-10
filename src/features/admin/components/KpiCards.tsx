import { FaRupeeSign, FaShoppingBag, FaBook, FaUsers } from "react-icons/fa";
import type { AnalyticsData } from "@/services/admin.api";

interface KpiCardsProps {
  data: AnalyticsData;
}

export function KpiCards({ data }: KpiCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: FaRupeeSign,
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      label: "Total Orders",
      value: data.totalOrders,
      icon: FaShoppingBag,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      label: "Total Products",
      value: data.totalProducts,
      icon: FaBook,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    },
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: FaUsers,
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-slate-100">{value}</p>
            </div>
            <div className={`rounded-full p-3 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
