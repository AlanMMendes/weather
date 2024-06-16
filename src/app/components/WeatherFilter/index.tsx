"use client"; // This is a client component 👈🏽
import { FilterContext } from "@/app/hooks/context/filter";
import { useContext, useEffect, useState } from "react";
import { countries } from "../../data";

export default function WeatherFilter() {
  const [selectCountries, setSelectCountries] = useState<any>();
  const { setFilter } = useContext<any>(FilterContext);

  const [mapData, setMapData] = useState<any>(
    countries[0]?.features?.map((item: any) => {
      return {
        name: item.properties.name,
        lat: item.geometry.coordinates[1],
        lon: item.geometry.coordinates[0],
      };
    })
  );

  useEffect(() => {
    setFilter({
      label: mapData[0]?.name,
      lat: mapData[0]?.lat,
      lon: mapData[0]?.lon,
    });
  }, [mapData, setFilter]);

  const ButtonFilter = () => {
    if (!mapData) return;
    setFilter({
      label: selectCountries || mapData[0]?.name,
      lat:
        mapData?.find((item: any) => item?.name === selectCountries)?.lat ||
        mapData[0]?.lat,
      lon:
        mapData?.find((item: any) => item?.name === selectCountries)?.lon ||
        mapData[0]?.lon,
    });
  };

  return (
    <div className="w-full h-12 flex justify-center ">
      <div className="flex flex-row gap-2 ">
        <select
          id="countries"
          onChange={(event: any) => {
            setSelectCountries(event.target.value);
          }}
          className="w-96 h-12 cursor-pointer bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          {mapData?.map((item: any, index: any) => {
            return (
              <option key={index} value={item.value}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => ButtonFilter()}
          type="button"
          className="w-auto px-2 h-12 m-0 dark:bg-gray-700 dark:text-white hover:bg-white hover:text-black bg-white border  border-gray-300 text-gray-900 text-sm rounded-lg  "
        >
          Search
        </button>
      </div>
    </div>
  );
}
