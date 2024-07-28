"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import { useContext } from "react";
import ChartWeather from "../Charts/ChartWeather";
import MaxMin from "../Charts/MaxMin";
import Loading from "../Loading";
import MapChart from "../Map";
import WeatherToday from "../WeatherToday";

const Dashboard = () => {
  const { filter } = useContext<any>(FilterContext);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter,
    filter.lat,
    filter.lon
  );

  return (
    <div className="">
      <div className="py-1">
        <div className="flex items-center justify-start w-3/5 h-24 ">
          <span className="text-7xl font-thin text-black dark:text-white">
            {isLoadingResponse ? "Loading ..." : filter?.label}
          </span>
        </div>

        <div className="flex h-auto rounded-lg  min-h-96 w-full justify-center items-center">
          {isLoadingResponse ? (
            <Loading />
          ) : (
            <WeatherToday data={Response} loading={isLoadingResponse} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        <div className="col-span-2">
          <ChartWeather data={Response} loading={isLoadingResponse} />
        </div>
        <div className="col-span-1">
          <MaxMin data={Response} loading={isLoadingResponse} />
        </div>
        <div className="col-span-1">
          <MapChart />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
