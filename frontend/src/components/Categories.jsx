import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import CategoryItem from "./CategoryItem";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

const Container = styled.div`
  display: flex;
  padding: 20px;
  height: 400px;
  margin-top: 30px;
  width: 100%;
  margin-bottom: 70px;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    maxHeight: "30vh",
    marginBottom: "0px",
  })}

  @media screen and (min-width: 768px) {
    width: auto;
    justify-content: center;
    align-items: center;
  }
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

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest.get(
					"products/categories"
				);
        setCategories(res.data);
      } catch (error) {
        showPopup("error", "Something went wrong. Please try again later.");
      }
    };
    getCategories();
  }, []);

  return (
    <Container data-testid="categories">
      {categories.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Categories;

