import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { timeConverter } from "../../utils";
import Clouds from "../Assets/clouds.svg";
import Rain from "../Assets/rain.svg";
import Sunny from "../Assets/sunny.svg";
import Loading from "../Loading";

const WeatherToday = ({ data, loading }: any) => {
  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <Image src={Clouds} alt={""} width={size} />;
    } else if (type === "Rain") {
      return <Image src={Rain} alt={""} width={size} />;
    } else if (type === "Clear") {
      return <Image src={Sunny} alt={""} width={size} />;
    }
  };

  return (
    <div className="w-full h-full min-h-96  py-5 px-10 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg shadow-lg ">
      {!loading && (
        <div className="">
          <h1 className="top-0 left-0 text-3xl text-black dark:text-white">
            Weather Today
          </h1>
          <div className="w-auto h-auto flex space-x-32 py-5 justify-center items-center">
            <div className="flex flex-col justify-start items-start ">
              <div>{selectedIcon(data?.list[0]?.weather[0]?.main, 150)}</div>
            </div>
            <div className="m-1 py-3 px-3 w-auto border border-zinc-950 rounded-lg flex flex-col justify-center items-center">
              <span className="text-2xl">{data?.city?.name}</span>
              <span className="text-sm">{data?.city?.name}</span>
            </div>

            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-zinc-950 rounded-lg flex flex-col justify-center items-center">
              <span className="text-sm">Temperature</span>
              <div className="flex flex-row ">
                <span className="text-2xl">
                  {data?.list[0]?.main?.temp}
                  <span className="text-sm">°c</span>
                </span>
              </div>
            </div>
            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-zinc-950 rounded-lg flex flex-col justify-center items-center">
              <span className="text-sm">Humidity</span>
              <div className="flex flex-row">
                <span className="text-2xl">
                  {data?.list[0]?.main?.humidity}
                  <span className="text-sm">%</span>
                </span>
              </div>
            </div>
            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-zinc-950 rounded-lg flex flex-col justify-center items-center">
              <span className="text-sm">Wind Speed</span>
              <div className="flex flex-row">
                <span className="text-2xl">
                  {data?.list[0]?.wind?.speed}
                  <span className="text-sm">km/h</span>
                </span>
              </div>
            </div>
          </div>
          <Carousel
            showArrows={false}
            centerMode
            centerSlidePercentage={17}
            showStatus={false}
            showIndicators={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
          >
            {data?.list?.map((item: any) => {
              return (
                <div className="flex flex-col bg-white dark:bg-zinc-900 border-zinc-950 border w-24 h-32 rounded-3xl justify-center items-center space-y-3">
                  <span className="text-black dark:text-white">
                    {timeConverter(item?.dt)}H
                  </span>
                  <span className="text-slate-500 w-10">
                    {item?.weather?.map((item: any) => {
                      return selectedIcon(item?.main, 5);
                    })}
                  </span>
                  <span className="text-black dark:text-white">
                    {item?.main?.temp}
                    <span className="text-sm">°c</span>
                  </span>
                </div>
              );
            })}
          </Carousel>
        </div>
      )}

      {loading && (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default WeatherToday;
