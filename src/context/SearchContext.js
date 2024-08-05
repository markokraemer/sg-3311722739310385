import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/router';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (term) => {
    setSearchTerm(term);
    router.push(`/listings?search=${encodeURIComponent(term.trim())}`);
  };

  const value = {
    searchTerm,
    setSearchTerm,
    handleSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};