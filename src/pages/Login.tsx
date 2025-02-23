
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporarily simulate login
    if (email && password) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your account.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 glass">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-2">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Button
            variant="link"
            className="text-primary p-0"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
