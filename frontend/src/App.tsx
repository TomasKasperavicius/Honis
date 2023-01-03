import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Register from "./components/Register";
import { ProductProps } from "./components/Product";
import { LoginInfo } from "./components/Home";
import AddProduct from "./components/AddProduct";
import axios from "axios";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [cart, setCart] = useState<ProductProps[]>([]);
  const [LoggedInInfo, setLoggedInInfo] = useState<LoginInfo>({
    loggedIn: false,
    user: {},
  });

  const addToCart = (product: ProductProps) => {
    setCart([...cart, product]);
  };
  useEffect(() => {
    if (LoggedInInfo.loggedIn) {
      (async () => {
        const result = await axios.get(
          `http://localhost:4545/${LoggedInInfo.user._id}`
        );
        if (result.status===200) { 
          setCart(result.data.cart)
        }
      })();
    }
    (async () => {
      const result = await axios.get(
        "http://localhost:4545/product/all"
      );
      if (result.status===200) { 
        setProducts(result.data.products)
      }
    }
    )()
  }, [LoggedInInfo]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
