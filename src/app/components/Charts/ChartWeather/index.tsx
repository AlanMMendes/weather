import { ThemeContext } from "@/app/hooks/context/theme";
import { useContext } from "react";
import ReactECharts, { ReactEChartsProps } from "../../Echarts/EchartGraphs";
import Loading from "../../Loading";

const ChartWeather = ({ data, loading }: any) => {
  const { theme } = useContext<any>(ThemeContext);

  const option: ReactEChartsProps["option"] = {
    grid: {
      width: "100%",
      height: "100%",
    },
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 200,
        splitNumber: 4,
        axisTick: {
          show: false,
        },
        itemStyle: {
          color: "#FFBF5E",
        },
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        splitLine: {
          show: false,
          distance: -52,
          length: 40,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -35,
          color: theme === "light" ? "black" : "white",
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 30,
          fontWeight: "bolder",
          formatter: "{value} km/h",
          color: "inherit",
        },
        data: [
          {
            value: Math.round(data?.list[0]?.wind?.speed),
          },
        ],
      },
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 200,
        itemStyle: {
          color: "#FFBF5E",
        },
        progress: {
          show: true,
          width: 8,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: Math.round(data?.list[0]?.wind?.speed),
          },
        ],
      },
    ],
  };
  return (
    <div className="w-96 h-full min-h-96 bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg">
      <h1 className="top-0 py-5 px-5 left-0 text-3xl text-black dark:text-white">
        Wind Speed
      </h1>
      {!loading && (
        <>
          {typeof window !== "undefined" && (
            <>
              <ReactECharts option={option} />
            </>
          )}
        </>
      )}

      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};
export default ChartWeather;
