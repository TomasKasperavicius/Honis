import React, { useState } from "react";
import { product } from "./Product";
interface AddToCartProps {
  product: any;
  cart: product[];
  products: product[];
  addToCart: (product: product) => void;
  setCart: (products: product[]) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({
  product,
  cart,
  addToCart,
  products,
  setCart,
}: AddToCartProps) => {
  const [count, setCount] = useState(1);
  const handleAddToCart = async (product: any) => {
    const productToUpdate: any[] = products.filter(
      (obj: any) => obj._id === product._id
    );
    const productInCart: any[] = cart.filter(
      (obj: any) => obj._id === product._id
    );
    if (productToUpdate[0].units - count >= 0) {
      if (productInCart.length == 0) {
        addToCart({ ...product, units: count });
      } else {
        productInCart[0].units = count;
        setCart([...cart]);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-1/12 m-4">
      <div className="p-2">
        <button
          onClick={() => setCount(count - 1 < 1 ? 1 : count - 1)}
          className="bg-slate-200 px-2"
        >
          -
        </button>
        <> {count} </>
        <button
          onClick={() =>
            setCount(count + 1 > product.units ? count : count + 1)
          }
          className="bg-slate-200 px-2"
        >
          +
        </button>
      </div>
      <button
        className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
        onClick={() => handleAddToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
