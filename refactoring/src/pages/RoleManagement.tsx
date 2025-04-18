import React, { useState, useEffect } from 'react';
import SettingsSidebar from '@/components/SettingsSidebar';
import { useRoles, UserRole } from '@/hooks/use-roles';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Home, User, Search, Shield, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserWithRoles {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  roles: UserRole[];
  subscription?: string;
}

const RoleManagement = () => {
  const { addRole, removeRole, checkRole } = useRoles();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('user');
  const [userToUpdate, setUserToUpdate] = useState<string | null>(null);
  const [roleToRemove, setRoleToRemove] = useState<UserRole | null>(null);
  
  const availableRoles: UserRole[] = ['admin', 'editor', 'author', 'subscriber', 'user'];
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      if (!checkRole('admin')) {
        setUsers([]);
        setLoading(false);
        toast("Access Denied", {
          description: "You don't have permission to view user roles."
        });
        return;
      }
      
      const { data: userData, error: userError } = await supabase.functions.invoke('admin-get-users');
      
      if (userError) {
        throw new Error(`Error fetching users: ${userError.message}`);
      }
      
      if (!userData || !Array.isArray(userData)) {
        setUsers([]);
        setLoading(false);
        return;
      }
      
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id, role');
        
      if (roleError) {
        throw new Error(`Error fetching roles: ${roleError.message}`);
      }
      
      const userRolesMap: Record<string, UserRole[]> = {};
      
      roleData?.forEach((roleEntry) => {
        const userId = roleEntry.user_id;
        if (!userRolesMap[userId]) {
          userRolesMap[userId] = [];
        }
        userRolesMap[userId].push(roleEntry.role as UserRole);
      });
      
      const usersWithRoles: UserWithRoles[] = userData.map((user: any) => ({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split('@')[0],
        created_at: user.created_at,
        roles: userRolesMap[user.id] || ['user'],
        subscription: user.app_metadata?.subscription || null
      }));
      
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users with roles:', error);
      toast("Error", {
        description: error instanceof Error ? error.message : "Failed to fetch users"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddRole = async () => {
    if (!userToUpdate || !newRole) return;
    
    await addRole(userToUpdate, newRole);
    await fetchUsers();
    setUserToUpdate(null);
  };
  
  const handleRemoveRole = async () => {
    if (!userToUpdate || !roleToRemove) return;
    
    await removeRole(userToUpdate, roleToRemove);
    await fetchUsers();
    setUserToUpdate(null);
    setRoleToRemove(null);
  };
  
  const isUserPremium = (user: UserWithRoles) => {
    return user.subscription && ['professional', 'enterprise'].includes(user.subscription);
  };
  
  return (
    <div className="flex h-full bg-background text-foreground">
      <SettingsSidebar />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Role Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Role Management</h2>
          <p className="text-muted-foreground mb-8">
            Manage user roles and permissions across your application.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>
              View and edit user roles. Higher roles have more permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by email or name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {loading ? (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-8 text-center">
                <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium">No users found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchTerm ? "Try a different search term" : "Add users to your application to see them here"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Current Roles</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span 
                                key={`${user.id}-${role}`} 
                                className={`px-2 py-1 text-xs font-medium rounded-full
                                  ${role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                                   role === 'editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                   role === 'author' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                   role === 'subscriber' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                   'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full
                            ${isUserPremium(user) ? 
                              'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                          >
                            {isUserPremium(user) ? user.subscription : 'Free'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setUserToUpdate(user.id)}
                                >
                                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                                  Add Role
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Add role to user</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Select a role to add to {user.name || user.email}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="my-4">
                                  <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Available Roles</SelectLabel>
                                        {availableRoles.map((role) => (
                                          <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleAddRole}>Add Role</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setUserToUpdate(user.id)}
                                  disabled={user.roles.length <= 1}
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1 text-red-500" />
                                  Remove
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove role from user</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Select a role to remove from {user.name || user.email}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="my-4">
                                  <Select onValueChange={(value) => setRoleToRemove(value as UserRole)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a role to remove" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Current Roles</SelectLabel>
                                        {user.roles.map((role) => (
                                          <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={handleRemoveRole}
                                  >
                                    Remove Role
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Overview of access rights for each role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Access Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Admin</span>
                    </div>
                  </TableCell>
                  <TableCell>Full access to all areas and features</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      Highest
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Editor</span>
                    </div>
                  </TableCell>
                  <TableCell>Can edit all content but cannot manage users or settings</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      High
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Author</span>
                    </div>
                  </TableCell>
                  <TableCell>Can create and edit their own content only</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Medium
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Subscriber</span>
                    </div>
                  </TableCell>
                  <TableCell>Can access premium content but cannot create content</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      Low
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">User</span>
                    </div>
                  </TableCell>
                  <TableCell>Basic access to public areas only</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      Lowest
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleManagement;
