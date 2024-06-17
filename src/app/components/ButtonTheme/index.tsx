"use client";
import { ThemeContext } from "@/app/hooks/context/theme";
import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";

const ButtonTheme = () => {
  const { toggleTheme, theme } = useContext<any>(ThemeContext);

  return (
    <button
      onClick={() => toggleTheme()}
      className="flex dark:bg-yellow-400 shadow-lg  hover:bg-zinc-700 bg-white w-10 h-10 font-bold rounded-full justify-center items-center "
    >
      {theme === "light" ? (
        <MdDarkMode className="text-yellow-400 hover:text-white" />
      ) : (
        <MdDarkMode className="text-zinc-900 hover:text-white" />
      )}
    </button>
  );
};
export default ButtonTheme;
