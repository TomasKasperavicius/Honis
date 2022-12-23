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
          Size: "250 ml",
          HoneyType: "Brown",
        },
        img: "https://th.bing.com/th/id/OIP.xA8SVmrYeWO_xyL5LRuKfQHaH-?w=185&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
    {
      product: {
        _id: "2",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "500 ml",
          HoneyType: "White",
        },
        img: "https://th.bing.com/th/id/OIP.0VIholutUDxwJ43TfeZcmQHaHa?w=215&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
    {
      product: {
        _id: "3",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "250 ml",
          HoneyType: "Black",
        },
        img: "https://th.bing.com/th/id/OIP.5knJOJsik_KqTc2-L8oavQHaGJ?w=260&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
    {
      product: {
        _id: "4",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "750 ml",
          HoneyType: "White",
        },
        img: "https://th.bing.com/th/id/OIP.R1nXj80cCs0X4bvLtKreQgHaE8?w=264&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
    {
      
      product: {
        _id: "5",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "500 ml",
          HoneyType: "Black",
        },
        img: "https://th.bing.com/th/id/OIP.qtppUit9A2Ihh27iaQ-L0AHaE8?w=284&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      },
    },
    {
      product: {
        _id: "6",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "750 ml",
          HoneyType: "Brown",
        },
        img: "https://th.bing.com/th/id/OIP.9tCTW3gqOTzne9l17WB5KgHaE8?w=296&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7",}
    },
    {
      product: {
        _id: "7",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "750 ml",
          HoneyType: "White",
        },
        img: "https://th.bing.com/th/id/OIP.LBcdIeQvvwjmAasrPqqi0wHaHa?w=196&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7",}
    },
    {
      
      product: {
        _id: "8",
        title: "Best honey",
        price: 5.4,
        description: {
          Size: "250 ml",
          HoneyType: "Black",
        },
        img: "https://th.bing.com/th/id/OIP.gb8ROBQt-9UNewfnYOvtlQHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",}
    }
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
          <Route index element={<Home setProducts={setProducts} cart={cart} addToCart={addToCart} products={products} />}/>
          <Route path="cart" element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
