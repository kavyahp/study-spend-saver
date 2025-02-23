
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import { useState } from "react";
import { ExpenseProvider } from "@/contexts/ExpenseContext";

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ExpenseProvider>
        <TooltipProvider>
          <div className={isDarkMode ? "dark" : ""}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/" 
                  element={
                    <Dashboard 
                      isDarkMode={isDarkMode} 
                      setIsDarkMode={setIsDarkMode} 
                    />
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ExpenseProvider>
    </QueryClientProvider>
  );
};

export default App;
