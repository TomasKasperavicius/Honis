import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { product } from "./Product";
import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { GiDrippingHoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
  const fileInput = useRef<HTMLInputElement | null>(null)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.files === null ? e.target.value : e.target.files[0],
    });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInput({
      ...input,
      description: { ...input.description, [e.target.name]: e.target.value },
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
          Capacity: input.description.Capacity,
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
    <IconContext.Provider value={{ size: "40px" }}>
      <div className="w-full h-screen flex justify-center items-center">
        
        <form
          onSubmit={(e) => addProduct(e)}
          className="w-1/4 h-3/4 flex flex-col justify-evenly items-center bg-amber-200 rounded p-2"
        >
          <GiDrippingHoney style={{ color: "orange" }} />
        <i className="px-4 text-white">
          <b>Honis</b>
        </i>
          <div className="flex flex-col w-2/3">
            <InputLabel id="title-input">Title</InputLabel>
            <TextField
              id="title-input"
              name="title"
              type="text"
              value={input.title}
              onChange={(e) => handleInputChange(e as any)}
              variant="outlined"
            />
          </div>
          <div className="flex flex-col w-2/3">
            <InputLabel id="price-input">Price</InputLabel>
            <TextField
              id="price-input"
              name="price"
              type="number"
              value={input.price >= 0 ? input.price : 0}
              onChange={(e) => handleInputChange(e as any)}
              variant="outlined"
            />
          </div>
          <div className="flex flex-col w-2/3">
            <InputLabel id="units-input">Units</InputLabel>
            <TextField
              id="units-input"
              name="units"
              type="number"
              value={input.units >= 0 ? input.units : 0}
              onChange={(e) => handleInputChange(e as any)}
              variant="outlined"
            />
          </div>
          <div className="flex flex-col  w-2/3">
            <InputLabel id="HoneyTypeLabelID">Honey type</InputLabel>
            <Select
              labelId="HoneyTypeLabelID"
              id="HoneyType"
              value={input.description.HoneyType}
              name="HoneyType"
              onChange={(e: any) => handleDescriptionChange(e)}
            >
              <MenuItem value="Clover">Clover</MenuItem>
              <MenuItem value="Wildflower">Wildflower</MenuItem>
              <MenuItem value="Acacia">Acacia</MenuItem>
              <MenuItem value="Alfalfa">Alfalfa</MenuItem>
              <MenuItem value="Buckwheat">Buckwheat</MenuItem>
              <MenuItem value="Creamed">Creamed</MenuItem>
              <MenuItem value="Manuka">Manuka</MenuItem>
              <MenuItem value="Eucalyptus">Eucalyptus</MenuItem>
              <MenuItem value="Orange Blossom">Orange Blossom</MenuItem>
              <MenuItem value="Baker's Special">Baker's Special</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col w-2/3">
            <InputLabel id="demo-simple-select-label">Capacity, ml</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Capacity"
              value={input.description.Capacity}
              name="Capacity"
              onChange={(e: any) => handleDescriptionChange(e)}
            >
              <MenuItem value={250}>250</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={750}>750</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col w-2/3">
            <label htmlFor="image">Image </label>
            <AddPhotoAlternateIcon className="hover:cursor-pointer hover:scale-125" onClick={() => fileInput.current?.click()}/>
            <input
            ref={fileInput}
              name="image"
              hidden
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
    </IconContext.Provider>
  );
};

export default AddProduct;
