import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 100%;
  width: 100%;
  position: relative;
  ${mobile({
    maxWidth: "200px",
    maxHeight: "25vh",
  })}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	max-width: 100%;
	max-height: 100%;
  ${mobile({
    maxWidth: "200px",
    maxHeight: "20vh",
  })}
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ position: "absolute" })}
`;

const Title = styled.h1`
  color: #000;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  ${mobile({ fontSize: "1rem" })}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container data-testid="category">
      <Link style={{ textDecoration: "none" }} to={`/products?q=${item.title}`}>
        <Image src={item.img} />
        <TextContainer>
          <Title>{item.title}</Title>
        </TextContainer>
      </Link>
    </Container>
  );
};

export default CategoryItem;
