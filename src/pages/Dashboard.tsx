
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useExpense } from "@/contexts/ExpenseContext";
import { Sun, Moon, DollarSign, PiggyBank } from "lucide-react";

interface DashboardProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const Dashboard = ({ isDarkMode, setIsDarkMode }: DashboardProps) => {
  const { expenses, income, addExpense, addIncome } = useExpense();
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [newIncome, setNewIncome] = useState({
    amount: "",
    source: "",
    description: "",
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.amount && newExpense.category) {
      addExpense({
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: new Date().toISOString(),
      });
      setNewExpense({ amount: "", category: "", description: "" });
    }
  };

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIncome.amount && newIncome.source) {
      addIncome({
        amount: parseFloat(newIncome.amount),
        source: newIncome.source,
        description: newIncome.description,
        date: new Date().toISOString(),
      });
      setNewIncome({ amount: "", source: "", description: "" });
    }
  };

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Education",
    "Housing",
    "Other",
  ];

  const incomeSources = [
    "Part-time Job",
    "Allowance",
    "Scholarship",
    "Freelance",
    "Other",
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const balance = totalIncome - totalExpenses;

  const chartData = categories.map((category) => ({
    name: category,
    amount: expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Financial Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 glass">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-primary h-5 w-5" />
              <h2 className="font-semibold">Total Balance</h2>
            </div>
            <p className="text-2xl font-bold mt-2">${balance.toFixed(2)}</p>
          </Card>
          <Card className="p-4 glass">
            <div className="flex items-center space-x-2">
              <PiggyBank className="text-green-500 h-5 w-5" />
              <h2 className="font-semibold">Total Income</h2>
            </div>
            <p className="text-2xl font-bold mt-2">${totalIncome.toFixed(2)}</p>
          </Card>
          <Card className="p-4 glass">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-red-500 h-5 w-5" />
              <h2 className="font-semibold">Total Expenses</h2>
            </div>
            <p className="text-2xl font-bold mt-2">${totalExpenses.toFixed(2)}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) =>
                    setNewExpense({ ...newExpense, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-description">Description</Label>
                <Input
                  id="expense-description"
                  placeholder="Enter description"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, description: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Add Expense
              </Button>
            </form>
          </Card>

          <Card className="p-6 glass">
            <h2 className="text-xl font-semibold mb-4">Add Income</h2>
            <form onSubmit={handleAddIncome} className="space

-y-4">
              <div className="space-y-2">
                <Label htmlFor="income-amount">Amount</Label>
                <Input
                  id="income-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newIncome.amount}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, amount: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Select
                  value={newIncome.source}
                  onValueChange={(value) =>
                    setNewIncome({ ...newIncome, source: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="income-description">Description</Label>
                <Input
                  id="income-description"
                  placeholder="Enter description"
                  value={newIncome.description}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, description: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Add Income
              </Button>
            </form>
          </Card>
        </div>

        <Card className="p-6 glass">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
