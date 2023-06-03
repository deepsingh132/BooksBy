import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RatingsContainer from "../components/RatingsContainer";
import {
	AddContainer,
	AddToCartContainer,
	Author,
	BookCard,
	BookCardCover,
	BookCoverImg,
	Button,
	ButtonContainer,
	CartContainer,
	CartTitle,
	Container,
	CustomLink,
	CustomSpan,
	Desc,
	Filter,
	FilterContainer,
	FilterTitle,
	FilterType,
	Hr,
	Image,
	InfoContainer,
	OrderDetailsContainer,
	OrderInfoContainer,
	Price,
	StockInfo,
	Title,
	Wrapper,
} from "../components/Styles/ProductStyles";
import { Carousel } from "../components/Carousel";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "../components/Styles/carousel.css";
import VerifyUser from "../components/VerifyToken";
import SpinnerOverlay from "../components/SpinnerOverlay";
import { createRoot } from "react-dom/client";
import Modal from "../components/Modal";

const InstituteInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: auto;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	text-align: left;
	justify-content: left;
	align-items: center;
  cursor: pointer;
	${mobile({
		width: "100%",
	})}
`;

const InstituteName = styled.h3`
  margin-left: 10px;
  align-self: flex-start;
	width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 1.2rem;
	font-weight: 600;
	color: #000;
`;

const InstituteAddress = styled.p`
  margin-left: 10px;
	align-self: flex-start;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 1rem;
	font-weight: 400;
	color: #000;
