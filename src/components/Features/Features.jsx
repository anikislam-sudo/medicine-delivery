import React from "react";
// import { Clock, Phone, DollarSign, FileText } from "lucide-react";
import img1 from "../../assets/features/img1.png";
import img2 from "../../assets/features/img2.png";
import img3 from "../../assets/features/img3.png";
import img4 from "../../assets/features/img4.png";
import classes from "./Features.module.css";
import Image from "next/image";

const features = [
  {
    icon: img1,
    title: "Quick Delivery",
    description: "Within 6 Hours in Dhaka City",
  },
  {
    icon: img2,
    title: "24/7 Hour Service",
    description: "Pharmacists On Call 24/7",
  },
  {
    icon: img3,
    title: "Affordable Prices",
    description: "Buy At Low Price And Avail Discount",
  },
  {
    icon: img4,
    title: "E-Prescription",
    description: "E-Prescription Facility Through My Health",
  },
];

const Features = () => {
  return (
    <div className={classes.container}>
      <div className={classes.features}>
        {features.map((feature, index) => (
          <div key={index} className={classes.feature}>
            <div className={classes.titleRow}>
              <div className={classes.featureIcon}>
                <Image
                  src={feature.icon}
                  height={28}
                  width={28}
                  alt="image"
                ></Image>
              </div>
              <h3 className={classes.featureTitle}>{feature.title}</h3>
            </div>
            <p className={classes.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
