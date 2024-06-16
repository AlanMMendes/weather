import ButtonTheme from "./components/ButtonTheme";
import Dashboard from "./components/Dashboard";
import Version from "./components/Version";

export default function Home() {
  return (
    <div className="relative py-2.5">
      <div className="absolute right-0 px-3">
        <ButtonTheme />
      </div>
      <div className="">
        <Dashboard />
      </div>
      <Version version={"0.1"} />
    </div>
  );
}
