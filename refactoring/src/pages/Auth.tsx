
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const { user, signIn, isLoading } = useAuth();
  const [email, setEmail] = useState("two.kzqq7@passmail.net");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    try {
      const { error } = await signIn(email);
        
      if (error) {
        setError(error.message);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="mb-6 text-center">
            <Link to="/" className="mb-4 inline-block">
              <span className="text-2xl font-bold">Security for the Rest of Us</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in with magic link (no password needed)
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <Alert className="mb-4 border-green-500 text-green-700 dark:border-green-400 dark:text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We've sent a magic link to {email}. Click the link to sign in.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Admin Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending Link..." : "Send Magic Link"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
