import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import "./Header.css";
const Header = () => {
  const [setLoggedIn] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="EmmaJhonShop" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/order">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button
          onClick={() => {
            setLoggedIn({});
          }}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
