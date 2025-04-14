import React from "react";
import classes from "./DiscountCards.module.css";
import { FaMedal } from "react-icons/fa";

const discountData = [
  {
    bgColor: "bgBlue",
    title: "10% Discount",
    subtitle: "Discount For Health Card User",
    iconColor: "iconBlue",
  },
  {
    bgColor: "bgPurple",
    title: "8% Discount",
    subtitle: "Discount For Every Healthx User",
    iconColor: "iconPurple",
  },
  {
    bgColor: "bgPeach",
    title: "4% Discount",
    subtitle: "Discount For Insulin",
    iconColor: "iconOrange",
  },
  {
    bgColor: "bgGreen",
    title: "Free Medicine Delivery",
    subtitle: "Over 1500 Tk Inside Dhaka City.",
    iconColor: "iconGreen",
  },
];

const DiscountCards = () => {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.discountCardsContainer}>
        {discountData.map((item, index) => (
          <div
            key={index}
            className={`${classes.card} ${classes[item.bgColor]}`}
          >
            <FaMedal className={`${classes.icon} ${classes[item.iconColor]}`} />
            <div>
              <h4 className={classes.title}>{item.title}</h4>
              <p className={classes.subtitle}>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCards;
