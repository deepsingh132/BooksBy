import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import "../Styles/app.css";

export const Container = styled.div`
  background-color: #fff;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: #fff !important;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const BookCard = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  min-height: 2rem;
  ${mobile({ alignItems: "center", justifyContent: "center" })}
`;

export const BookCardCover = styled.div`
  transition: transform 0.2s ease-in-out;
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  filter: drop-shadow(0 0.2rem 0.8rem rgba(0, 0, 0, 0.2));
`;

export const BookCoverImg = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Image = styled.img`
  object-fit: cover;
  max-width: 300px;
  max-height: 311px;
  border-radius: 0 6% 6% 0/4%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
  //padding: 0px 100px;
  margin: 0px 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  ${mobile({
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px",
    textAlign: "center",
  })}
`;

export const Title = styled.h1`
  font-weight: 500;
  //display: flex;
  overflow: hidden;
  word-wrap: break-word;
  color: #1e1915;
  word-break: break-word;
  max-width: 100%;
  max-height: fit-content;
  font-family: Copernicus, "Libre Baskerville", Georgia, serif;
  font-size: 3.6rem;
  text-overflow: ellipsis;
  line-height: 4.6rem;
  box-sizing: border-box;
  ${mobile({
    wordWrap: "normal",
    whiteSpace: "normal",
    fontSize: "2.2rem",
    lineHeight: "3rem",
  })}
`;

export const Author = styled.h3`
  margin: 0.8rem 0;
  font-weight: 400;
  color: #1e1915;
  display: flex;
  flex-basis: auto;
  font-family: Copernicus, "Libre Baskerville", Georgia, serif;
  white-space: nowrap;
  font-size: 1.33rem;
  //line-height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  ${mobile({ justifyContent: "center" })}
`;

export const Desc = styled.p`
  margin: 20px 0px;
  font: 400 1.1rem/1.4375 "Proxima Nova", Montserrat, Arial, sans-serif;
  overflow: hidden;
  word-break: break-word;
  color: #1e1915;
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;

export const Price = styled.span`
  font-weight: 300;
  font-size: 2.3rem;
  font-family: "Proxima Nova", Montserrat, Arial, sans-serif;
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;

export const FilterContainer = styled.div`
  width: 80%;
  margin: 40px 0px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  ${mobile({ width: "100%", flexDirection: "column"})}
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 30px;
  padding: 0 50px;
  ${mobile({  margin: "10px 0px", padding: "0px 10px" })}
`;

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const FilterType = styled.div`
  display: inline-block;
  background-color: #0b3c5d;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 20px 10px;
  cursor: pointer;
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
  display: flex;
  text-align: center;
  width: 70px;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
  //${mobile({ width: "100%" })}
`;

export const Hr = styled.hr`
  background-color: transparent;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-top: 1px solid #bbbfbf;
  display: block;
  height: 1px;
  line-height: 19px;
  margin-bottom: 14px;
  margin-top: 0;

  ${mobile({
    //display: "none"
  })}
`;

// const AmountContainer = styled.div`
//   display: flex;
//   width: fit-content;
//   text-align: center;
//   align-items: center;
//   justify-content: center;
//   font-weight: 700;
// `;

export const AddToCartContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 250px;
  height: fit-content;
  border-radius: 7px;
  justify-content: flex-end;
  border: 2px solid #cfd9de;
  ${mobile({
    marginTop: "20px",
    alignSelf: "center",
  })}
`;

export const CartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const OrderDetailsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-left: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const StockInfo = styled.div`
  font-size: 20px;
  color: green;
  font-weight: 500;
`;

export const CartTitle = styled.h3``;

export const ButtonContainer = styled.div`
  //display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  text-align: center;
  border: none;
  box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 99px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export const CustomSpan = styled.span`
  display: inline;
  font-size: 0.9rem;
  margin-right: 3px;
  vertical-align: top;
`;

export const CustomLink = styled(Link)`
	text-decoration: none;
	color: #0b3c5d;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
		color: var(--nav-color);
	}
`;