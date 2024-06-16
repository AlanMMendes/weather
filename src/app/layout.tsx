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
          <body className="bg-white dark:bg-slate-800">{children}</body>
        </FilterProvider>
      </ThemeProvider>
    </html>
  );
}
