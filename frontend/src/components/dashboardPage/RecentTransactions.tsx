import { MoveRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
import TransactionForm from "../transaction/TransactionForm";
import { useState } from "react";

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

const RecentTransactions = () => {
  const [openTransactionForm, setOpenTransactionForm] = useState(false);

  return (
    <>
      <div className="border border-black/20 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl ">Recent Transaction</h1>
          <Button
            onClick={() => setOpenTransactionForm(true)}
            className="cursor-pointer"
          >
            Add Transaction <Plus />
          </Button>
        </div>
        <p className="text-gray-500">Your Latest financial activities</p>

        <Table className="mt-5">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead className="text-left">Description</TableHead>
              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Link
          to="/transactions"
          className="mt-8 flex items-center justify-end gap-2 group"
        >
          View all transactions{" "}
          <MoveRight className="group-hover:translate-x-1 transition-all duration-300" />
        </Link>
      </div>
      {/* transactiomn form */}
      {openTransactionForm && (
        <TransactionForm closeForm={setOpenTransactionForm} />
      )}
    </>
  );
};

export default RecentTransactions;
