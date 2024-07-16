"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import moment from "moment";
import Image from "next/image";
import { useContext } from "react";
import SunnyIcon from "./components/Assets/clearIcon.svg";
import ClearSmall from "./components/Assets/clearSmall.svg";
import CloudRain from "./components/Assets/cloudIcon.svg";
import CloudSmall from "./components/Assets/cloudSmall.svg";
import Humidity from "./components/Assets/humidity.svg";
import MaxTemperature from "./components/Assets/maxIcon.svg";
import RainSmall from "./components/Assets/rainSmall.svg";
import RainIcon from "./components/Assets/rainyIcon.svg";
import Wind from "./components/Assets/wind.svg";
import ButtonTheme from "./components/ButtonTheme";
import WeatherFilter from "./components/WeatherFilter";

export default function Home() {
  const { filter } = useContext<any>(FilterContext);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter,
    filter.lat,
    filter.lon
  );

  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <Image src={CloudRain} alt={"Clouds"} width={size} />;
    } else if (type === "Rain") {
      return (
        <Image src={RainIcon} alt={"Rain"} width={size} className="px-2" />
      );
    } else if (type === "Clear") {
      return (
        <Image src={SunnyIcon} alt={"Sunny"} width={size} className="px-2 " />
      );
    }
  };

  const selectedSmallIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <Image src={CloudSmall} alt={"CloudSmall"} width={size} />;
    } else if (type === "Rain") {
      return <Image src={RainSmall} alt={"RainSmall"} width={size} />;
    } else if (type === "Clear") {
      return <Image src={ClearSmall} alt={"ClearSmall"} width={size} />;
    }
  };

  const selectedBg = (type: any) => {
    if (type === "Clouds") {
      return "bg-white text-black dark:bg-zinc-950 dark:text-white";
    } else if (type === "Rain") {
      return "bg-gradient-to-r from-sky-500 to-sky-400 text-white";
    } else if (type === "Clear") {
      return "bg-gradient-to-r from-cyan-400 to-amber-200 text-white";
    }
  };

  return (
    <div className="lg:flex-row lg:gap-1 min-h-screen flex-col dark:bg-zinc-900 lg:dark:bg-zinc-900 lg:bg-gray-100 lg:h-auto lg:min-h-screen md:min-h-screen md:h-auto lg:w-96">
      <div className=" flex-col py-2 h-full px-2  gap-2  lg:rounded-lg lg:w-96  lg:h-auto md:h-auto">
        <div className="flex flex-col max-w-full lg:max-w-96 md:max-w-full items-center lg:items-center md:items-center justify-center text-black   gap-3">
          <div className="flex flex-row gap-2 ">
            <WeatherFilter />
            <ButtonTheme />
          </div>
          <div className="flex  flex-col items-center justify-center  dark:text-white bg-white dark:bg-zinc-950 w-full max-w-96 rounded-3xl">
            <span className="text-3xl font-thin">{filter?.label}</span>
            {selectedIcon(Response?.list[0]?.weather[0]?.main, 300)}
          </div>
          <div className="flex flex-col justify-center items-center bg-white dark:text-white dark:bg-zinc-950 rounded-3xl w-full max-w-96">
            <span className="font-bold text-8xl">
              {Math.round(Response?.list[0].main.temp)}°
            </span>
            <span className="text-gray-400 text-lg">
              {Response?.list[0].weather[0].description}
            </span>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2">
            <div className="shadow-md min-h-24 bg-white rounded-3xl dark:bg-zinc-950 dark:text-white gap-1 flex flex-col justify-center items-center min-w-24">
              <Image src={Wind} alt={"Wind"} width={25} />
              <span className="font-medium text-sm">
                {Math.round(Response?.list[0]?.wind?.speed)} km/h
              </span>
              <span className="text-gray-400">Wind</span>
            </div>
            <div className="shadow-md min-h-24 bg-white dark:bg-zinc-950 dark:text-white rounded-3xl  gap-1 flex flex-col  justify-center items-center min-w-24">
              <Image src={Humidity} alt={"Humidity"} width={15} />
              <span className="font-medium text-sm">
                {Math.round(Response?.list[0]?.main?.humidity)}%
              </span>
              <span className="text-gray-400">Humidity</span>
            </div>
            <div className="shadow-md min-h-24 bg-white rounded-3xl dark:bg-zinc-950 dark:text-white gap-1 flex flex-col justify-center items-center min-w-24">
              <Image src={MaxTemperature} alt={"MaxTemperature"} width={15} />
              <span className="font-medium text-sm">
                {Math.round(Response?.list[0]?.main?.temp_max)}°
              </span>
              <span className="text-gray-400">Max</span>
            </div>
          </div>
        </div>
        <div className="flex py-2 flex-col justify-center items-start md:items-center md:justify-start  lg:items-start lg:justify-start text-black">
          <div>
            <span className="font-medium text-lg dark:text-white">Today</span>
          </div>
        </div>
        <div className="flex flex-row justify-center flex-wrap gap-2">
          {Response?.list?.slice(0, 4)?.map((item: any) => {
            return (
              <div
                className={`shadow-md min-h-24 ${selectedBg(
                  item?.weather[0]?.main
                )} rounded-3xl gap-1 flex flex-col justify-center items-center min-w-20`}
              >
                <span className="font-medium text-sm">
                  {Math.round(item?.main?.temp)}°
                </span>
                {selectedSmallIcon(item?.weather[0]?.main, 40)}
                <span className="font-medium text-sm ">
                  {moment(item?.dt_txt)?.format("HH:mm")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
