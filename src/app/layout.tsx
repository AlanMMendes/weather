"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./data/stores";
import "./globals.css";
import FilterProvider from "./hooks/context/filter";
import ThemeProvider from "./hooks/context/theme";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 3,
      staleTime: 1000 * 60 * 3,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <FilterProvider>
              <body className="bg-slate-200 dark:bg-zinc-950">{children}</body>
            </FilterProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
