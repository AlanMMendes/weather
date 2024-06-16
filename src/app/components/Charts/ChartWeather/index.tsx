import { ThemeContext } from "@/app/hooks/context/theme";
import { getDay } from "@/app/utils";
import { useContext } from "react";
import ReactECharts, { ReactEChartsProps } from "../../Echarts/EchartGraphs";
import Loading from "../../Loading";

const ChartWeather = ({ data, loading }: any) => {
  const { theme } = useContext<any>(ThemeContext);

  const xAxis = data?.list?.map((item: any) => getDay(item?.dt));
  const yAxis = data?.list?.map((item: any) => item?.wind?.speed);

  const option: ReactEChartsProps["option"] = {
    tooltip: {},
    grid: {
      height: "80%",
      width: "95%",
      right: "3%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: theme === "light" ? "black" : "white",
      },
      data: xAxis,
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: theme === "light" ? "black" : "white",
      },
    },
    series: [
      {
        data: yAxis,
        type: "line",
      },
    ],
  };

  return (
    <div className="w-full h-full min-h-96 bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-md px-10 py-5">
      <h1 className="top-0 left-0 text-3xl text-black dark:text-white">
        Wind Speed
      </h1>
      {!loading && (
        <>
          {typeof window !== "undefined" && (
            <>
              <ReactECharts
                option={option}
                style={{
                  height: "20rem",
                }}
              />
            </>
          )}
        </>
      )}

      {loading && (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};
export default ChartWeather;
