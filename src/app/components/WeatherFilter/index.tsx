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
      className="flex w-full"
      onSubmit={(e: any) => {
        e.preventDefault(), ButtonFilter();
      }}
    >
      <div className="flex flex-row gap-2 z-50 items-start justify-start w-full">
        <div className="relative flex flex-col w-full justify-center items-center">
          <label className=" text-gray-400 focus-within:text-gray-600 w-full">
            <CiSearch className="pointer-events-none mt-1 text-black absolute h-8 w-8" />
            <input
              type="text"
              id="countries"
              value={input}
              onChange={(event: any) => {
                setInput(event.target.value);
              }}
              placeholder="Search for places"
              className="w-full h-10 rounded-lg px-8 justify-center items-center text-black"
            />
            <div className="flex w-full absolute ">
              {input !== "" && (
                <ul className="max-h-[24rem] z-100 rounded-lg overflow-auto text-black bg-white shadow-md w-full">
                  {value?.map((item: any, index: any) => {
                    return (
                      <li
                        id={item?.id}
                        key={index}
                        className="hover:bg-gray-300 cursor-pointer min-h-10 justify-start items-center flex px-2"
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
          </label>
        </div>

        <button
          type="submit"
          onClick={() => {
            setInput("");
          }}
          className="flex items-center hover:bg-gray-300 bg-white justify-center  w-10 h-10 rounded-lg  "
        >
          <TfiTarget className="text-black " />
        </button>
      </div>
    </form>
  );
}
