import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Filter from "./Filter";
import { ProductProps } from "./Product";
interface HomeProps {
  cart: ProductProps[];
  products: ProductProps[];
  addToCart: (product: ProductProps) => void;
}
const Home: React.FC<HomeProps> = ({
  cart,
  products,
  addToCart,
}: HomeProps): JSX.Element => {
  // const addToCart=(_:React.MouseEvent<HTMLButtonElement, MouseEvent>,product:ProductProps)=>{
  //   setCart([...cart,product])
  //   console.log(cart)
  // }
  return (
    <div className="font-serif w-full">
      <Navbar products={cart} />
      <div className="flex w-full">
        <div className="w-1/6">
          <Filter />
        </div>
        <div className="grid grid-cols-4 grid-rows-4 w-5/6">
          {products.map(({ product }, id) => {
            return (
              <div key={id} className="m-2">
                <Product product={product} />
                <div className="flex justify-center">
                  <button
                    className="m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
                    onClick={() => addToCart({ product })}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
