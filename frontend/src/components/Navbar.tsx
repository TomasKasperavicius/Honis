import React from "react";
import { GiDrippingHoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ProductsProps } from "./Cart";
const Navbar: React.FC<ProductsProps> = ({
  products,
}: ProductsProps): JSX.Element => {
  return (
    <IconContext.Provider value={{ size: "40px" }}>
      <div className="flex justify-around bg-gradient-to-r to-indigo-500 via-purple-500 from-pink-500">
        <div className="m-2">
          <GiDrippingHoney style={{ color: "yellow" }} />
        </div>
        <div className="w-3/6 flex justify-evenly items-center  m-2">
          <a href="/">About</a>
          <a href="/">Categories</a>
        </div>
        <div className="w-3/6 flex justify-evenly items-center m-2">
          <div className="relative w-1/2">
            <input
              className="w-full h-8 rounded-xl"
              placeholder="Search..."
            ></input>
            <div className="absolute right-0 top-0">
              <AiOutlineSearch size={30} />
            </div>
          </div>
          <div className="flex relative w-12 h-full justify-center items-center">
            <Link to="/cart">
              <FaShoppingCart style={{ color: "white" }} size={30} />
            </Link>
            {products.length > 0 ? (
              <div className="bg-red-600 font-extrabold font-mono text-white absolute top-0 right-0 rounded-full w-5 h-5 flex justify-center items-center">
                {products.length}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-1/6 flex justify-evenly items-center">
          <Link to="/login">
            <button
              className="m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
              type="button"
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              className="m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
              type="button"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};
export default Navbar;
