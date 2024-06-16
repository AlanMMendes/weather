"use client";

const Version = ({ version }: any) => {
  return (
    <div className="flex flex-col relative ">
      <footer className="flex-row-reverse flex px-1 ">
        Version: {version}
      </footer>
    </div>
  );
};
export default Version;
