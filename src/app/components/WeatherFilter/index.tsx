"use client";
import { setData } from "@/app/features/data/filterSlice";
import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiTarget } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import worldCities from "../../json/citiesWorld.json";

export default function WeatherFilter() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.data);
  console.log(data);

  const [worldMap, setWorldMap] = useState<any>(worldCities);
  const [input, setInput] = useState<any>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [preview, setPreview] = useState<any>();
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

  // useEffect(() => {
  //   dispatch(
  //     fetchData(
  //       `https://api.openweathermap.org/data/2.5/forecast?lat=${-22}&lon=${-43}&appid=${
  //         process.env.NEXT_PUBLIC_BASE_API_URL
  //       }&units=metric`
  //     )
  //   );
  // }, [dispatch]);

  const ButtonFilter = () => {
    dispatch(
      setData({
        lat: value[0]?.lat,
        lon: value[0]?.lon,
      })
    );
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
  }, [input, mapData]);

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
                return item?.name?.toUpperCase() === input?.toUpperCase();
              })
            );
          }}
          className="flex items-center hover:bg-gray-300 bg-white justify-center  w-10 h-10 rounded-lg  "
        >
          <TfiTarget className="text-black" />
        </button>
      </div>
    </form>
  );
}
