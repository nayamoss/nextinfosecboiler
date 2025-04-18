
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          setError(error.message);
          return;
        }

        // Successfully authenticated, redirect to home
        console.log("Auth successful, redirecting to home");
        navigate("/");
        toast.success("Successfully signed in");
      } catch (err) {
        console.error("Unexpected auth callback error:", err);
        setError("An unexpected error occurred during authentication");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Authentication Error
          </h1>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate("/auth")}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Signing you in...
        </h1>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full animate-pulse bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
