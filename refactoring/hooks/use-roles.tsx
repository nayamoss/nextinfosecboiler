
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/sonner";

export type UserRole = "admin" | "editor" | "author" | "subscriber" | "user" | "professional" | "enterprise";

export interface UserRoleData {
  id: string;
  userId: string;
  role: UserRole;
}

type RolesContextType = {
  roles: UserRole[];
  isLoading: boolean;
  error: string | null;
  checkRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  addRole: (userId: string, role: UserRole) => Promise<void>;
  removeRole: (userId: string, role: UserRole) => Promise<void>;
  refreshRoles: () => Promise<void>;
};

const RolesContext = createContext<RolesContextType | undefined>(undefined);

// Special admin data
const ADMIN_EMAIL = "two.kzqq7@passmail.net";
const ADMIN_USER_ID = "23789517-f96f-436a-b17d-d7b8c2fbccaa";

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const { user, subscription } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRoles = async () => {
    if (!user) {
      setRoles([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching roles for user ID:", user.id);
      console.log("User email:", user.email);
      
      // Special case for admin user
      if (user.email === ADMIN_EMAIL || user.id === ADMIN_USER_ID) {
        console.log("This is an admin user by configuration");
        
        // Still fetch from DB to check if the role exists there too
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        // Map the roles from the database
        let userRoles = data.map((item) => item.role) as UserRole[];
        
        // Ensure admin role is included for this special user
        if (!userRoles.includes("admin")) {
          console.log("Adding admin role for configured admin user");
          userRoles.push("admin");
          
          // Try to add the admin role to the database if it doesn't exist
          try {
            await supabase
              .from("user_roles")
              .insert({ user_id: user.id, role: "admin" as any })
              .eq("user_id", user.id);
            console.log("Added admin role to database");
          } catch (err) {
            console.log("Could not add admin role to database:", err);
            // Don't throw, we still want to set the role in the frontend
          }
        }
        
        console.log("Admin user roles:", userRoles);
        setRoles(userRoles);
      } else {
        // Regular user role fetching
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        // Map the roles from the database
        const userRoles = data.map((item) => item.role) as UserRole[];
        
        console.log("Retrieved user roles:", userRoles);
        
        // Add subscription tier as a role if it exists
        if (subscription.tier) {
          userRoles.push(subscription.tier as UserRole);
        }
        
        // Ensure regular users have at least 'user' role
        if (userRoles.length === 0) {
          userRoles.push("user");
        }

        setRoles(userRoles);
      }
    } catch (err) {
      console.error("Error fetching user roles:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch user roles");
      
      // Set default roles even if there's an error
      if (user.email === ADMIN_EMAIL || user.id === ADMIN_USER_ID) {
        setRoles(["admin", "user"]);
      } else {
        setRoles(["user"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRoles = async () => {
    await fetchUserRoles();
  };

  useEffect(() => {
    fetchUserRoles();
  }, [user, subscription.tier]);

  const checkRole = (role: UserRole): boolean => {
    // Special case for admin email
    if ((user?.email === ADMIN_EMAIL || user?.id === ADMIN_USER_ID) && role === "admin") {
      return true;
    }
    return roles.includes(role) || roles.includes("admin");
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    // Special case for admin email
    if ((user?.email === ADMIN_EMAIL || user?.id === ADMIN_USER_ID) && requiredRoles.includes("admin")) {
      return true;
    }
    if (roles.includes("admin")) return true; // Admin has all permissions
    return requiredRoles.some((role) => roles.includes(role));
  };

  const addRole = async (userId: string, role: UserRole) => {
    try {
      // Check if the current user has admin rights
      if (!roles.includes("admin")) {
        throw new Error("You don't have permission to add roles");
      }

      // We need to use the correct field names for the database
      // Cast the role to any to bypass TypeScript's type checking since we know what we're doing
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: role as any });

      if (error) {
        if (error.code === "23505") {
          // Duplicate key error - user already has this role
          toast("Role already assigned", {
            description: `The user already has the ${role} role.`,
          });
          return;
        }
        throw new Error(error.message);
      }

      toast("Role added", {
        description: `Successfully added ${role} role.`,
      });

      // If adding a role to the current user, refresh roles
      if (userId === user?.id) {
        await refreshRoles();
      }
    } catch (err) {
      console.error("Error adding role:", err);
      toast("Error adding role", {
        description: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };

  const removeRole = async (userId: string, role: UserRole) => {
    try {
      // Check if the current user has admin rights
      if (!roles.includes("admin")) {
        throw new Error("You don't have permission to remove roles");
      }

      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role as any); // Cast to any to bypass type checking

      if (error) {
        throw new Error(error.message);
      }

      toast("Role removed", {
        description: `Successfully removed ${role} role.`,
      });

      // If removing a role from the current user, refresh roles
      if (userId === user?.id) {
        await refreshRoles();
      }
    } catch (err) {
      console.error("Error removing role:", err);
      toast("Error removing role", {
        description: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };

  const value = {
    roles,
    isLoading,
    error,
    checkRole,
    hasAnyRole,
    addRole,
    removeRole,
    refreshRoles,
  };

  return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
}

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (context === undefined) {
    throw new Error("useRoles must be used within a RolesProvider");
  }
  return context;
};
