import Loading from "../Loading";

const TopCards = ({ title, content, icon, loading }: any) => {
  return (
    <div className="items-center justify-center text-black dark:text-white">
      {!loading && (
        <>
          <span className="text-sm">{title}</span>
          <div className="max-w-sm min-w-44 min-h-24 p-6 items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-700 dark:border-gray-700 flex flex-row space-x-5">
            {icon}
            <p className="font-normal ">{content}</p>
          </div>
        </>
      )}
      {loading && (
        <>
          <span className="text-sm ">... Loading</span>
          <div className="max-w-sm min-w-44 min-h-24 p-6 items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-700 dark:border-gray-700 flex flex-row space-x-5">
            <Loading />
          </div>
        </>
      )}
    </div>
  );
};
export default TopCards;
