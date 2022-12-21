import React from "react";

const NoPage: React.FC = (): JSX.Element => {
  return (
    <div className="w-full h-screen flex-col text-center font-extrabold bg-orange-300">
      <div className="w-full h-1/2 text-5xl text-white flex justify-center items-end">
        <div className="border-white border-dashed border-2 p-2">Error 404</div>
      </div>
      <div className="w-full h-1/2 text-white">Page not found!</div>
    </div>
  );
};
export default NoPage;
