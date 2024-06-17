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
    <div className="w-full h-full">
      <div className="flex flex-row gap-2.5 flex-wrap justify-center items-center">
        {data?.list?.slice(0, 7)?.map((item: any) => {
          return (
            <div className="flex flex-col bg-white dark:bg-zinc-900 w-auto min-w-36 h-40 rounded-2xl justify-center items-center space-y-3">
              <>
                <span className="text-black dark:text-white">
                  {moment.unix(item?.dt).fromNow()}
                </span>
                <span className="text-slate-500 w-10">
                  {item?.weather?.map((item: any) => {
                    return selectedIcon(item?.main, 40);
                  })}
                </span>
                <span className="text-black dark:text-white">
                  {Math.round(item?.main?.temp)}
                  <span className="text-sm">°c</span>
                </span>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherToday;
