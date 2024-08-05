"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "./config/i18n/index.ts";
import "./globals.css";
import ThemeProvider from "./hooks/context/theme";
import { store } from "./stores";
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
            <body className="bg-slate-200 dark:bg-zinc-950">{children}</body>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
