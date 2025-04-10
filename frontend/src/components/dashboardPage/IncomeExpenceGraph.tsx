import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { name: "Monday", income: 100 },
  { name: "Tuesday", income: 80 },
  { name: "Wednesday", income: 500 },
  { name: "Thursday", income: 150 },
  { name: "Friday", income: 200 },
  { name: "Saturday", income: 300 },
  { name: "Sunday", income: 120 },
];

// const onChange = () => {};

const IncomeExpenceGraph = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* income graph */}
      <div className="border border-black/20 p-4 rounded-md">
        <div className="flex items-center gap-5 justify-between">
          <h1 className="text-2xl">Income</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Income" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-500">Your overall income</p>

        <div className="h-[400px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax + 50"]} />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <ReferenceLine y={100} stroke="#f87171" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4ade80"
                name="Income"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* expense graph */}
      <div className="border border-black/20 p-4 rounded-md">
        <div className="flex items-center gap-5 justify-between">
          <h1 className="text-2xl">Expense</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Income" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-500">Your overall Expense</p>

        <div className="h-[400px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax + 50"]} />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <ReferenceLine y={100} stroke="#f87171" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4ade80"
                name="Income"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenceGraph;
