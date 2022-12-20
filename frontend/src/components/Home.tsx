import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Filter from "./Filter";
import {ProductsProps} from "./Cart"
const Home: React.FC<ProductsProps> = ({products} : ProductsProps): JSX.Element => {
  return (
    <div className="font-serif w-full">
                <Navbar />
                <div className="flex w-full">
                  <div className="w-1/6">
                    <Filter />
                  </div>
                  <div className="grid grid-cols-4 grid-rows-4 w-5/6">
                    {products.map(({product}, id) => {
                      return (
                        <>
                          <Product key={id} product={product} />
                          <div>
                            <button>Buy</button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
  );
};
export default Home;
