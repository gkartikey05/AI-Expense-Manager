import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* total income */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">Rs 25,0000</p>
          <span className="flex items-center text-green-500">
            <TrendingUp className="size-4" />
            +8.2%
          </span>
        </CardContent>
      </Card>

      {/* total expense */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Total Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">Rs 25,0000</p>
          <span className="flex items-center text-green-500">
            <TrendingUp className="size-4" />
            +8.2%
          </span>
        </CardContent>
      </Card>

      {/* budget used */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Budget Used
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">35%</p>
          <span className="flex items-center text-green-500">of RS 24,000</span>
        </CardContent>
      </Card>

      {/* saving goals */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Saving Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">Rs 15000</p>
          <span className="flex items-center text-gray-500">of RS 30,000</span>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Progress value={38} />
          <p className="text-sm text-gray-400">38% of goal reached</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Overview;
