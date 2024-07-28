import moment from "moment";
import Image from "next/image";
import Clouds from "../Assets/clouds.svg";
import Rain from "../Assets/rain.svg";
import Sunny from "../Assets/sunny.svg";

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
    <div className="flex flex-col gap-10 w-full ">
      {data?.list?.slice(0, 3)?.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className="flex flex-row w-full dark:shadow-zinc-950 shadow-md  min-w-28 h-42 rounded-2xl justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center">
              <span className="text-black dark:text-white">
                {moment.unix(item?.dt).fromNow()}
              </span>
              <span className="text-slate-500">
                {item?.weather?.map((item: any) => {
                  return selectedIcon(item?.main, 100);
                })}
              </span>
              <span className="text-black dark:text-white">
                {Math.round(item?.main?.temp)}
                <span className="text-sm">°c</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherToday;
