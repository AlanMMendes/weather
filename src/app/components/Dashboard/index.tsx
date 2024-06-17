"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import { useContext } from "react";
import ChartWeather from "../Charts/ChartWeather";
import WeatherToday from "../WeatherToday";

const Dashboard = () => {
  const { filter } = useContext<any>(FilterContext);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter,
    filter.lat,
    filter.lon
  );

  return (
    <div className="w-full h-full">
      <div className="py-10 px-10">
        <span className="text-7xl font-thin text-black dark:text-white">
          {filter?.label}
        </span>
      </div>

      <div>
        <WeatherToday data={Response} loading={isLoadingResponse} />
      </div>
      <div className="grid grid-cols-4 gap-2 w-full py-10 px-10">
        <div className="w-full">
          <ChartWeather data={Response} loading={isLoadingResponse} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
