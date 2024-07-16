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
    <div className="w-full rounded-lg flex justify-center py-5 items-center bg-white dark:bg-zinc-800 ">
      <div className="flex flex-row gap-3 flex-wrap ">
        {data?.list?.slice(0, 3)?.map((item: any) => {
          return (
            <div className="flex flex-col shadow-md w-14 dark:shadow-zinc-950 bg-white dark:bg-zinc-900 min-w-20 h-32 rounded-2xl justify-center items-center ">
              <>
                <span className="text-black dark:text-white">
                  {moment.unix(item?.dt).fromNow()}
                </span>
                <span className="text-slate-500 w-auto">
                  {item?.weather?.map((item: any) => {
                    return selectedIcon(item?.main, 125);
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
