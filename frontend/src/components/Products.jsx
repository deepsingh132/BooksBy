import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import ProductCard from "./ProductCard";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "../components/Styles/carousel.css";
import { Carousel } from "./Carousel";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";
import axios from "axios";

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 0px;
`;


const CarouselContainer = styled.div`
  display: flex;
  padding: 0px 45px;
  align-items: center;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  ${mobile({
    padding: "10px",
  })};
`;


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({
    justifyContent: "center",
  })}
`;


const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

const Products = ({ cat, type, books }) => {
  const [products, setProducts] = useState([]);
  const [isVisble, setIsVisible] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  const ref = useRef();
  Carousel();

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setisFetched(true);
        }
      });
    };

    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);



  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
					books
						? `https://booksby.up.railway.app/api/products?ids=${books.join(
								","
						  )}`
						: "https://booksby.up.railway.app/api/products"
				);
        setProducts(res.data);
      } catch (err) {
        showPopup("error", "Something went wrong");
      }
    };
    if (isVisble || !isFetched) {
      getProducts();
    }
  }, [books, cat, isFetched, isVisble]);

  return (
    <Wrapper>
      {type ? (
        <CarouselContainer>
          <div className="carouselwrapper">
            <ChevronLeft id="left" className="btn" />
            <div className="carousel" ref={ref}>
              {products?.slice(10, 25).map((item) => (
                <Product
                  className="item"
                  item={item}
                  key={item._id}
                  type={type}
                />

              ))}
            </div>
            <ChevronRight id="right" className="btn" />
          </div>
        </CarouselContainer>
      ) : (
        <Container data-testid="products">
          {products?.slice(0, 8).map((item) => (
            <ProductCard item={item} key={item._id} type={type} />
          ))}
        </Container>
      )}
    </Wrapper>
  );
};

export default Products;
