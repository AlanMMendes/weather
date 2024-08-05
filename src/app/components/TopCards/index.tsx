import Image from "next/image";
import Loading from "../Loading";

// Generic Components
type ListProps<Item> = {
  title: string;
  icon: any;
  content: string;
  loading: boolean;
};

function TopCards<ItemType>({
  title,
  content,
  icon,
  loading,
}: ListProps<ItemType>) {
  return (
    <div className="items-center max-w-44 justify-center text-black dark:text-white hover:scale-105">
      {!loading && (
        <>
          <span className="text-sm">{title}</span>
          <div className="max-w-sm min-w-40 min-h-24 0 items-center bg-white dark:bg-zinc-900 justify-start px-1 border border-gray-200 rounded-lg shadow  dark:border-zinc-700 flex flex-row space-x-5">
            <Image src={icon} alt={`${icon}`} width={60} />
            <p className="font-normal">{content}</p>
          </div>
        </>
      )}
      {loading && (
        <>
          <span className="text-sm ">... Loading</span>
          <div className="max-w-sm min-w-44 min-h-24  items-center bg-white dark:bg-zinc-900 justify-center border border-gray-200 rounded-lg shadow  dark:border-zinc-700 flex flex-row space-x-5">
            <Loading />
          </div>
        </>
      )}
    </div>
  );
}
export default TopCards;
