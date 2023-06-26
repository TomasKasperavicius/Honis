import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Register from "./components/Register";
import { ProductProps, product } from "./components/Product";
import { LoginInfo } from "./components/Home";
import AddProduct from "./components/AddProduct";
import axios from "axios";

function App() {
  const [products, setProducts] = useState<product[]>([]);
  const [tempProducts, setTempProducts] = useState<product[]>([]);
  const [cart, setCart] = useState<product[]>([]);
  const [LoggedInInfo, setLoggedInInfo] = useState<LoginInfo>({
    loggedIn: false,
    user: {_id:"",cart:[],email:"",password:"",username:""},
  });
  const navigate = useNavigate();
  const addToCart = async (product: product) => {
    if (!LoggedInInfo.loggedIn) {
      navigate("/login");
      return;
    }
    const {data} = await axios.get(
      `http://localhost:4545/user/${LoggedInInfo.user._id}`
    );
    const newCart = [...data.user.cart, product];
    const result = await axios.put(
      `http://localhost:4545/user/${LoggedInInfo.user._id}/addToCart`,
      {cart:newCart},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      setCart(newCart);
    }
  };
  useEffect(() => {
    if (LoggedInInfo.loggedIn) {
      (async () => {
        const result = await axios.get(
          `http://localhost:4545/${LoggedInInfo.user._id}`
        );
        if (result.status === 200) {
          setCart(result.data.cart);
        }
      })();
    }
    (async () => {
      const result = await axios.get("http://localhost:4545/product/all");
      if (result.status === 200) {
        setProducts(result.data.products);
        setTempProducts(result.data.products);
      }
    })();
  }, [LoggedInInfo]);

  return (
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home
                setProducts={setProducts}
                cart={cart}
                addToCart={addToCart}
                products={products}
                LoggedInInfo={LoggedInInfo}
                setCart={setCart}
                tempProducts={tempProducts}
              />
            }
          />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<Login setLoggedInInfo={setLoggedInInfo} />}
          />
          <Route
            path="register"
            element={<Register setLoggedInInfo={setLoggedInInfo} />}
          />
          <Route
            path="/addProduct"
            element={
              <AddProduct products={products} setProducts={setProducts} />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  );
}

export default App;
