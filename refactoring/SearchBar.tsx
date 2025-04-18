
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  variant?: 'default' | 'compact';
  value?: string; // Add the value prop
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = "", 
  placeholder = "Search posts...",
  variant = 'default',
  value = '' // Set default value
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const navigate = useNavigate();

  // Update searchQuery when value prop changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative flex w-full items-center">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full ${variant === 'default' ? 'pl-10' : 'pl-9'} pr-4 ${
            variant === 'compact' ? 'h-9 text-sm' : 'h-10'
          } bg-white dark:bg-gray-800`}
        />
        {variant === 'default' && (
          <Button 
            type="submit" 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
