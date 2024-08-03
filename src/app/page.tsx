"use client";
import { FilterContext } from "@/app/hooks/context/filter";
import useWeather from "@/app/hooks/useFilter";
import moment from "moment";
import Image from "next/image";
import { useContext } from "react";
import cityIcon from "../../public/city.svg";
import sunnyIcon from "../../public/clearIcon.svg";
import clearSmall from "../../public/clearSmall.svg";
import cloudRain from "../../public/cloudIcon.svg";
import cloudSmall from "../../public/cloudSmall.svg";
import humidity from "../../public/humidity.svg";
import maxTemperature from "../../public/max-temperature.svg";
import rainSmall from "../../public/rainSmall.svg";
import rainIcon from "../../public/rainyIcon.svg";
import sunriseIcon from "../../public/sunrise.svg";
import sunsetIcon from "../../public/sunset.svg";
import timezoneIcon from "../../public/timezone.svg";
import wind from "../../public/wind.svg";
import ButtonTheme from "./components/ButtonTheme";
import Example from "./components/Charts/WindChart";
import Loading from "./components/Loading";
import MapChart from "./components/Map";
import TopCards from "./components/TopCards";
import WeatherFilter from "./components/WeatherFilter";

export default function Home() {
  const { filter } = useContext<any>(FilterContext);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter?.lat,
    filter?.lon,
    filter
  );

  console.log(Response);

  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return (
        <Image src={cloudRain} alt={"Clouds"} width={size} className="px-2" />
      );
    } else if (type === "Rain") {
      return (
        <Image src={rainIcon} alt={"Rain"} width={size} className="px-2" />
      );
    } else if (type === "Clear") {
      return (
        <Image src={sunnyIcon} alt={"Sunny"} width={size} className="px-2" />
      );
    }
  };

  const selectedSmallIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <Image src={cloudSmall} alt={"CloudSmall"} width={size} />;
    } else if (type === "Rain") {
      return <Image src={rainSmall} alt={"RainSmall"} width={size} />;
    } else if (type === "Clear") {
      return <Image src={clearSmall} alt={"ClearSmall"} width={size} />;
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
    <div className="flex lg:flex-row flex-col  ">
      <div className="lg:flex-row lg:gap-1 flex-col dark:bg-zinc-900 lg:dark:bg-zinc-900 h-full lg:bg-gray-100 lg:h-auto lg:min-h-screen md:h-auto lg:w-96">
        <div className="flex-col py-2 h-full px-2 gap-0 lg:rounded-lg lg:w-96 lg:h-auto md:h-auto">
          <div className="flex flex-col max-w-full lg:max-w-96 md:max-w-full items-center lg:items-center md:items-center justify-center text-black gap-3">
            <div className="flex flex-row gap-2 ">
              <ButtonTheme />
              <WeatherFilter />
            </div>
            <div className="flex flex-col min-h-80 items-center justify-center  dark:text-white bg-white dark:bg-zinc-950 w-full max-w-96 rounded-3xl">
              {isLoadingResponse ? (
                <Loading extraClass={"w-12 h-12"} />
              ) : (
                <>
                  <span className="text-3xl font-thin">{filter?.label}</span>
                  {selectedIcon(Response?.list[0]?.weather[0]?.main, 300)}
                </>
              )}
            </div>
            <div className="flex flex-col min-h-32 justify-center items-center bg-white dark:text-white dark:bg-zinc-950 rounded-3xl w-full max-w-96">
              {isLoadingResponse ? (
                <Loading extraClass={"w-10 h-10"} />
              ) : (
                <>
                  <span className="font-bold text-8xl">
                    {Math.round(Response?.list[0].main.temp)}°
                  </span>
                  <span className="text-gray-400 text-lg">
                    {Response?.list[0].weather[0].description}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center gap-2">
              <div className="shadow-md min-h-24 hover:scale-105 bg-white rounded-3xl dark:bg-zinc-950 dark:text-white gap-1 flex flex-col justify-center items-center min-w-24">
                {isLoadingResponse ? (
                  <Loading extraClass={"w-5 h-5"} />
                ) : (
                  <>
                    <Image src={wind} alt={"Wind"} width={25} />
                    <span className="font-medium text-sm">
                      {Math.round(Response?.list[0]?.wind?.speed)} km/h
                    </span>
                    <span className="text-gray-400">Wind</span>
                  </>
                )}
              </div>
              <div className="shadow-md min-h-24 hover:scale-105 bg-white rounded-3xl dark:bg-zinc-950 dark:text-white gap-1 flex flex-col justify-center items-center min-w-24">
                {isLoadingResponse ? (
                  <Loading extraClass={"w-5 h-5"} />
                ) : (
                  <>
                    <Image src={humidity} alt={"Humidity"} width={25} />
                    <span className="font-medium text-sm">
                      {Math.round(Response?.list[0]?.main?.humidity)}%
                    </span>
                    <span className="text-gray-400">Humidity</span>
                  </>
                )}
              </div>
              <div className="shadow-md min-h-24 hover:scale-105 bg-white rounded-3xl dark:bg-zinc-950 dark:text-white gap-1 flex flex-col justify-center items-center min-w-24">
                {isLoadingResponse ? (
                  <Loading extraClass={"w-5 h-5"} />
                ) : (
                  <>
                    <Image
                      src={maxTemperature}
                      alt={"MaxTemperature"}
                      width={25}
                    />
                    <span className="font-medium text-sm">
                      {Math.round(Response?.list[0]?.main?.temp_max)}°
                    </span>
                    <span className="text-gray-400">Max</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flexflex-col justify-center items-start md:items-center  md:justify-start  lg:items-start lg:justify-start text-black">
            <div>
              <span className="font-medium text-lg dark:text-white">Today</span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center flex-wrap gap-2 bg-white dark:bg-zinc-950 shadow-md rounded-3xl  min-h-60">
            {isLoadingResponse ? (
              <Loading extraClass={"w-12 h-12"} />
            ) : (
              <>
                {Response?.list?.slice(0, 6)?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`shadow-md min-h-24 hover:scale-105  ${selectedBg(
                        item?.weather[0]?.main
                      )} rounded-3xl gap-1 flex flex-col justify-center items-center min-w-20 border shadow-xl`}
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col text-black px-2 gap-2 w-full">
        <div className="flex flex-row justify-center gap-5 items-center align-middle flex-wrap ">
          <TopCards
            title={"Sunrise"}
            icon={sunriseIcon}
            content={moment(Response?.city?.sunrise)?.format("HH:mm")}
            loading={isLoadingResponse}
          />
          <TopCards
            title={"Sunset"}
            icon={sunsetIcon}
            content={moment(Response?.city?.sunset)?.format("HH:mm")}
            loading={isLoadingResponse}
          />
          <TopCards
            title={"Population"}
            icon={cityIcon}
            content={Response?.city?.population}
            loading={isLoadingResponse}
          />
          <TopCards
            title={"Timezone"}
            icon={timezoneIcon}
            content={Response?.city?.timezone}
            loading={isLoadingResponse}
          />
        </div>
        <div className="w-full">
          <MapChart data={Response} />
        </div>
        <div className="w-full h-96 ">
          <Example response={Response} />
        </div>
      </div>
    </div>
  );
}
