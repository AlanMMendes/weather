import ButtonTheme from "./components/ButtonTheme";
import Dashboard from "./components/Dashboard";
import WeatherFilter from "./components/WeatherFilter";
import WeatherNow from "./components/WeatherNow";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-1.5 ">
      <div className="bg-white dark:bg-zinc-900 h-full w-full flex flex-col justify-start items-center py-5 gap-10 shadow-lg shadow-zinc-800 ">
        <WeatherFilter />
        <WeatherNow />
      </div>

      <div className="col-start-2 col-span-4">
        <div className="absolute top-0 right-0 px-3 py-1">
          <ButtonTheme />
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
