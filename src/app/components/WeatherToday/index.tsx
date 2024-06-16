import { FaCloudShowersHeavy, FaSun } from "react-icons/fa";
import { IoCloudSharp } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { timeConverter } from "../../utils";
import Loading from "../Loading";

const WeatherToday = ({ data, loading }: any) => {
  const selectedIcon = (type: any, size: any) => {
    if (type === "Clouds") {
      return <IoCloudSharp size={size} />;
    } else if (type === "Rain") {
      return <FaCloudShowersHeavy size={size} className="text-cyan-950" />;
    } else if (type === "Clear") {
      return <FaSun size={size} className="text-amber-400" />;
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md px-10 py-5">
      {!loading && (
        <div className="">
          <h1 className="top-0 left-0 text-3xl text-black dark:text-white">
            Weather Today
          </h1>
          <div className="w-auto h-auto flex space-x-16 py-5 justify-center items-center">
            <div className="flex flex-col justify-start items-start ">
              {selectedIcon(data?.list[0]?.weather[0]?.main, 130)}
            </div>
            <div className="m-1 py-3 px-3 w-auto border border-slate-300 rounded-lg flex flex-col justify-center items-center">
              <span className="text-2xl">{data?.city?.name}</span>
              <span className="text-sm">{data?.city?.name}</span>
            </div>

            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-slate-300 rounded-lg flex flex-col justify-center items-center">
              <div className="flex flex-row ">
                <span className="text-2xl">{data?.list[0]?.main?.temp}</span>
              </div>
              <span className="text-sm">Temperature (°C)</span>
            </div>
            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-slate-300 rounded-lg flex flex-col justify-center items-center">
              <div className="flex flex-row">
                <span className="text-2xl">
                  {data?.list[0]?.main?.humidity}
                </span>
              </div>
              <span className="text-sm">Humidity (%)</span>
            </div>
            <div className="m-1 py-3 px-3 w-auto border shadow-sm border-slate-300 rounded-lg flex flex-col justify-center items-center">
              <div className="flex flex-row">
                <span className="text-2xl">{data?.list[0]?.wind?.speed}</span>
              </div>
              <span className="text-sm">Wind Speed (km/h)</span>
            </div>
          </div>
          <Carousel
            showArrows={false}
            centerMode
            centerSlidePercentage={11}
            showStatus={false}
            showIndicators={false}
            autoPlay
            infiniteLoop={true}
            showThumbs={false}
          >
            {data?.list?.map((item: any) => {
              return (
                <div className="flex flex-col bg-white dark:bg-slate-700 border-slate-100 border w-24 h-32 rounded-3xl justify-center items-center space-y-3">
                  <span className="text-black dark:text-white">
                    {timeConverter(item?.dt)}H
                  </span>
                  <span className="text-slate-500">
                    {item?.weather?.map((item: any) => {
                      return selectedIcon(item?.main, 32);
                    })}
                  </span>
                  <span className="text-black dark:text-white">
                    {item?.main?.temp}(°C)
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