`;


const ImagesContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const ImageCarousel = styled.div`
	position: relative;
	display: inline-block;
	height: 200px;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 20px;
	width: 200px;
	margin-right: 30px;
	margin-left: 30px;
	border-radius: 10px;
	cursor: pointer;

	& > img {
		object-fit: cover;
		height: 100%;
		width: 100%;
		border-radius: inherit;

		${mobile({
			height: "100%",
			width: "200px",
		})}
	}
	&:hover {
		& > img {
			transition: all 0.5s ease;
			opacity: 0.9;
		}
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

const Product = ({ user, token }) => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [instituteIds, setinstituteIds] = useState([]);
	const [institutes, setInstitute] = useState(null);

	const [isValidated, setIsValidated] = useState(false);

	const [isFetched, setisFetched] = useState(false);
	Carousel({ type: "institute" });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const getProduct = async () => {
			try {
				setisFetched(true);
				const res = await publicRequest.get("/products/book/" + id);
				setProduct(res.data);
				setinstituteIds(res.data.institutions);
				setisFetched(false);
			} catch (err) {
				showPopup("error", "Error fetching product, please try again later.");
				setisFetched(false);
			}
		};
		getProduct();
	}, [id]);

	useEffect(() => {
		const getinstitutes = async () => {
			try {
				const res = await publicRequest.get(
					`/institute?ids=${instituteIds.join(",")}`
				);
				setInstitute(res.data);
			} catch (err) {
				showPopup("error", "Error fetching institutes, please try again later.");
			}
		};
		if (instituteIds && instituteIds.length > 0) {
			getinstitutes();
		}
	}, [instituteIds, id]);


	// TODO: Implement logic for handling rating click events
	const onRatingClick = (rating) => {
		// TODO: Add implementation
	};

	const handleQuantity = (e) => {
		setQuantity(e.target.value);
	};

	const handleClick = () => {
		// create check for user token
		if (!isValidated) {
			showPopup("warning", "Please login again to continue");
			navigate("/login");
			return;
		}
		if (product?.inStock === false) {
			showPopup("warning", "Product is out of stock");
			return;
		}
		dispatch(addProduct({ ...product, quantity }));
  };

	const handleBuyNow = () => {
		/**
		 * TODO: Add implementation for buy now
		 */
	 };

	return (
		<>
			{!isFetched ? (
				<>
					<VerifyUser
						token={token}
						user={user}
						setIsValidated={setIsValidated}
					/>
					<Container data-testid="product-page">
						<Navbar />
						<Announcement />
						<Wrapper>
							<BookCard>
								<BookCardCover>
									<BookCoverImg>
										<Image src={product.img} />
									</BookCoverImg>
								</BookCardCover>
							</BookCard>
							<InfoContainer>
								<Title>{product.title}</Title>
								<Author>
									<CustomSpan>by:</CustomSpan>

									<CustomLink to={`/products?q=${product.author}`}>
										{product.author}
									</CustomLink>
								</Author>
								<RatingsContainer onClick={onRatingClick}
									rating={product.rating ? product.rating : null}
								/>
								<Hr />
								<Price>₹ {product.price}</Price>
								<Desc>
									{" "}
									{product.desc
										? product.desc
										: "No description available"}{" "}
								</Desc>
								<FilterContainer style={{ width: "100%", margin: "" }}>
									<Filter
										style={{
											alignSelf: "start",
											margin: "10px 0px",
											padding: "0px",
										}}
									>
										<FilterTitle>Type </FilterTitle>
										<FilterType>
											{" "}
											{product.type ? product.type : "PaperBack"}{" "}
										</FilterType>
									</Filter>
								</FilterContainer>
							</InfoContainer>

							<AddToCartContainer>
								<CartContainer>
									<CartTitle>Buy this Book now!</CartTitle>
									<OrderInfoContainer>
										{product.inStock ? (
											<StockInfo>In Stock</StockInfo>
										) : (
											<StockInfo
												style={{
													color: "red",
												}}
											>
												Out of Stock
											</StockInfo>
										)}

										<AddContainer>
											<FormControl
												fullWidth
												sx={{
													justifyContent: "center",
													textAlign: "center",
												}}
											>
												<InputLabel
													id="demo-simple-select-label"
													sx={{
														overflow: "visible",
														fontSize: "15px",
														justifyContent: "center",
														alignItems: "center",
														textAlign: "center",
													}}
												>
													Quantity
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={quantity}
													label="Quantity"
													sx={{
														height: "50px",
														width: "100px",
														justifyContent: "center",
														alignItems: "center",
														textAlign: "center",
													}}
													onChange={handleQuantity}
												>
													<MenuItem value={1}>1</MenuItem>
													<MenuItem value={2}>2</MenuItem>
													<MenuItem value={3}>3</MenuItem>
													<MenuItem value={4}>4</MenuItem>
													<MenuItem value={5}>5</MenuItem>
													<MenuItem value={6}>6</MenuItem>
													<MenuItem value={7}>7</MenuItem>
												</Select>
											</FormControl>
										</AddContainer>

										<OrderDetailsContainer>
											Sold by: &nbsp;
											<a href={`/products?q=${product?.publisher}`}>
												{"publisher"}
											</a>
										</OrderDetailsContainer>

										<OrderDetailsContainer>
											Deliver to: {"new park road,778"}
										</OrderDetailsContainer>
									</OrderInfoContainer>

									<Button
										backgroundColor="#0b3c5d"
										color="#fff"
										hoverColor="#084c73"
										onClick={handleClick}
									>
										Add to Cart
									</Button>
									<ButtonContainer>
										<Button
											backgroundColor="var(--accent-color)"
											color="#000"
											hoverColor="#ffad07"
											onClick={handleBuyNow}
										>
											Buy Now
										</Button>
									</ButtonContainer>
								</CartContainer>
							</AddToCartContainer>
						</Wrapper>
						{institutes && instituteIds?.length > 0 ? (
							<Filter
								style={{
									flexDirection: "column",
									paddingBottom: "20px",
									backgroundColor: "#fff",
								}}
							>
								<FilterTitle
									style={{ alignSelf: "flex-start", padding: "30px" }}
								>
									Institutes
								</FilterTitle>
								<div className="institutecarousel carouselwrapper">
									{institutes?.length > 1 && (
										<ChevronLeft id="left" className="btn" />
									)}
									<div className="carousel">
										{institutes?.map((item, index) => (
											<ImagesContainer key={item._id}>
												<InstituteInfoContainer
													onClick={() => navigate(`/institute/${item._id}`)}
												>
													<ImageCarousel
														title={`${item.name}`}
														onClick={() => navigate(`/institute/${item._id}`)}
													>
														<img
															src={
																item.img
																	? item.img
																	: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
															}
															alt="img"
														/>
													</ImageCarousel>
													<InstituteName>
														{item.name ? item.name : "Unknown"}
													</InstituteName>
													<InstituteAddress>
														{item.location ? item.location : "Unknown"}
													</InstituteAddress>
													<InstituteAddress>
														{item.totalBooks
															? item.totalBooks + " Books"
															: "No Books"}
													</InstituteAddress>
												</InstituteInfoContainer>
											</ImagesContainer>
										))}
									</div>
									{institutes?.length > 1 && (
										<ChevronRight id="right" className="btn" />
									)}
								</div>
							</Filter>
						) : null}
						<Newsletter />
						<Footer />
					</Container>
				</>
			) : (
				<SpinnerOverlay apiCall={true} />
			)}
		</>
	);
};

export default Product;
