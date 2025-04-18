
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

import { 
  Menu, 
  Sun,
  Moon,
  User, 
  LogOut, 
  CreditCard, 
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

type SiteNavigationProps = {
  dark?: boolean;
};

const SiteNavigation = ({ dark = false }: SiteNavigationProps) => {
  const { user, subscription, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Function to check if the current page is active
  const isActive = (path: string) => location.pathname === path;

  // Toggle the mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Close the mobile menu
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
  };

  return (
    <nav className={`w-full py-4 px-4 flex items-center justify-between ${dark ? 'bg-black/80 backdrop-blur-md text-white' : ''}`}>
      <div className="flex items-center">
        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center">
          <Shield className="h-8 w-8 text-primary mr-2" />
          <span className="font-bold text-xl">Security for the Rest of Us</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link 
            to="/"
            className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary font-medium' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/newsletters"
            className={`hover:text-primary transition-colors ${isActive('/newsletters') ? 'text-primary font-medium' : ''}`}
          >
            Newsletters
          </Link>
          <Link 
            to="/pricing"
            className={`hover:text-primary transition-colors ${isActive('/pricing') ? 'text-primary font-medium' : ''}`}
          >
            Pricing
          </Link>
          <Link 
            to="/image-generator"
            className={`hover:text-primary transition-colors ${isActive('/image-generator') ? 'text-primary font-medium' : ''}`}
          >
            Image Generator
          </Link>
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className={dark ? 'text-white hover:text-white hover:bg-white/20' : ''}
        >
          {theme.mode === 'dark' ? 
            <Sun className="h-5 w-5" /> : 
            <Moon className="h-5 w-5" />
          }
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {user.email && user.email.split('@')[0]}
                {subscription.isSubscribed && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full ml-1 capitalize">
                    {subscription.tier}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/account" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              {user && (
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/pricing" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className={dark ? 'text-white hover:text-white hover:bg-white/20 mr-2' : 'mr-2'}
        >
          {theme.mode === 'dark' ? 
            <Sun className="h-5 w-5" /> : 
            <Moon className="h-5 w-5" />
          }
        </Button>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={dark ? 'text-white hover:text-white hover:bg-white/20' : ''}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetHeader className="mb-6">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`py-2 px-4 rounded-md hover:bg-muted ${isActive('/') ? 'bg-muted font-medium' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/newsletters" 
                className={`py-2 px-4 rounded-md hover:bg-muted ${isActive('/newsletters') ? 'bg-muted font-medium' : ''}`}
                onClick={closeMobileMenu}
              >
                Newsletters
              </Link>
              <Link 
                to="/pricing" 
                className={`py-2 px-4 rounded-md hover:bg-muted ${isActive('/pricing') ? 'bg-muted font-medium' : ''}`}
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/image-generator" 
                className={`py-2 px-4 rounded-md hover:bg-muted ${isActive('/image-generator') ? 'bg-muted font-medium' : ''}`}
                onClick={closeMobileMenu}
              >
                Image Generator
              </Link>
              
              <div className="h-px bg-border my-2"></div>
              
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    className={`py-2 px-4 rounded-md hover:bg-muted flex items-center gap-2 ${isActive('/account') ? 'bg-muted font-medium' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={`py-2 px-4 rounded-md hover:bg-muted flex items-center gap-2 ${isActive('/dashboard') ? 'bg-muted font-medium' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <Settings className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className="py-2 px-4 rounded-md hover:bg-muted text-left flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default SiteNavigation;
