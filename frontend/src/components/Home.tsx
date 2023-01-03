import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Filter from "./Filter";
import { ProductProps } from "./Product";
import { useNavigate } from "react-router-dom";
export interface LoginInfo {
  loggedIn: boolean;
  user: any;
}
interface HomeProps {
  LoggedInInfo: LoginInfo;
  cart: ProductProps[];
  products: ProductProps[];
  addToCart: (product: ProductProps) => void;
  setProducts: (products: ProductProps[]) => void;
}
const Home: React.FC<HomeProps> = ({
  LoggedInInfo,
  cart,
  products,
  addToCart,
  setProducts,
}: HomeProps): JSX.Element => {
  const navigate = useNavigate();
  const addProduct = () => {
    navigate("/addProduct");
  };

  return (
    <div className="font-serif w-full">
      <Navbar
        LoggedInInfo={LoggedInInfo}
        products={products}
        cart={cart}
        setProducts={setProducts}
      />
      <div className="flex w-full h-fi">
        <div className="w-1/6">
          <Filter setProducts={setProducts} products={products} />
        </div>
        <div className="w-5/6 flex flex-col">
          <div className="w-full text-center p-4">
            <button
              onClick={addProduct}
              className="w-28 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
            >
              Add product
            </button>
          </div>
          <div className="grid grid-cols-4 grid-rows-4 full h-fit gap-4">
            {products.map((product: any, id) => {
              return (
                <div
                  key={id}
                  className="m-2 p-2 flex-col w-full h-5/6 border-2 border-solid"
                >
                  <Product product={product} />
                  <div className="flex justify-center h-1/12 m-4">
                    <button
                      className="w-28 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
                      onClick={() => addToCart(product)}
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
    </div>
  );
};
export default Home;
