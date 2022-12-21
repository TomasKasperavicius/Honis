import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import {ProductProps} from './components/Product'
function App() {
  const [products, setProducts] = useState<ProductProps[]>([
    {
      product: {
        _id: "1",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "1000 ml",
          HoneyType: "Brown honey",
        },
        img: "https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
  ]);
  const [cart, setCart] = useState<ProductProps[]>([
    // {
    //   product: {
    //     _id: "1",
    //     title: "Best honey",
    //     price: 5.4,
    //     description: {
    //       Size: "1000 ml",
    //       HoneyType: "Brown honey",
    //     },
    //     img: "https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    //   },
    // },
  ]);
  const addToCart=(product:ProductProps)=>{
    setCart([...cart,product])
    console.log(cart)
  }
  
  // useEffect(() => {
  //   setProducts([
  //     {
  //       title:"1l of honi",
  //       description:{
  //         size:"1l",
  //       },
  //       img:'https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  //     },{
  //       title:"1l of honi",
  //       description:{
  //         size:"1l",
  //       },
  //       img:'https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  //     },
  //   ])
  //   return () => {
  //   };
  // }, [products]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home cart={cart} addToCart={addToCart} products={products} />}/>
          <Route path="cart" element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
