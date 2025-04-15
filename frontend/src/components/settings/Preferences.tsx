import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useCurrency } from "@/contexts/CurrencyContext";

const Preferences = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <Card className="mt-5  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-normal">Preferences</CardTitle>
        <CardDescription>Choose your preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            onValueChange={changeCurrency}
            value={currency} 
          >
            <SelectTrigger id="currency" className="w-[180px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="₹">INR (₹)</SelectItem>
              <SelectItem value="$">USD ($)</SelectItem>
              <SelectItem value="€">EUR (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default Preferences;
