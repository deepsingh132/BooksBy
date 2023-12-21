import { useDispatch, useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  addProduct,
  removeProduct,
  updateTotalThunk,
} from "../redux/cartRedux";
import {
  Addbtn,
  Bottom,
  Button,
  ButtonContainer,
  Container,
  Details,
  HrSpan,
  Image,
  ImageContainer,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductAmountHr,
  ProductCard,
  ProductDetail,
  ProductPrice,
  ProductSpan,
  Removebtn,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Title,
  Top,
  TopButton,
  TopText,
  TopTexts,
  Wrapper,
} from "../components/Styles/CartStyles";
import NullUser from "../components/NullUser";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import SpinnerOverlay from "../components/SpinnerOverlay";
import { createRoot } from "react-dom/client";
import Modal from "../components/Modal";
import VerifyUser from "../components/VerifyToken";

const Cart = ({user,token}) => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const shippingCharge = cart.total > 200 ? 0 : 20;
	const [isFetching, setIsFetching] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isValidated, setIsValidated] = useState(false); // to check if the user is validated or not
	const navigate = useNavigate();

	const userId = currentUser?.user?._id || currentUser?.user?.id; // get the user ID from the Redux store (if google user, use id instead of _id)

	useEffect(() => {
		if (!cart.products || cart.products.length === 0 || !cart.total) {
			dispatch(updateTotalThunk());
		}
	}, [cart.products, cart.total, dispatch]);

	useEffect(() => {
		if (isFetching) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		// Clean up the effect
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isFetching]);

	const showPopup = (msgType, msg) => {
		const rootElement = document.getElementById("modal");
		const existingRoot = rootElement._reactRootContainer;
		if (existingRoot) {
			existingRoot.render(<Modal msgType={msgType} msg={msg} />);
		} else {
			createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
		}
	};

	const handleCheckout = async () => {
		if (!cart.products || cart.products.length === 0 || !cart.total) {
			setIsFetching(false);
			showPopup("warning", "Please add some products to your cart!");
			return;
		}
		try {
			setIsFetching(true);

			const stripeIds = cart.products.map((product) => ({
				productId: product?.id,
				quantity: product.quantity,
			})); // get the product IDs from the Redux store to send to the backend for creating a Stripe session

			// if any of the stripeIds does not have the id property, then show an error message
			if (stripeIds.some((stripeId) => !stripeId?.productId)) {
				setIsFetching(false);
				showPopup("warning", "Some products in your cart are not registered with Stripe. Please remove them and try again");
				return;
			}

			/**
			 * TODO: Instead of sending the following product details as metadata to create the order, retreive the product details from the stripe checkout line items directly
			 */
			const products = cart.products.map((product) => ({
				productId: product._id,
				name: product.title,
				price: product.price,
				img: product.img,
				quantity: product.quantity,
			})); // get the cart products from the Redux store to send to the backend as metadata for creating a Stripe session (to be used for creating an order)

			// Create a Stripe checkout session and redirect the user to the checkout page with the following details
			const res = await publicRequest.post("checkout/create-checkout-session", {
				stripeProducts: stripeIds,
				cartProducts: products,
				userID: userId,
				quantity: cart.quantity,
				shipping: shippingCharge,
				total: cart.total,
			});
			if (res.data) {
				const url = new URL(res.data);
				window.open(url.toString(), "_blank");
				setIsFetching(false);
			}
			else {
				setIsFetching(false);
				showPopup("error", "Something went wrong! Please try again later.");
			}
		} catch (error) {
			setIsFetching(false);
			showPopup("error", "Something went wrong! Please try again later.");
		}
	};

	const handleRemove = (id) => {
		dispatch(removeProduct({ id }));
	};

	const handleAdd = (id, product) => {
		dispatch(addProduct({ ...product, quantity: 1 }));
	};

	//generate unique key for each product
	const generateKey = (pre) => {
		 let result = "";
			const characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const charactersLength = characters.length;
			let counter = 0;
			while (counter < pre.length) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
				counter += 1;
			}
			return result;
	};


	// Render the products in the cart
	const renderProducts = () => {
		return cart.products.map((product) => (
			<ProductCard key={generateKey(product._id)}>
				<Product>
					<ProductDetail>
						<ImageContainer>
							<Image src={product.img} />
						</ImageContainer>
						<Details>
							<ProductSpan>
								<b>Product:</b> {product.title}
							</ProductSpan>
							<ProductSpan>
								<b>ID:</b> {product._id}
							</ProductSpan>
							<ProductSpan>
								<b>Type:</b> {product.type ?? "Paperback"}
							</ProductSpan>
						</Details>
					</ProductDetail>
					<PriceDetail>
						<ProductAmountContainer>
							<ButtonContainer>
								<Addbtn onClick={() => handleAdd(product._id, product)} />
							</ButtonContainer>
							<HrSpan>
								<ProductAmountHr />
							<ProductAmount>{product.quantity}</ProductAmount>
								<ProductAmountHr />
							</HrSpan>
							<ButtonContainer>
								<Removebtn onClick={() => handleRemove(product.id)} />
							</ButtonContainer>
						</ProductAmountContainer>
						<ProductPrice>₹ {product.price * product.quantity}</ProductPrice>
					</PriceDetail>
				</Product>
			</ProductCard>
		));
	};

	return (
		<>
			<VerifyUser user={user}	token={token} setIsValidated={setIsValidated} />
			{isFetching && (
				<SpinnerOverlay
					apiCall={true}
					msg={"Redirecting to checkout page..."}
				/>
			)}
			<Container>
				<Navbar />
				<Announcement />
				<Wrapper>
					{currentUser ? (
						<>
							<Title>Your Cart</Title>
							<Top>
								<TopButton
									onClick={() => navigate("/")}
									style={{
										backgroundColor: "var(--accent-color)",
										color: "#000",
									}}
								>
									Continue Shopping
								</TopButton>
								<TopTexts>
									<TopText>Shopping Bag({cart.quantity})</TopText>
									<TopText>Your Wishlist (0)</TopText>
								</TopTexts>
							</Top>
							<Bottom>
								<Info>{renderProducts()} </Info>
								<Summary>
									<SummaryTitle>ORDER SUMMARY</SummaryTitle>
									<SummaryItem>
										<SummaryItemText>Subtotal</SummaryItemText>
										<SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
									</SummaryItem>
									<SummaryItem>
										<SummaryItemText>Estimated Shipping</SummaryItemText>
										<SummaryItemPrice>
											₹ {cart.quantity > 0 ? 20 : 0}{" "}
										</SummaryItemPrice>
									</SummaryItem>
									<SummaryItem>
										<SummaryItemText>Shipping Discount</SummaryItemText>
										<SummaryItemPrice>
											₹ {cart.total > 200 ? 20 : 0}
										</SummaryItemPrice>
									</SummaryItem>
									<SummaryItem type="total">
										<SummaryItemText>Total</SummaryItemText>
										<SummaryItemPrice>
											{cart.quantity > 0
												? cart.total + shippingCharge
												: cart.total}
										</SummaryItemPrice>
									</SummaryItem>
									<Button type="submit" onClick={handleCheckout}>
										Checkout now
									</Button>
								</Summary>
							</Bottom>
						</>
					) : (
						<NullUser btnVisibility={true} NullText={"Your Cart is empty!"} />
					)}
				</Wrapper>
				<Footer />
			</Container>
		</>
	);
};

export default Cart;
