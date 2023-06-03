import styled from "styled-components";
import { mobile } from "../../responsive";
import { Add, Delete } from "@mui/icons-material";

export const Container = styled.div``;

export const Wrapper = styled.div`
	padding: 20px;
	background-color: #fff !important;
	${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
	font-weight: 500;
	font-size: 28px;
	margin-top: 10px;
	line-height: 36px;
	text-rendering: optimizeLegibility;
	text-align: center;
`;

export const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0px;

`;

export const TopButton = styled.button`
	padding: 10px;
	border: none;
	font-weight: 600;
	border-radius: 10px;
	cursor: pointer;
	box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};

	&:hover {
		background-color: #f4b90a !important;
	}
	${mobile({ display: "none" })}
`;

export const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
export const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

export const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
	flex: 3;
`;

export const ProductCard = styled.div`
	//display: flex;
	border: 0.5px solid lightgray;
	margin: 0px 10px 10px 0px;
	border-radius: 10px;
	//padding: 0px 0px 0px 0px;
	${mobile({
		border: "2px solid #eee",
	 })}
`;

export const Product = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 10px;
	${mobile({ flexDirection: "column", marginBottom: "0px" })}
`;

export const ProductDetail = styled.div`
	flex: 2;
	display: flex;
	${mobile({
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	})}
`;

export const ImageContainer = styled.div`
	display: flex;
	min-height: 200px;
	width: 150px;
	border-radius: 0 6% 6% 0/4%;
`;

export const Image = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 0 6% 6% 0/4%;
	object-fit: cover;
`;

export const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	${mobile({
		padding: "10px 0px",
		width: "100%",
		alignItems: "flex-start",
		fontSize: "1.1rem",
		margin: "5px 0 10px",
		justifyContent: "space-between",
	})}
`;

export const ProductSpan = styled.span`
	margin: 5px;
	${mobile({ margin: "auto" })}
`;


export const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const ProductAmountContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	font-weight: 600;
	padding: 0 10px;
	border-radius: 7px;
	border: 1px solid lightgray;
	${mobile({
		marginBottom: "10px",
	})}
`;

export const HrSpan = styled.span`
	display: flex;
	/* width: auto;
	height: 100%; */
`

export const ProductAmountHr = styled.hr`
	border: 1px solid #ddd;
	margin: 0px 10px;
	${mobile({
		margin: "0px 5px",
	})}
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: #eee;
		border-radius: 99px;
	}
`;

export const Removebtn = styled(Delete)`
	/* margin-left: 10px; */
	font-size: 24px !important;
	color: #000;
	cursor: pointer;
`;

export const Addbtn = styled(Add)`
	/* margin-right: 10px; */
	font-size: 24px !important;
	color: #000;
	cursor: pointer;
`;

export const ProductAmount = styled.div`
	font-size: 20px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

export const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

export const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

export const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

export const SummaryTitle = styled.h1`
	font-weight: 200;
`;

export const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
	width: 100%;
	padding: 10px;
	border: none;
	cursor: pointer;
	box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	border-radius: 10px;
	background-color: var(--accent-color);
	color: #000;
	font-weight: 600;

	&:hover {
		background-color: #f4b90a;
	}
`;
