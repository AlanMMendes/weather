"use client"; // This is a client component 👈🏽
import { FilterContext } from "@/app/hooks/context/filter";
import { useContext, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiTarget } from "react-icons/tfi";
import { countries } from "../../data";

export default function WeatherFilter() {
  const [input, setInput] = useState<any>();
  const [value, setValue] = useState<any>();
  const [inputFilter, setinputFilter] = useState<any>();
  const { setFilter } = useContext<any>(FilterContext);
  const [mapData, setMapData] = useState<any>(
    countries[0]?.features?.map((item: any) => {
      return {
        id: item.properties.id,
        name: item.properties.name,
        lat: item.geometry.coordinates[1],
        lon: item.geometry.coordinates[0],
      };
    })
  );

  useMemo(() => {
    setFilter({
      label: mapData[0]?.name,
      lat: mapData[0]?.lat,
      lon: mapData[0]?.lon,
    });
  }, [mapData, setFilter]);

  const ButtonFilter = () => {
    if (!mapData) return;
    setFilter({
      label:
        mapData?.find((item: any) => item?.id === inputFilter)?.name ||
        mapData[0]?.name,
      lat:
        mapData?.find((item: any) => item?.id === inputFilter)?.lat ||
        mapData[0]?.lat,
      lon:
        mapData?.find((item: any) => item?.id === inputFilter)?.lon ||
        mapData[0]?.lon,
    });
  };

  useMemo(() => {
    setValue(
      mapData?.filter((item: any) => {
        return item && item?.name && item?.name?.toLowerCase()?.includes(input);
      })
    );
  }, [input]);

  return (
    <form
      className=" flex-wrap justify-center items-center flex"
      onSubmit={(e: any) => {
        e.preventDefault(), ButtonFilter();
      }}
    >
      <div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <label className="relative text-gray-400 focus-within:text-gray-600 block">
            <CiSearch className="pointer-events-none text-black w-5 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <input
              type="text"
              id="countries"
              value={input}
              onChange={(event: any) => {
                setInput(event.target.value);
              }}
              placeholder="Search for places"
              className="w-64 h-10 text-black rounded-lg placeholder-black placeholder-opacity-8s0 px-12 shadow-sm shadow-gray-400"
            />
          </label>

          <button
            type="submit"
            onClick={() => {
              setInput("");
            }}
            className="flex items-center hover:bg-gray-300 justify-center bg-gray-100 w-8 h-8 rounded-full  "
          >
            <TfiTarget className="text-black " />
          </button>
        </div>

        {input !== "" && (
          <ul className="absolute overflow-auto bg-white shadow-md max-h-[24rem] rounded-lg w-64 text-black">
            {value?.map((item: any, index: any) => {
              return (
                <li
                  id={item?.id}
                  key={index}
                  className="hover:bg-gray-300 cursor-pointer min-h-10 justify-start items-center flex px-1"
                  value={item?.id}
                  onClick={(event: any) => {
                    setinputFilter(event.target.value);
                    setInput(
                      mapData?.find(
                        (item: any) => item?.id === event.target.value
                      )?.name
                    );
                  }}
                >
                  {item?.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </form>
  );
}
