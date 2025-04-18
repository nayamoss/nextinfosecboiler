
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  subscription: {
    isSubscribed: boolean;
    tier: string | null;
    expiresAt: string | null;
  };
  signIn: (email: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState({
    isSubscribed: false,
    tier: null as string | null,
    expiresAt: null as string | null
  });
  const navigate = useNavigate();

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }
      
      setSubscription({
        isSubscribed: data.subscribed || false,
        tier: data.subscription_tier || null,
        expiresAt: data.subscription_end || null
      });
    } catch (error) {
      console.error('Failed to check subscription status:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast.success("Signed in successfully");
          // Check subscription status on sign in
          setTimeout(() => {
            checkSubscription();
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          toast.success("Signed out successfully");
          // Reset subscription state on sign out
          setSubscription({
            isSubscribed: false,
            tier: null,
            expiresAt: null
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session?.user?.email || "No session");
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Check subscription status for existing session
      if (session?.user) {
        setTimeout(() => {
          checkSubscription();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      // Use the current origin for the redirect URL
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log("Using redirect URL:", redirectTo);
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      return { error };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: error as Error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const value = {
    user,
    session,
    isLoading,
    subscription,
    signIn,
    signOut,
    checkSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
