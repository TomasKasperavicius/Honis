import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface LoginProps {
  setLoggedInInfo: ({}: any) => void;
}
interface LoginInfo{
  email: string,
  password: string,
}
const Login: React.FC<LoginProps> = ({
  setLoggedInInfo,
}: LoginProps): JSX.Element => {
  const [input, setInput] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(
        "http://localhost:4545/user/login",
        input
      );
      if (status !== 200) {
        throw new Error("Wrong credentials");
      }
      console.log(data);
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
        onSubmit={(e) => login(e)}
        className="w-1/4 h-3/4 flex flex-col justify-evenly items-center bg-amber-100 rounded p-2"
      >
        <div>
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
        <div>
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
          className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-500 text-white hover:opacity-70"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
