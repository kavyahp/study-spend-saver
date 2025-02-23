
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 glass">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-600 mt-2">
            Get started with expense tracking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Button
            variant="link"
            className="text-primary p-0"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
