import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface OrdersByStatusChartProps {
  data: { status: string; count: number }[];
}

export function OrdersByStatusChart({ data }: OrdersByStatusChartProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Orders by Status</h3>
      {data.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-slate-400">No order data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" className="text-xs capitalize" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
