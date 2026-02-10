import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryDistributionChartProps {
  data: { category: string; count: number }[];
}

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Products by Category</h3>
      {data.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-slate-400">No product data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={110}
              innerRadius={50}
              dataKey="count"
              nameKey="category"
              paddingAngle={2}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number, name: string) => [value, name]} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: 16 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
