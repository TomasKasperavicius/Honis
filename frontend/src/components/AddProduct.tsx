import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { product } from "./Product";
interface AddProductInfo {
  image?: string;
  price: number;
  units: number;
  title: string;
  description: { HoneyType: string; Capacity: number };
}
interface AddProductProps {
  products: product[];
  setProducts: (products: product[]) => void;
}
const AddProduct: React.FC<AddProductProps> = ({
  products,
  setProducts,
}: AddProductProps): JSX.Element => {
  const [input, setInput] = useState<AddProductInfo>({
    image: "",
    price: 0,
    title: "",
    units: 1,
    description: {
      HoneyType: "",
      Capacity: 0,
    },
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.id]:
        e.target.files === null ? e.target.value : e.target.files[0],
    });
  };
  const handleDescriptionChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput({
      ...input,
      description: { ...input.description, [e.target.id]: e.target.value },
    });
  };
  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData(e.currentTarget);
      form.append(
        "description",
        JSON.stringify({
          HoneyType: input.description.HoneyType,
          Capacity: input.description.Capacity + " ml",
        })
      );
      const { status, data } = await axios.post(
        `${process.env.REACT_APP_REMOTE_SERVER_URL}/product/add`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      if (status !== 200) {
        throw new Error("Wrong credentials");
      }
      setProducts([...products, data.product]);
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
        <div className="flex flex-col w-2/3">
          <label htmlFor="title">Title: </label>
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="title"
            name="title"
            type="text"
            value={input.title}
            required
          />
        </div>
        <div className="flex flex-col w-2/3">
          <label htmlFor="price">Price: </label>
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="price"
            type="number"
            name="price"
            min={0}
            step=".01"
            value={input.price}
            required
          />
        </div>
        <div className="flex flex-col w-2/3">
          <label htmlFor="units">Units: </label>
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="units"
            type="number"
            name="units"
            min={1}
            value={input.units}
            required
          />
        </div>
        <div className="flex flex-col items-start w-2/3">
          <label htmlFor="HoneyType">Honey type: </label>
          <select
            required
            className="w-full rounded-lg"
            onChange={(e) => handleDescriptionChange(e)}
            id="HoneyType"
            value={input.description.HoneyType}
          >
            <option value="Clover">Clover</option>
            <option value="Wildflower">Wildflower</option>
            <option value="Acacia">Acacia</option>
            <option value="Alfalfa">Alfalfa</option>
            <option value="Buckwheat">Buckwheat</option>
            <option value="Creamed">Creamed</option>
            <option value="Manuka">Manuka</option>
            <option value="Eucalyptus">Eucalyptus</option>
            <option value="Orange Blossom">Orange Blossom</option>
            <option value="Baker's Special">Baker's Special</option>
          </select>
        </div>
        <div className="flex flex-col w-2/3">
          <label htmlFor="Capacity">Capacity in ml: </label>
          <input
            className=" rounded-lg"
            onChange={(e) => handleDescriptionChange(e)}
            id="Capacity"
            min={1}
            type="number"
            value={input.description.Capacity}
            required
          />
        </div>
        <div className="flex flex-col w-2/3">
          <label htmlFor="image">Image: </label>
          <input
            name="image"
            onChange={(e) => handleInputChange(e)}
            id="image"
            type="file"
            required
          />
        </div>
        <div className="flex justify-evenly w-full">
          <button
            onClick={() => navigate("/")}
            className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
          >
            Back
          </button>
          <button
            className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
