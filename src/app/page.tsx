import Dashboard from "./components/Dashboard";
import WeatherNow from "./components/WeatherNow";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-start justify-center">
      <div className="relative h-full  w-1/4 bg-white dark:bg-zinc-900">
        <WeatherNow />
      </div>
      <div className="relative h-full w-full  ">
        <Dashboard />
      </div>
    </div>
  );
}
