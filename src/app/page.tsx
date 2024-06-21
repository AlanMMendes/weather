import Dashboard from "./components/Dashboard";
import WeatherNow from "./components/WeatherNow";

export default function Home() {
  return (
    <div className="flex h-screen  items-start justify-center">
      <div className="aboslute bg-white h-screen w-4/12 dark:bg-zinc-900">
        <WeatherNow />
      </div>
      <div className="px-2">
        <Dashboard />
      </div>
    </div>
  );
}
