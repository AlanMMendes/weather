"use client"; // This is a client component 👈🏽
import { FilterContext } from "@/app/hooks/context/filter";
import { useContext, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiTarget } from "react-icons/tfi";
import worldCities from "../../data/citiesWorld.json";

export default function WeatherFilter() {
  const [worldMap, setWorldMap] = useState<any>(worldCities);
  const [input, setInput] = useState<any>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const { setFilter } = useContext<any>(FilterContext);
  const [mapData, setMapData] = useState<any>(
    worldMap.map((item: any) => {
      return {
        name: item.city,
        lat: item.lat,
        lon: item.lng,
        country: item.country,
      };
    })
  );

  useMemo(() => {
    setFilter({
      label: mapData[0]?.name,
      lat: mapData[0]?.lat,
      lon: mapData[0]?.lon,
    });
  }, [mapData]);

  const ButtonFilter = () => {
    setFilter({
      label: value[0]?.name,
      lat: value[0]?.lat,
      lon: value[0]?.lon,
    });
  };

  useMemo(() => {
    setPreview(
      mapData.filter((item: any) =>
        item?.name
          ?.toLowerCase()
          ?.includes(input?.toLowerCase() || "value not inserted")
      )
    );
    setShowPreview(false);
  }, [input]);

  console.log(preview?.slice(0, 9).length);

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
            <div
              className={`flex w-full absolute ${showPreview ? "hidden" : ""} ${
                showPreview ? "hidden" : ""
              } `}
            >
              {input !== "" && (
                <ul className="max-h-[24rem] z-100 rounded-lg overflow-auto text-black bg-white shadow-md w-full">
                  {preview?.slice(0, 9)?.map((item: any, index: any) => {
                    return (
                      <li
                        id={item?.name}
                        key={index}
                        className="hover:bg-gray-300 cursor-pointer min-h-10 justify-start items-center flex px-2"
                        value={item?.name}
                        onClick={(e) => {
                          setInput(item?.name);
                          setShowPreview(true);
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
            setValue(
              mapData?.filter((item: any) => {
                return item?.name?.toUpperCase()?.match(input?.toUpperCase());
              })
            );
          }}
          className="flex items-center hover:bg-gray-300 bg-white justify-center  w-10 h-10 rounded-lg  "
        >
          <TfiTarget className="text-black " />
        </button>
      </div>
    </form>
  );
}
