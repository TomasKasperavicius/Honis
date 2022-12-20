import React from "react";

const Filter:React.FC = (): JSX.Element => {
  return (
    <div className="flex-col border-2">
      <div>
        Honey type:
        <div className="flex-col">
          <div className="flex">
            <div className="w-1/2 p-2 text-center">
              <label>Brown</label>
            </div>
            <div className="w-1/2 p-2 text-center">
              <input className="w-4 h-4" type="checkbox"></input>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 p-2 text-center">
              <label>White</label>
            </div>
            <div className="w-1/2 p-2 text-center">
              <input className="w-4 h-4" type="checkbox"></input>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 p-2 text-center">
              <label>Black</label>
            </div>
            <div className="w-1/2 p-2 text-center">
              <input className="w-4 h-4" type="checkbox"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;
