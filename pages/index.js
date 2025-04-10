import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../src/components/Header/Header";
import Hero from "../src/components/Hero/Hero";
import Features from "../src/components/Features/Features";
import MedicineOrder from "../src/components/MedicineOrder/MedicineOrder";
import Cart from "../src/components/Cart/Cart";
import Medicine from "../src/components/Medicine";

export default function Home({ data, search_medicine }) {
  return (
    <div className={styles.container}>
      <Header />
      <Medicine data={data} search_medicine={search_medicine} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const { search_medicine = "", skip = 0, limit = 10 } = context.query;

  try {
    const response = await fetch(
      `https://k.healthxbd.com/echamber-dev/api/v1/medicines/?search_medicine=${search_medicine}&skip=${skip}&limit=${limit}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search_medicine.toLowerCase()) ||
        item.generic.toLowerCase().includes(search_medicine.toLowerCase()) ||
        item.unit_price.toString().includes(search_medicine)
    );

    return {
      props: {
        data: filteredData,
        search_medicine: search_medicine,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
