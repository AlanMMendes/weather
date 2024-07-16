"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import Image from "next/image";
import { useContext } from "react";
import Clouds from "../Assets/clouds.svg";
import Rain from "../Assets/rain.svg";
import Sunny from "../Assets/sunny.svg";
import ButtonTheme from "../ButtonTheme";
import Loading from "../Loading";
import WeatherFilter from "../WeatherFilter";
import "./style.css";

const WeatherNow = () => {
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

  console.log(filter);

  var now = new Date(Response?.list[0]?.dt_txt);
  var day = days[now.getDay()];

  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <Image src={Clouds} alt={""} width={size} />;
    } else if (type === "Rain") {
      return <Image src={Rain} alt={""} width={size} />;
    } else if (type === "Clear") {
      return <Image src={Sunny} alt={""} width={size} />;
    }
  };

  const data = { timezone: Response?.city?.timezone || 0 };
  const hoursTz =
    -Math?.sign(data.timezone) * Math?.floor(Math?.abs(data?.timezone) / 3600);
  const sign = hoursTz >= 0 ? "+" : "";
  const timeNow = new Date();

  return (
    <div className="flex flex-col h-full gap-5 w-full">
      <div className="flex items-center gap-2 justify-end ">
        <span className="text-lg text-white justify-end">
          {day},{" "}
          {timeNow?.toLocaleTimeString("us-EN", {
            timeZone: `Etc/GMT${sign}${hoursTz}`,
          })}
        </span>
        <ButtonTheme />
      </div>
      <WeatherFilter />
      {isLoadingResponse ? (
        <div className="h-screen flex items-start justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <span className="text-3xl">{filter.label}</span>
          <div className="flex flex-row h-full items-center justify-center">
            <span className="text-7xl justify-start">
              {Math.round(Response?.list[0]?.main?.temp)}
              <span className="text-2xl">°c</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherNow;
