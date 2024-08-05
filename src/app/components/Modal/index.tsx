import { fetchData } from "@/app/features/data/dataSlice";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import worldCities from "../../json/citiesWorld.json";

export default function Modal() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [worldMap, setWorldMap] = useState<any>(worldCities);
  const [input, setInput] = useState<any>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
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
    <>
      <button
        className="w-5 h-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="dark:text-white" />
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {t("main_page.title.cities")}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                          placeholder={t("main_page.filter.input")}
                          className="w-full h-10 rounded-lg px-8 justify-center bg-gray-100 items-center text-black"
                        />
                        <div
                          className={`flex w-full absolute ${
                            showPreview ? "hidden" : ""
                          } ${showPreview ? "hidden" : ""} `}
                        >
                          {input !== "" && (
                            <ul className="max-h-[24rem] z-100 rounded-lg overflow-auto text-black bg-white shadow-md w-full">
                              {preview
                                ?.slice(0, 9)
                                ?.map((item: any, index: any) => {
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
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end min-w-44 w-auto h-36 ">
                  <button
                    className="bg-white text-red-500 hover:bg-zinc-200 font-bold uppercase text-sm px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {t("main_page.button.close")}
                  </button>
                  <button
                    className="bg-white text-black  hover:bg-zinc-200 font-bold uppercase text-sm px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      dispatch(
                        fetchData(
                          `https://api.openweathermap.org/data/2.5/forecast?lat=${preview[0]?.lat}&lon=${preview[0]?.lon}&appid=${process.env.NEXT_PUBLIC_BASE_API_URL}&units=metric`
                        )
                      );
                      setShowModal(false);
                    }}
                  >
                    {t("main_page.button.insert")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
