import React from "react";
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
  return (
    <div>
      {cart.length > 0 ? (
        <>
          <div>Total items: {cart.length}</div>
          <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4 m-4">
            {cart.map(({ product }, id) => {
              return (
                <div key={id}>
                  <Product product={product} />
                  <div className="flex justify-center">
                    <button
                      className="m-2 p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
                      onClick={() =>
                        setCart(
                          cart.filter((obj) => obj.product._id != product._id)
                        )
                      }
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
