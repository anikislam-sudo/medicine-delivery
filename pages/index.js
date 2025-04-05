import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../src/components/Header/Header";
import Hero from "../src/components/Hero/Hero";
import Features from "../src/components/Features/Features";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header></Header>
      <Hero></Hero>
      <Features></Features>
    </div>
  );
}
