"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import Image from "next/image";
import { useContext } from "react";
import Clouds from "./components/Assets/clouds.svg";
import Rain from "./components/Assets/rain.svg";
import Sunny from "./components/Assets/sunny.svg";
import WeatherNow from "./components/WeatherNow";
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
    <div className="flex flex-col px-5 py-2 dark:bg-zinc-900 w-full h-screen  ">
      <div className="flex rounded-br-3xl flex-col gap-10 justify-center items-center  ">
        <WeatherNow />
        <WeatherToday data={Response} />
      </div>
    </div>
  );
}
