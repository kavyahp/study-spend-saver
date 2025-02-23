
import { createContext, useContext, useState, ReactNode } from 'react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: string;
}

interface Budget {
  category: string;
  limit: number;
}

interface ExpenseContextType {
  expenses: Expense[];
  income: Income[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  setBudget: (budget: Budget) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = {
      ...income,
      id: crypto.randomUUID()
    };
    setIncome(prev => [...prev, newIncome]);
  };

  const setBudget = (budget: Budget) => {
    setBudgets(prev => {
      const filtered = prev.filter(b => b.category !== budget.category);
      return [...filtered, budget];
    });
  };

  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        income, 
        budgets, 
        addExpense, 
        addIncome, 
        setBudget 
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
