import { geo } from "@/app/config/geoConfig";
import { useSelector } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import Loading from "../Loading";

const MapChart = () => {
  const filter = useSelector((state: any) => state.filter);

  return (
    <div className="flex flex-wrap w-full h-96  bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-md">
      {filter ? (
        <>
          <ComposableMap
            className="rounded-lg flex flex-wrap w-full h-full "
            projection="geoMercator"
          >
            <ZoomableGroup center={[filter?.lon, filter?.lat]} zoom={10}>
              <Geographies geography={geo}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <Marker coordinates={[filter?.lon, filter?.lat]}>
                <circle r={1} fill="#F53" />
              </Marker>
            </ZoomableGroup>
          </ComposableMap>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default MapChart;
