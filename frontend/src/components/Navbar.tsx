import React from "react";
import { GiDrippingHoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
const Navbar: React.FC  = (): JSX.Element => {
  return (
    <IconContext.Provider value={{ size: "40px" }}>
      <nav className="flex justify-around bg-gradient-to-r to-indigo-500 via-purple-500 from-pink-500">
        <div className=" m-2">
          <GiDrippingHoney style={{ color: "yellow" }} />
        </div>
        <div className="w-3/4 flex justify-evenly items-center  m-2">
          <a href="/">About</a>
          <a href="/">Categories</a>

          <div className="relative w-1/3">
            <input
              className="w-full h-8 rounded-xl"
              placeholder="Search..."
            ></input>
            <div className="absolute right-0 top-0">
              <AiOutlineSearch size={30} />
            </div>
          </div>
          <a href="/">
            <FaShoppingCart style={{ color: "black" }} size={30} />
          </a>
        </div>
        <div className="w-1/4 flex justify-evenly  m-2">
          <button
            className="border-2 rounded px-2 py-1 bg-red-400"
            type="button"
          >
            Login
          </button>
          <button
            className="border-2 rounded px-2 py-1 bg-red-400"
            type="button"
          >
            Sign up
          </button>
        </div>
      </nav>
    </IconContext.Provider>
  );
};
export default Navbar;
