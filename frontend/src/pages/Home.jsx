import React, { useLayoutEffect } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { Title } from "../components/Title";


const Home = () => {

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f1f3f6";
  });

  const isMobile = window.matchMedia("(max-width: 568px)").matches;

  return (
      <div style={{ overflow: isMobile ? "hidden" : "visible" }}>
      <Navbar />
      <Slider />
      <Categories />
      <Title text={"Bookshelf"} />
      <Products type={ProductCard} />
      <Title text={"Bestsellers"} />
      <Products />
      <Newsletter />
      <Footer />
      </div>
  );
};

export default Home;
