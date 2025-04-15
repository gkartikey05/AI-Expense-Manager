import { deleteTransaction, getTransaction } from "@/api/transactionApi";
import DashboardHeader from "@/components/DashboardHeader";
import TransactionForm from "@/components/transaction/TransactionForm";
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
import { useCurrency } from "@/contexts/CurrencyContext";
import { useDataStore } from "@/store/userDataStore";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader, Plus, Search, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TransactionPage = () => {
  const [openTransactionForm, setOpenTransactionForm] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);

  const queryClient = useQueryClient();

  const financeData = useDataStore((state) => state.data);
  const { currency, formatNumber } = useCurrency();

  // query to get data
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["transactions", filter, sort, search, page],
    queryFn: () => getTransaction(filter, sort, search, page),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  //mutation query to delete data
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", filter, sort, search, page],
      });
      queryClient.invalidateQueries({
        queryKey: ["financialData"],
      });
      queryClient.invalidateQueries({ queryKey: ["categoryBreakdown"] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    setPage("1");
  }, [filter, sort, search]);

  return (
    <>
      <DashboardHeader title="Transaction" />
      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Transactions</h1>
          {/* button to open transaction form */}
          <Button
            onClick={() => setOpenTransactionForm(true)}
            className="cursor-pointer"
          >
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions by description"
                className="pl-10 shadow-none w-full"
              />
            </div>

            {/* filter & sort */}
            <div className="flex flex-row items-center gap-4 w-full md:w-auto">
              {/* filter */}
              <Select onValueChange={(value) => setFilter(value)}>
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
              <Select onValueChange={(value) => setSort(value)}>
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

          {/* loder */}
          {isPending && (
            <div className="h-32 flex items-center justify-center">
              <Loader className="size-8 text-gray-600 animate-spin" />
            </div>
          )}

          {/* error */}
          {isError && (
            <div className="h-32 flex items-center justify-center">
              <p>{error.message}</p>
            </div>
          )}

          {/* table */}

          {data?.transactions.length === 0 ? (
            <div className="h-32 flex items-center justify-center">
              <p>{data?.message || "No Transactions to show"}</p>
            </div>
          ) : (
            <Table className="mt-5">
              <TableHeader>
                <TableRow className="text-lg">
                  <TableHead className="text-left">Description</TableHead>
                  <TableHead className="text-left">Category</TableHead>
                  <TableHead className="text-left">Type</TableHead>
                  <TableHead className="text-left">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.transactions?.map((item: any) => (
                  <TableRow key={item.description}>
                    <TableCell className="text-left font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-left capitalize">
                      {item.category.toLowerCase()}
                    </TableCell>
                    <TableCell className="text-left capitalize">
                      {item.type.toLowerCase()}
                    </TableCell>
                    <TableCell className="text-left">
                      {new Date(item.date).toDateString()}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        item.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.type === "EXPENSE" ? "-" : "+"} {currency}
                      {formatNumber(Math.abs(item.amount).toFixed(2))}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center gap-4">
                        {/* edit button */}
                        <button
                          onClick={() => {
                            setTransactionToUpdate(item);
                            setOpenTransactionForm(true);
                          }}
                          className="p-2 rounded-md border border-transparent bg-transparent hover:bg-gray-100 focus:outline-none"
                        >
                          <SquarePen className="size-4 text-gray-600 cursor-pointer" />
                        </button>
                        {/* delete button */}
                        <button
                          onClick={() => deleteMutation.mutate(item?.id)}
                          className="p-2 rounded-full bg-transparent border-0 focus:outline-none"
                          aria-label="Delete Transaction"
                        >
                          <Trash className="size-4 text-red-500 cursor-pointer" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* pagination */}
          {data?.totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                {/* Previous */}
                <PaginationItem className="cursor-pointer">
                  <PaginationPrevious
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(1, Number(prev) - 1).toString()
                      )
                    }
                    className={
                      Number(page) === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p} className="cursor-pointer">
                      <PaginationLink
                        onClick={() => setPage(p.toString())}
                        isActive={Number(page) === p}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Next */}
                <PaginationItem className="cursor-pointer">
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(data.totalPages, Number(prev) + 1).toString()
                      )
                    }
                    className={
                      Number(page) === data.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* income */}
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Income</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-green-500">
              +{currency}{" "}
              {financeData && formatNumber(financeData?.totalIncome.toFixed(2))}
            </CardContent>
            <CardFooter className="text-gray-500">Your Total income</CardFooter>
          </Card>
          {/* expense */}
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Expense</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-red-500">
              -{currency}{" "}
              {financeData &&
                formatNumber(financeData?.totalExpense.toFixed(2))}
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
              +{currency}
              {financeData &&
                formatNumber(
                  (financeData.totalIncome - financeData.totalExpense).toFixed(
                    2
                  )
                )}
            </CardContent>

            <CardFooter className="text-gray-500">Your net flow</CardFooter>
          </Card>
        </div>
      </section>

      {/* transactiomn form */}
      {openTransactionForm && (
        <TransactionForm
          transactionData={transactionToUpdate}
          setTransactionDataToNull={setTransactionToUpdate}
          closeForm={setOpenTransactionForm}
        />
      )}
    </>
  );
};

export default TransactionPage;
