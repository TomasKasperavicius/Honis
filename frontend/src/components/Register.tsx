import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiDrippingHoney } from "react-icons/gi";
import { IconContext } from "react-icons";

interface RegisterProps {
  setLoggedInInfo: ({}: any) => void;
}
type Role = 'admin' | 'user';

interface RegisterInfo {
  email: string;
  username: string;
  password: string;
  role: Role;
}
const Register: React.FC<RegisterProps> = ({
  setLoggedInInfo,
}: RegisterProps): JSX.Element => {
  const [input, setInput] = useState<RegisterInfo>({
    email: "",
    username: "",
    password: "",
    role:"user"
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(
        "http://localhost:4545/user/register",
        input
      );
      if (status !== 200) {
        throw new Error("Wrong credentials");
      }
      setLoggedInInfo({
        loggedIn: true,
        user: data.user,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => register(e)}
        className="w-1/4 h-3/4 flex flex-col items-center bg-opacity-30 bg-amber-500 rounded p-2"
      >
        <div className="p-4">
          <IconContext.Provider value={{ size: "40px" }}>
            <GiDrippingHoney style={{ color: "orange" }} />
            <i className="text-white">
              <b>Honis</b>
            </i>
          </IconContext.Provider>
        </div>
        <div className="p-4">
          <label htmlFor="username">Username: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="username"
            type="text"
            value={input.username}
            required
          />
        </div>
        <div className="p-4">
          <label htmlFor="email">Email: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="email"
            type="email"
            value={input.email}
            required
          />
        </div>
        <div className="p-4">
          <label htmlFor="password">Password: </label>
          <br />
          <input
            className=" rounded-lg"
            onChange={(e) => handleInputChange(e)}
            id="password"
            type="password"
            value={input.password}
            required
          />
        </div>
        <button
          className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
