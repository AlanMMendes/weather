import { ThemeContext } from "@/app/hooks/context/theme";
import { useContext } from "react";
import Loading from "../../Loading";

const MaxMin = ({ data, loading }: any) => {
  const { theme } = useContext<any>(ThemeContext);

  return (
    <div className="w-96 h-full min-h-96 bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg">
      <h1 className="top-0 py-5 px-5 left-0 text-3xl text-black dark:text-white"></h1>

      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};
export default MaxMin;
