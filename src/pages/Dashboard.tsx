
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

const currencies = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.91 },
  GBP: { symbol: "£", rate: 0.79 },
  JPY: { symbol: "¥", rate: 148.41 },
  CNY: { symbol: "¥", rate: 7.19 },
};

const Dashboard = ({ isDarkMode, setIsDarkMode }: DashboardProps) => {
  const { expenses, income, addExpense, addIncome } = useExpense();
  const [currency, setCurrency] = useState<keyof typeof currencies>("USD");
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

  const convertAmount = (amount: number) => {
    return (amount * currencies[currency].rate).toFixed(2);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.amount && newExpense.category) {
      addExpense({
        amount: parseFloat(newExpense.amount) / currencies[currency].rate, // Store in USD
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
        amount: parseFloat(newIncome.amount) / currencies[currency].rate, // Store in USD
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
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-background transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Financial Dashboard</h1>
          <div className="flex items-center gap-4">
            <Select
              value={currency}
              onValueChange={(value: keyof typeof currencies) => setCurrency(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currencies).map(([code]) => (
                  <SelectItem key={code} value={code}>
                    {code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hover:bg-accent"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-primary h-5 w-5" />
              <h2 className="font-semibold">Total Balance</h2>
            </div>
            <p className="text-2xl font-bold mt-2">
              {currencies[currency].symbol}{convertAmount(balance)}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <PiggyBank className="text-green-500 h-5 w-5" />
              <h2 className="font-semibold">Total Income</h2>
            </div>
            <p className="text-2xl font-bold mt-2">
              {currencies[currency].symbol}{convertAmount(totalIncome)}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-red-500 h-5 w-5" />
              <h2 className="font-semibold">Total Expenses</h2>
            </div>
            <p className="text-2xl font-bold mt-2">
              {currencies[currency].symbol}{convertAmount(totalExpenses)}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount ({currencies[currency].symbol})</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  step="0.01"
                  placeholder={`Enter amount in ${currency}`}
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

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add Income</h2>
            <form onSubmit={handleAddIncome} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income-amount">Amount ({currencies[currency].symbol})</Label>
                <Input
                  id="income-amount"
                  type="number"
                  step="0.01"
                  placeholder={`Enter amount in ${currency}`}
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

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.map(item => ({
                ...item,
                amount: parseFloat(convertAmount(item.amount))
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `${currencies[currency].symbol}${value.toFixed(2)}`,
                    "Amount"
                  ]}
                />
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
