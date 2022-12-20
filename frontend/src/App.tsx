import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import {ProductProps} from "./components/Product"
function App() {
  const [products, setProducts] = useState<ProductProps[]>([
    {product:{
      _id: "1",
      title: "Best honey",
      price: 5.4,
      description: {
        Size: "1000 ml",
        HoneyType: "Brown honey",
      },
      img: "https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    }}
  ]);
  const [cart, setCart] = useState([
    {
      _id: "1",
      title: "Best honey",
      price: 5.4,
      description: {
        Size: "1000 ml",
        HoneyType: "Brown honey",
      },
      img: "https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
  ]);
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
          <Route
            index
            element={
              <Home  products={products} />
            }
          />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
