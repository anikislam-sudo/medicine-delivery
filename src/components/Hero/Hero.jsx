import React from "react";
import classes from "./Hero.module.css";
import people from "../../assets/hero/doctor.png";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <div className={classes.ytLink}>
          <span>
            <FaYoutube />
          </span>{" "}
          <p> See How To Order Your Prescribed Medicine</p>
        </div>
        <h1 className={classes.heroTitle}>
          Bangladesh's #1 Genuine
          <br /> Medicine Delivery – See
          <br /> Prices & Discounts!
        </h1>
      </div>
      <div className={classes.heroImage}>
        <div className={classes.doctorImage}>
          <Image
            src={people}
            height={430}
            width={500}
            alt="Doctor with medicine"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
