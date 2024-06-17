"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import { timeConverter } from "@/app/utils";
import { useContext } from "react";
import {
  FaCity,
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
} from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { GiPressureCooker } from "react-icons/gi";
import { TbTemperatureCelsius } from "react-icons/tb";
import ChartWeather from "../Charts/ChartWeather";
import MapChart from "../Map";
import TopCards from "../TopCards";
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
      <div className="flex flex-row justify-center gap-10 py-12 flex-wrap">
        <TopCards
          title={"Population"}
          content={Response?.city?.population || "Loading"}
          icon={<FaCity fontSize={40} />}
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Sunrise"}
          content={timeConverter(Response?.city?.sunrise) + "H" || "Loading"}
          icon={<FiSunrise fontSize={40} className="text-amber-400" />}
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Sunset"}
          content={timeConverter(Response?.city?.sunset) + "H" || "Loading"}
          icon={<FiSunset fontSize={40} className="text-red-600" />}
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Feels Like"}
          content={Response?.list[0]?.main?.feels_like + "(°C)" || "Loading"}
          icon={
            <TbTemperatureCelsius fontSize={40} className="text-teal-800" />
          }
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Max"}
          content={Response?.list[0]?.main?.temp_max + "(°C)" || "Loading"}
          icon={<FaTemperatureArrowUp fontSize={40} className="text-red-700" />}
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Min"}
          content={Response?.list[0]?.main?.temp_min + "(°C)" || "Loading"}
          icon={
            <FaTemperatureArrowDown fontSize={40} className="text-cyan-600" />
          }
          loading={isLoadingResponse}
        />
        <TopCards
          title={"Pressure"}
          content={Response?.list[0]?.main?.pressure || "Loading"}
          icon={<GiPressureCooker fontSize={40} />}
          loading={isLoadingResponse}
        />
      </div>

      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-1 ">
        <div className="col-span-3">
          <WeatherToday data={Response} loading={isLoadingResponse} />
        </div>
        <div className="col-span-2">
          <ChartWeather data={Response} loading={isLoadingResponse} />
        </div>
        <div>
          <MapChart />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
