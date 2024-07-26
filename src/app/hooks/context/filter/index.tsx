"use client";
import { createContext, useState } from "react";

export const FilterContext: any = createContext({} as any);

export const FilterProvider = ({ children }: any) => {
  const [filter, setFilter] = useState<any>({
    label: "",
    lat: 0,
    lon: 0,
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
