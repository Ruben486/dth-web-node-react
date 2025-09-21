import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  selectedCategory: string,
  setSelectedCategory: (category: string) => void,
  searchString: string,
  setSearchString: (search: string) => void,
};
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps { 
  children: ReactNode 
};
export const FilterProvider= ({children}:FilterProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState('000');
  const [searchString, setSearchString] = useState('');
  const value: FilterContextType = {
    selectedCategory,
    setSelectedCategory,
    searchString,
    setSearchString
  }; 
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
};

export const useFilter= ():FilterContextType => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter debe estar dentro de un contexto')
  }
  return context;
}
