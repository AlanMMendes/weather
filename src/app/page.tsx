import ButtonTheme from "./components/ButtonTheme";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="relative py-2.5">
      <div className="absolute right-0 px-3">
        <ButtonTheme />
      </div>
      <div className="">
        <Dashboard />
      </div>
    </div>
  );
}
