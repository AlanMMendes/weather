import type { Metadata } from "next";
import "./globals.css";
import FilterProvider from "./hooks/context/filter";
import ThemeProvider from "./hooks/context/theme";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App using https://openweathermap.org/api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <FilterProvider>
          <body className="bg-gray-200 dark:bg-zinc-950">{children}</body>
        </FilterProvider>
      </ThemeProvider>
    </html>
  );
}
