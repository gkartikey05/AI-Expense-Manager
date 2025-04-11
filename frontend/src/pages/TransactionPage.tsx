import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, SquarePen, Trash } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -120.5,
    date: "2023-05-10",
    category: "Food",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3500.0,
    date: "2023-05-01",
    category: "Income",
  },
  {
    id: 3,
    description: "Electric Bill",
    amount: -85.2,
    date: "2023-05-05",
    category: "Utilities",
  },
  {
    id: 4,
    description: "Restaurant Dinner",
    amount: -65.8,
    date: "2023-05-08",
    category: "Food",
  },
];

const TransactionPage = () => {
  return (
    <>
      <DashboardHeader title="Transaction" />
      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Transactions</h1>
          <Button className="cursor-pointer">
            Add Transaction <Plus />
          </Button>
        </div>

        {/* transactions */}
        <div className="border border-black/20 rounded-md p-4">
        
          {/* search ,sort ,filter */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-5">
            {/* search */}
            <div className="relative w-full md:max-w-md">
              <Search className="size-5 text-gray-500 absolute top-1/2 -translate-y-1/2 left-3" />
              <Input
                placeholder="Search transactions by description"
                className="pl-10 shadow-none w-full"
              />
            </div>

            {/* filter & sort */}
            <div className="flex flex-row items-center gap-4 w-full md:w-auto">
              {/* filter */}
              <Select>
                <SelectTrigger className="flex-1 w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expense Only</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                </SelectContent>
              </Select>

              {/* sort */}
              <Select>
                <SelectTrigger className="flex-1 w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dateNewest">Date (Newest)</SelectItem>
                  <SelectItem value="dateOldest">Date (Oldest)</SelectItem>
                  <SelectItem value="amountHighToLow">
                    Amount (High to Low)
                  </SelectItem>
                  <SelectItem value="amountLowToHigh">
                    Amount (Low to High)
                  </SelectItem>
                  <SelectItem value="descriptionAZ">
                    Description (A-z)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* search ,sort ,filter ends */}

          {/* table */}
          <Table className="mt-5">
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="text-left">Description</TableHead>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((item) => (
                <TableRow key={item.description}>
                  <TableCell className="text-left font-medium">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-left">{item.category}</TableCell>
                  <TableCell className="text-left">{item.date}</TableCell>
                  <TableCell
                    className={`text-right ${
                      item.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.amount < 0 ? "-" : "+"}$
                    {Math.abs(item.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-4">
                      <SquarePen className="size-4 text-gray-600 cursor-pointer" />
                      <Trash className="size-4 text-red-500 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* pagination */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* income */}
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Income</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-green-500">
              +Rs 70,000.00
            </CardContent>
            <CardFooter className="text-gray-500">Your Total income</CardFooter>
          </Card>
          {/* expense */}
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Expense</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-red-500">
              +Rs 40,000.00
            </CardContent>
            <CardFooter className="text-gray-500">
              Your Total Expense
            </CardFooter>
          </Card>
          {/* Net flow */}
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Net Flow</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-green-500">
              +Rs 30,000.00
            </CardContent>
            <CardFooter className="text-gray-500">Your net flow</CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
};

export default TransactionPage;
