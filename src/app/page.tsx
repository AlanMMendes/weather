"use client";
import useWeather from "@/app/hooks/useFilter";
import moment from "moment";
import Image from "next/image";
import { useSelector } from "react-redux";
import cityIcon from "../../public/city.svg";
import sunnyIcon from "../../public/clearIcon.svg";
import clearSmall from "../../public/clearSmall.svg";
import cloudRain from "../../public/cloudIcon.svg";
import cloudSmall from "../../public/cloudSmall.svg";
import humidity from "../../public/humidity.svg";
import maxTemperature from "../../public/max-temperature.svg";
import rainSmall from "../../public/rainSmall.svg";
import rainIcon from "../../public/rainyIcon.svg";
import sunsetIcon from "../../public/sunset.svg";
import timezoneIcon from "../../public/timezone.svg";
import wind from "../../public/wind.svg";
import ButtonTheme from "./components/ButtonTheme";
import Example from "./components/Charts/WindChart";
import Loading from "./components/Loading";
import MapChart from "./components/Map";
import Modal from "./components/Modal";
import TopCards from "./components/TopCards";
import WeatherFilter from "./components/WeatherFilter";

export default function Home() {
  const filter = useSelector((state: any) => state.filter);
  const data = useSelector((state: any) => state.data);
  const { data: Response, isLoading: isLoadingResponse } = useWeather(
    filter?.lat,
    filter?.lon,
    filter
  );

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
    <div className="flex lg:flex-row flex-col">
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
                  <span className="text-3xl font-thin">
                    {Response?.city?.name}
                  </span>
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

      <div className="flex flex-col text-black px-2 gap-2 w-full py-2">
        <div className="w-full flex flex-row gap-1 flex-wrap">
          <div className="bg-white dark:bg-zinc-900 min-h-44 py-1 min-w-40 w-40 h-40 rounded-2xl flex flex-col justify-start gap-5 items-center">
            <Modal />
            <div className="flex-col gap-3 dark:text-white text-center flex items-center">
              <span className="font-bold w-24">World forecast</span>
              <span className="text-sm font-light text-center">
                Add the cities you are interested in
              </span>
            </div>
          </div>
          {data?.items?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={`shadow-md min-h-44 hover:scale-105  ${selectedBg(
                  item?.list[0]?.weather[0]?.main
                )} rounded-3xl gap-1 flex flex-col justify-center items-center min-w-40 border shadow-xl`}
              >
                <div className="flex-col gap-3 text-center flex items-center">
                  <span className="font-bold text-5xl">
                    {Math.round(item?.list[0]?.main?.temp)}°
                  </span>

                  <span className="text-pretty font-light text-center">
                    {item?.city?.name}/{item?.city?.country}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <MapChart data={Response} />
        </div>
        <div className="w-full min-h-96 h-96 flex lg:flex-row flex-col gap-1">
          <Example response={Response} />
          <div className="flex  flex-row justify-center items-center flex-wrap gap-2 bg-white dark:bg-zinc-900  rounded-lg  min-h-60">
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
        </div>
      </div>
    </div>
  );
}
