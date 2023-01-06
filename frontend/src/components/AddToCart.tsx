import React, { useState } from "react";
import { ProductProps } from "./Product";
interface AddToCartProps {
  product: any;
  cart: ProductProps[];
  products: ProductProps[];
  addToCart: (product: ProductProps) => void;
  setCart: (products: ProductProps[]) => void;
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
        className="w-28 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
        onClick={() => handleAddToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
