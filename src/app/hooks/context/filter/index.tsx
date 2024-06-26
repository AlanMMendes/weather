"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const FilterContext: any = createContext(null);
const queryClient = new QueryClient();

export const FilterProvider = ({ children }: any) => {
  const [filter, setFilter] = useState<any>({
    label: "",
    lat: 0,
    lon: 0,
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </FilterContext.Provider>
  );
};

export default FilterProvider;
