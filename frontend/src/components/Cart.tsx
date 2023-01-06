import React, { useState, useEffect } from "react";
import Product, { ProductProps } from "../components/Product";
import { Link } from "react-router-dom";
export interface ProductsProps {
  products: ProductProps[];
}
interface CartProps {
  cart: ProductProps[];
  setCart: (products: ProductProps[]) => void;
}
const Cart: React.FC<CartProps> = ({
  cart,
  setCart,
}: CartProps): JSX.Element => {
  const [cost, setCost] = useState(0);
  useEffect(() => {
    var sum = 0;
    cart.forEach((e: any) => {
      sum += e.price.$numberDecimal * e.units;
    });
    setCost(sum);
  }, [cart]);

  return (
    <div>
      {cart.length > 0 ? (
        <>
          <div className="flex justify-around items-center px-4 bg-gradient-to-r to-indigo-500 via-purple-500 from-pink-500">
            <Link to="/">
              <button className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70">
                Back
              </button>
            </Link>
            <div className="text-white w-3/5 text-center">

            Total cost: {cost}&euro;
            </div>
            <button className="w-28 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70">
              Check out
            </button>
          </div>
          <div className="w-full p-4">
          </div>
          <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4 m-4">
            {cart.map((product: any, id) => {
              return (
                <div key={id} className="border-2">
                  <Product product={product} />
                  <div className="flex justify-center">
                    <button
                      className="m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
                      onClick={() => {
                        setCart(
                          cart.filter((obj: any) => obj._id !== product._id)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button>Check out</button>
        </>
      ) : (
        <>
          <div className="flex px-4 bg-gradient-to-r to-indigo-500 via-purple-500 from-pink-500">
            <Link to="/">
              <button className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70">
                Back
              </button>
            </Link>
          </div>
          <div className="w-full h-screen flex justify-center items-center">
            Cart is empty.
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
