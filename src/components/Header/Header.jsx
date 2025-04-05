import React from "react";
import classes from "./Header.module.css"; // Adjust this import based on your file location
import Image from "next/image";
import logo from "../../assets/header/image 6.png";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <span className={classes.logoIcon}>
          <Image src={logo} height={40} width={150} alt="image"></Image>
        </span>
      </div>
      {/* 
        <div className="cart-area">
          <div className="cart-badge">
            <span>0 Item</span>
            <span>🛒</span>
            <span>৳ 400.00</span>
          </div>
          <div className="whatsapp-icon">
            <span>📱</span>
          </div>
        </div> 
      */}
    </header>
  );
};

export default Header;
