import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import brazilIcon from "../../../../public/assets/brazil-icon.svg";
import unitedstatesIcon from "../../../../public/assets/unitedstates-icon.svg";

function Dropdown() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState({
    value: "",
    icon: "",
  });
  const languages = [
    {
      label: "EN-US",
      value: "en",
      icon: unitedstatesIcon,
    },
    {
      label: "PT-BR",
      value: "pt",
      icon: brazilIcon,
    },
  ];

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useMemo(() => {
    i18n.changeLanguage(languageValue.value);
  }, [languageValue]);

  useEffect(() => {
    setLanguageValue({
      value: languages[0].value,
      icon: languages[0].icon,
    });
  }, []);

  const handleEventCategory = (e: any) => {
    setLanguageValue({
      value: e.target.value,
      icon: languages.filter((language) => language.value === e.target.value)[0]
        .icon,
    });
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="relative z-40 block h-8 w-8  rounded-full overflow-hidden focus:outline-none focus:border-white"
        >
          <Image
            src={languageValue.icon}
            alt={languageValue.value}
            width={40}
          />
        </button>
        <button
          className={
            isOpen
              ? " cursor-default bg-black opacity-0 fixed inset-0 w-full h-full"
              : "hidden"
          }
          onClick={closeDropdown}
        />
        <div
          className={
            isOpen
              ? "absolute z-50 w-28 h-20 justify-center items-center flex flex-col bg-white rounded-lg shadow-xl"
              : "hidden"
          }
        >
          {languages.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="flex px-1 h-full  items-center gap-3 flex-row rounded-md hover:bg-slate-200 w-full cursor-pointer"
              >
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={40}
                    className=""
                  />
                ) : (
                  <></>
                )}
                <option
                  value={item.value}
                  className="w-full py-0.5 font-semibold text-pretty text-sm "
                  onClick={(e) => {
                    handleEventCategory(e);
                    setIsOpen(!isOpen);
                  }}
                >
                  {item.label}
                </option>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dropdown;
