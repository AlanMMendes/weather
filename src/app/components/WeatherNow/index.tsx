"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import Image from "next/image";
import { useContext } from "react";
import Clouds from "../Assets/clouds.svg";
import Humidity from "../Assets/humidity.svg";
import Rain from "../Assets/rain.svg";
import Sunny from "../Assets/sunny.svg";
import Loading from "../Loading";

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
    <div className="w-auto h-auto flex space-y-0">
      {isLoadingResponse ? (
        <div className="h-screen flex items-start justify-center">
          <Loading />
        </div>
      ) : (
        <div className="h-full space-y-10">
          <div>{selectedIcon(Response?.list[0]?.weather[0]?.main, 300)}</div>
          <div className="dark:text-white text-black">
            <span className="text-7xl justify-start">
              {Math.round(Response?.list[0]?.main?.temp)}
              <span className="text-2xl">°c</span>
            </span>
          </div>
          <div>
            <span className="text-2xl dark:text-white text-black justify-start">
              {day},{" "}
              {timeNow?.toLocaleTimeString("us-EN", {
                timeZone: `Etc/GMT${sign}${hoursTz}`,
              })}
            </span>
          </div>

          <hr />
          <div className="flex justify-start items-center gap-2">
            <span className="text-2xl dark:text-white text-black">
              {selectedIcon(Response?.list[0]?.weather[0]?.main, 20)}{" "}
            </span>
            <span className="text-base  text-black dark:text-white">
              {Response?.list[0]?.weather[0]?.main}
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-2xl dark:text-white text-black">
              <Image src={Humidity} alt={""} width={20} />
            </span>
            <span className="text-base text-black dark:text-white">
              Humidity - {Response?.list[0]?.main?.humidity}%
            </span>
          </div>
          <div className="flex justify-center rounded-full h-64 items-center gap-2 border border-zinc-950 dark:border-gray-100">
            <span className="text-base text-black  dark:text-white ">
              {Response?.city?.name}/{Response?.city?.country}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherNow;
