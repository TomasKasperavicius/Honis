import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "./Product";
interface AddProductInfo{
      image: string,
      price: number,
      title: string,
      description: any,
}
interface AddProductProps {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
}
const AddProduct: React.FC<AddProductProps> = ({
  products,
  setProducts,
}: AddProductProps): JSX.Element => {
  const [input, setInput] = useState<AddProductInfo>({
      image: "",
      price: 0,
      title: "",
      description: {},
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.id]:
        e.target.files === null ? e.target.value : e.target.files[0],
    });
    console.log(input);
  };
  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(
        "http://localhost:4545/product/add",
        input,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (status !== 200) {
        throw new Error("Wrong credentials");
      }
      data.product.price = data.product.price.$numberDecimal;
      data.product.description = {};
      console.log(JSON.stringify(data));
      setProducts([...products, {product:data.product}]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => addProduct(e)}
        className="w-1/4 h-3/4 flex flex-col justify-evenly items-center bg-amber-100 rounded p-2"
      >
        <div>
          <label htmlFor="title">Title: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="title"
            type="text"
            value={input.title}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="price"
            type="number"
            value={input.price}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="image"
            type="file"
            required
          />
        </div>
        <button
          className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
