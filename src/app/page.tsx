"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import Image from "next/image";
import { useContext } from "react";
import Clouds from "./components/Assets/clouds.svg";
import Rain from "./components/Assets/rain.svg";
import Sunny from "./components/Assets/sunny.svg";
import WeatherFilter from "./components/WeatherFilter";

import MapChart from "./components/Map";
import WeatherToday from "./components/WeatherToday";

export default function Home() {
  const { filter } = useContext<any>(FilterContext);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter,
    filter.lat,
    filter.lon
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var now = new Date(Response?.list[0]?.dt_txt);
  var day = days[now.getDay()];
  const data = { timezone: Response?.city?.timezone || 0 };
  const hoursTz =
    -Math?.sign(data.timezone) * Math?.floor(Math?.abs(data?.timezone) / 3600);
  const sign = hoursTz >= 0 ? "+" : "";
  const timeNow = new Date();

  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return (
        <Image src={Clouds} alt={"Clouds"} width={size} className="px-2" />
      );
    } else if (type === "Rain") {
      return <Image src={Rain} alt={"Rain"} width={size} className="px-2" />;
    } else if (type === "Clear") {
      return <Image src={Sunny} alt={"Sunny"} width={size} className="px-2" />;
    }
  };

  return (
    <div className="flex flex-col gap-1 lg:flex-row md:flex-row w-full h-full  ">
      <div className="flex shadow-lg bg-white  rounded-br-3xl flex-col w-full h-screen ">
        <div className="flex flex-col gap-5 py-5 w-full px-1 items-start ">
          <WeatherFilter />
          <div className="absolute top-0 left-0 scale-175 z-0 ">
            {selectedIcon(Response?.list[0]?.weather[0]?.main, 280)}
          </div>
          <div className="flex flex-col z-50 ">
            <div className=" text-black">
              <span className="text-7xl justify-start">
                {Math.round(Response?.list[0]?.main?.temp)}
                <span className="text-2xl">°c</span>
              </span>
            </div>
            <div>
              <span className="text-2xl text-black justify-start">
                {day},{" "}
                {timeNow?.toLocaleTimeString("us-EN", {
                  timeZone: `Etc/GMT${sign}${hoursTz}`,
                })}
              </span>
            </div>
          </div>
          <div className="w-full mt-32">
            <WeatherToday data={Response} />
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-1 flex flex-col gap-2 h-screen ">
        <div className="h-96">
          <MapChart />
        </div>
      </div>
    </div>
  );
}
