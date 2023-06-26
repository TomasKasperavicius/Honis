import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
import { product } from "./Product";
export interface LoginInfo {
  loggedIn: boolean;
  user: UserInfo;
}
export interface UserInfo{
  _id:string,
  username: string,
  password: string,
  email:string,
  cart: product[]
}
interface HomeProps {
  LoggedInInfo: LoginInfo;
  cart: product[];
  products: product[];
  tempProducts: product[];
  addToCart: (product: product) => void;
  setProducts: (products: product[]) => void;
  setCart: (products: product[]) => void;
}
const Home: React.FC<HomeProps> = ({
  LoggedInInfo,
  cart,
  products,
  tempProducts,
  addToCart,
  setProducts,
  setCart,
}: HomeProps): JSX.Element => {
  const navigate = useNavigate();
  const addProduct = () => {
    navigate("/addProduct");
  };
  return (
    <div className="font-serif w-full h-screen overflow-clip">
      <Navbar
        LoggedInInfo={LoggedInInfo}
        tempProducts={tempProducts}
        cart={cart}
        setProducts={setProducts}
      />
      <div className="flex w-full h-full">
        <div className="w-1/6 h-full  ">
          <Filter setProducts={setProducts} products={tempProducts} />
        </div>
        <div className="w-5/6 flex flex-col">
          <div className="w-full text-center p-4">
            <button
              onClick={addProduct}
              className="w-fit m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
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
                  <AddToCart
                    product={product}
                    addToCart={addToCart}
                    products={products}
                    cart={cart}
                    setCart={setCart}
                  />
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
