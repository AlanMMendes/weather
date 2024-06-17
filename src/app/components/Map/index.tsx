import { FilterContext } from "@/app/hooks/context/filter";
import { useContext } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geo } from "../../data";
import Loading from "../Loading";

const MapChart = () => {
  const { filter: message } = useContext<any>(FilterContext);

  return (
    <div className="w-full h-full min-h-96 bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-md">
      {message && (
        <>
          <ComposableMap className="rounded-lg w-full h-full">
            <ZoomableGroup center={[message.lat, message.lon]} zoom={9}>
              <Geographies geography={geo}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <Marker coordinates={[message.lat, message.lon]}>
                <circle r={0.5} fill="white" />
              </Marker>
            </ZoomableGroup>
          </ComposableMap>
        </>
      )}
      {!message && (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};
export default MapChart;
