import React, { useRef, useState } from "react";
import { GiDrippingHoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { product } from "./Product";
import { LoginInfo } from "./Home";
import { Avatar, Paper, Popover, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface NavbarProps {
  LoggedInInfo: LoginInfo;
  tempProducts: product[];
  cart: product[];
  setProducts: (products: product[]) => void;
  setLoggedInInfo: ({}: any) => void;
}
const Navbar: React.FC<NavbarProps> = ({
  LoggedInInfo,
  tempProducts,
  cart,
  setProducts,
  setLoggedInInfo,
}: NavbarProps): JSX.Element => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const avatarElement = useRef<HTMLDivElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const handleAvatarClick = () => {
    setPopoverOpen(true);
  };
  const handleClose = () => {
    setPopoverOpen(false);
  };
  const predicate = ({ description }: any): boolean => {
    const arr: boolean[] = [];
    for (let key in description) {
      const result = description[key].toLowerCase();
      arr.push(result.includes(inputElement.current!.value.toLowerCase()));
    }
    return arr.some((e) => e === true);
  };
  const logout = () => {
    setLoggedInInfo({
      loggedIn: false,
      user: {
        _id: "",
        cart: [],
        email: "",
        password: "",
        username: "",
        role: "user",
      },
    });
  };
  const searchSubmit = () => {
    setProducts(tempProducts.filter((obj) => predicate(obj)));
  };
  return (
    <IconContext.Provider value={{ size: "40px" }}>
      <Paper
        elevation={10}
        style={{
          backgroundColor: "rgba(252, 211, 77,0.8)",
          display: "flex",
          justifyContent: "space-around",
          color: "black",
        }}
      >
        <div className="m-2 flex justify-center items-center">
          <GiDrippingHoney style={{ color: "orange" }} />
          <i className="px-4 text-white">
            <b>Honis</b>
          </i>
        </div>
        <div className="w-3/6 flex justify-evenly items-center  m-2 text-white">
          <Link className="hover:opacity-70" to="/about">
            <b>About</b>
          </Link>
          <a className="hover:opacity-70" href="/">
            <b>Categories</b>
          </a>
        </div>
        <div className="w-2/6 flex justify-evenly items-center m-2">
          <div className="relative w-1/2">
            <input
              className="w-full h-8 rounded-xl px-1"
              placeholder="Search..."
              ref={inputElement}
            ></input>
            <div className="absolute right-0 top-0">
              <button title="searchBar" onClick={searchSubmit}>
                <AiOutlineSearch size={30} />
              </button>
            </div>
          </div>
          <div className="flex relative w-1/12 h-full justify-center items-center hover:opacity-70">
            <Link to="/cart">
              <FaShoppingCart style={{ color: "white" }} size={30} />
            </Link>
            {cart.length > 0 ? (
              <div className="bg-red-600 font-extrabold font-mono text-white absolute top-0 right-0 rounded-full w-4 h-4 flex justify-center items-center">
                {cart.length}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {!LoggedInInfo.loggedIn ?
        <div className="w-2/6 flex justify-evenly items-center">
          <Link to="/login">
            <button
              className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
              type="button"
            >
              <b>Login</b>
            </button>
          </Link>
          <Link to="/register">
            <button
              className="w-20 m-2 rounded-xl p-2 bg-gradient-to-r from-amber-500 via-orange-300 to-yellow-400 text-white hover:opacity-70"
              type="button"
            >
              <b>Register</b>
            </button>
          </Link>
        </div>
        :
        <div className="flex justify-center items-center pr-2 hover:cursor-pointer">
          <Avatar alt="Avatar picture" onClick={handleAvatarClick}>
            {LoggedInInfo.user.username[0]}
          </Avatar>
          <Popover
            id="popover"
            open={popoverOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* TODO /profile */}
            <div className="w-36 flex flex-col">
              <Typography sx={{ p: 1 }}>
                Logged in as {LoggedInInfo.user.username}
              </Typography>
              <Link to={"/"} className="hover:opacity-60 ">
                <Typography sx={{ p: 1, width: "100%", display: "flex" }}>
                  Profile <AccountBoxIcon />
                </Typography>{" "}
              </Link>
              <Link to={"/cart"} className="hover:opacity-60 ">
                <Typography sx={{ p: 1, width: "100%", display: "flex" }}>
                  Cart <FaShoppingCart size={20} />
                </Typography>
              </Link>
              <Link to={"/"} className="hover:opacity-60 ">
                <Typography sx={{ p: 1, width: "100%", display: "flex" }}>
                  Settings <SettingsIcon />
                </Typography>
              </Link>
              <Link to={"/login"} className="hover:opacity-60 ">
                <Typography sx={{ p: 1, width: "100%", display: "flex" }}>
                  Logout <LogoutIcon />
                </Typography>
              </Link>
            </div>
          </Popover>
        </div>
        }
      </Paper>
    </IconContext.Provider>
  );
};
export default Navbar;
