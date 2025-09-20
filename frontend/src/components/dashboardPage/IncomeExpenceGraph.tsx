import { getCategoryBreakdown } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const IncomeExpenceGraph = () => {
  // colors for graph
  const COLORS = [
    "#4f46e5",
    "#22c55e",
    "#f97316",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
  ];

  // query category breakdown
  const { data } = useQuery({
    queryKey: ["categoryBreakdown"],
    queryFn: getCategoryBreakdown,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* income donut graph*/}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">Income</CardTitle>
          <CardDescription className="text-gray-500">
            Your income category breakdown
          </CardDescription>
        </CardHeader>

        <CardContent className=" flex items-center justify-center">
          {/* graph here  */}
          {data?.incomeBreakdown && data.incomeBreakdown.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                data={data?.incomeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60} 
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data?.incomeBreakdown.map((_:any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-medium">No Income Data</p>
              <p className="text-sm">You don't have any income transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* expense donut graph*/}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">Expense</CardTitle>
          <CardDescription className="text-gray-500">
            Your expense category breakdown
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center">
          {/* graph here  */}
          {data?.expenseBreakdown && data.expenseBreakdown.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                data={data?.expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data?.expenseBreakdown.map((_: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-medium">No Expense Data</p>
              <p className="text-sm">You don't have any expense transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeExpenceGraph;
