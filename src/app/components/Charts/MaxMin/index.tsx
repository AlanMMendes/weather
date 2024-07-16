import { ThemeContext } from "@/app/hooks/context/theme";
import { useContext } from "react";
import Loading from "../../Loading";

const MaxMin = ({ data, loading }: any) => {
  const { theme } = useContext<any>(ThemeContext);

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg">
      <h1 className="top-0 py-5 px-5 left-0 text-3xl text-black dark:text-white">
        Forecast
      </h1>
      <div className="py-10 flex flex-col gap-5 text-black dark:text-white items-center">
        <div className="min-w-56 min-h-10 flex items-center justify-center rounded-lg shadow-lg dark:dark:shadow-zinc-950">
          {Math.round(data?.list[0]?.main?.feels_like)}
        </div>
        <div className="min-w-56 min-h-10 flex items-center justify-center rounded-lg shadow-lg dark:shadow-zinc-950">
          {Math.round(data?.list[0]?.main?.pressure)}
        </div>
        <div className="min-w-56 min-h-10 flex items-center justify-center rounded-lg shadow-lg dark:shadow-zinc-950">
          {Math.round(data?.list[0]?.main?.sea_level)}
        </div>
        <div className="min-w-56 min-h-10 flex items-center justify-center rounded-lg shadow-lg dark:shadow-zinc-950">
          {Math.round(data?.list[0]?.main?.temp_max)}
        </div>
        <div className="min-w-56 min-h-10 flex items-center justify-center rounded-lg shadow-lg dark:shadow-zinc-950">
          {Math.round(data?.list[0]?.main?.temp_min)}
        </div>
      </div>
      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};
export default MaxMin;
