import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
import { product } from "./Product";
import { Grid, Paper } from "@mui/material";
export interface LoginInfo {
  loggedIn: boolean;
  user: UserInfo;
}
export interface UserInfo {
  _id: string;
  username: string;
  role: string;
  password: string;
  email: string;
  cart: product[];
}
interface HomeProps {
  LoggedInInfo: LoginInfo;
  cart: product[];
  products: product[];
  tempProducts: product[];
  addToCart: (product: product) => void;
  setProducts: (products: product[]) => void;
  setCart: (products: product[]) => void;
  setLoggedInInfo: ({}: any) => void;
}
const Home: React.FC<HomeProps> = ({
  LoggedInInfo,
  cart,
  products,
  tempProducts,
  addToCart,
  setProducts,
  setCart,
  setLoggedInInfo,
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
        setLoggedInInfo={setLoggedInInfo}
      />
      <div className="flex w-full h-full">
        <div className="w-1/6 h-full pl-1 pt-1 ">
          <Filter setProducts={setProducts} products={tempProducts} />
        </div>
        <div className="w-5/6 flex flex-col">
          {LoggedInInfo.user.role === "admin" ? (
            <div className="w-full text-center p-4">
              <button
                onClick={addProduct}
                className="w-fit m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
              >
                Add product
              </button>
            </div>
          ) : (
            <></>
          )}
          <Grid container style={{margin:10}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((product: any, id) => {
              return (
                <Grid item xs={2} sm={3} md={3} key={id}>
                  <Paper elevation={10}>
                  <Product product={product} />
                  <AddToCart
                    product={product}
                    addToCart={addToCart}
                    products={products}
                    cart={cart}
                    setCart={setCart}
                  />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Home;
