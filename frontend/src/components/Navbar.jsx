import { Badge } from "@mui/material";
import { Logout, Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import appIcon from "../icon/appicon.svg";
import {
	AppIconImg,
	Center,
	Left,
	LogoContainer,
	LogoImg,
	MenuItem,
	Right,
	SearchBackground,
	SearchContainer,
	PhoneSearchContainer,
	PhoneSearch,
	AutoSuggestContainer,
	AutoSuggestImg,
	AutoSuggestText,
	StyledLink,
} from "./Styles/NavbarStyles";
import "./Navbar.css";
import Autosuggest from "react-autosuggest";
import "../components/Styles/theme.css";
import { publicRequest } from "../requestMethods";
import { logoutUser } from "../redux/userRedux";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

const showPopup = (msgType, msg) => {
	const rootElement = document.getElementById("modal");
	const existingRoot = rootElement._reactRootContainer;
	if (existingRoot) {
		existingRoot.render(<Modal msgType={msgType} msg={msg} />);
	} else {
		createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
	}
};

const Navbar = () => {
	const user = useSelector((state) => state.user.currentUser);
	const quantity = useSelector((state) => state.cart.quantity);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const query = searchParams.get("q");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [searchQuery, setSearchQuery] = useState(query || "");
	const [suggestions, setSuggestions] = useState([]);
	const dispatch = useDispatch();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		// Get StyledLink reference to the nav element
		const nav = document.querySelector("nav");
		if (nav) {
			// Add the "active" class to the nav element
			nav.classList.toggle("active");
		}
		document.body.classList.toggle("menu-open");
	};

	const onSearchTermChange = (event, { newValue }) => {
		setSearchQuery(newValue);
	};

	useEffect(() => {
		if (query) {
			setSearchQuery(query);
		}
	}, [query]);

	const handleSearchQuery = () => {
		if (searchQuery) navigate(`/products?q=${searchQuery.trim()}`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newQuery = query || searchQuery;
		if (newQuery) handleSearchQuery(newQuery.trim());
	};

	const fetchAutocompleteResults = async (query) => {
		try {
			const response = await publicRequest.get(
				"/products/search/autocomplete",
				{
					params: {
						q: query,
					},
				}
			);
			return response.data;
		} catch (error) {
			showPopup("error", "Error fetching autocomplete results");
		}
	};

	const getSuggestions = async (value) => {
		const data = await fetchAutocompleteResults(value);
		setSuggestions(data);
	};

	const renderSuggestion = (suggestion) => {
		return (
			<AutoSuggestContainer>
				<AutoSuggestImg
					src={
						suggestion.img
							? suggestion.img
							: "https://d15be2nos83ntc.cloudfront.net/images/no-cover.png"
					}
					alt=""
				/>
				<AutoSuggestText>{suggestion?.title}</AutoSuggestText>
			</AutoSuggestContainer>
		);
	};

	const body = document.querySelector("body"),
		nav = document.querySelector("nav");

	body.addEventListener("click", (e) => {
		let clickedElm = e.target;

		if (
			!clickedElm.classList.contains("sidebarOpen") &&
			!clickedElm.classList.contains("menu")
		) {
			nav?.classList.remove("active");
			setIsMenuOpen(false);
			document.body.classList.remove("menu-open");
		}
	});

	const handleLogout = () => {
		if (user) {
			dispatch(logoutUser());
		}
		navigate("/login");
	};

	return (
		<div>
			<nav>
				<div className="nav-bar" data-testid="navbar">
					<div
						style={{ display: "flex", flexDirection: "column", width: "100%" }}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Left>
								<i className="bx bx-menu sidebarOpen" onClick={toggleMenu}></i>
								<Link style={{ textDecoration: "none" }} to="/">
									<LogoContainer>
										<LogoImg>
											<AppIconImg
												data-testid="logo"
												src={appIcon}
												alt="logo"
											></AppIconImg>
										</LogoImg>
									</LogoContainer>
								</Link>
								<span className="logo navLogo">
									<StyledLink to="/">BooksBy</StyledLink>
								</span>

							</Left>
							<Center>
								<form onSubmit={handleSubmit}>
									<SearchContainer data-testid="search-box">
										<Autosuggest
											data-testid="autosuggest"
											suggestions={suggestions ? suggestions.slice(0, 7) : []}
											onSuggestionsFetchRequested={({ value }) =>
												getSuggestions(value)
											}
											onSuggestionsClearRequested={() => setSuggestions([])}
											getSuggestionValue={(suggestion) =>
												suggestion ? suggestion.title : ""
											}
											renderSuggestion={renderSuggestion}
											onSuggestionSelected={(event, { suggestion }) => {
												navigate(`/product/${suggestion._id}`);
											}}
											inputProps={{
												placeholder: "Search for books or institutions",
												id: "search",
												value: searchQuery,
												onChange: onSearchTermChange,
											}}
										/>
										<SearchBackground
											data-testid="search-button"
											onClick={() => handleSearchQuery()}
										>
											<Search
												type="submit"
												className="searchButton"
												style={{ color: "#0e2f44", fontSize: 24 }}
											/>
										</SearchBackground>
									</SearchContainer>
								</form>
							</Center>

							<div className={`menu ${isMenuOpen ? "active" : ""}`}>
								<div className="logo-toggle">
									<span className="logo">
										<StyledLink to="/">BooksBy</StyledLink>
									</span>
									<i className="bx bx-x siderbarClose" onClick={toggleMenu}></i>
								</div>

								<ul className="nav-links">
									<li className="center">
										<StyledLink to="/order_details">Orders</StyledLink>
									</li>
									<li className="center">
										{user ? (
												<StyledLink to="/login">Account</StyledLink>
										) : (
											<StyledLink to="/login">Sign In</StyledLink>
										)}
										<ul className="dropdown">
											<li className="dropdownli">
												<StyledLink to="/profile">Profile</StyledLink>
											</li>
											<li>
												<StyledLink to="/wishlist">Wishlist</StyledLink>
											</li>
											<li>
												<StyledLink to="/order_details">My Orders</StyledLink>
											</li>
											<li>
												<StyledLink to="/logout" onClick={() => handleLogout()}>
													Sign Out
												</StyledLink>
											</li>
										</ul>
									</li>
									<li className="center">
										<MenuItem onClick={() => navigate("/cart")}>
											<Badge
												badgeContent={quantity}
												data-testid="cart-badge"
												sx={{
													"& .MuiBadge-badge": {
														color: "#000",
														backgroundColor: "#f4c440",
													},
												}}
											>
												<ShoppingCartOutlined
													data-testid="cart"
													style={{ color: "#fff" }}
												/>
											</Badge>
											<StyledLink>Cart</StyledLink>
										</MenuItem>
									</li>

									<li className="center signout">
										<MenuItem style={{alignItems: "center"}} onClick={() => handleLogout()}>
											{user && (
											<StyledLink>
												Sign Out
											</StyledLink>
										) }
											<Logout style={{ color: "#fff", alignSelf: "center" }} />
										</MenuItem>
										</li>



								</ul>

								<Right></Right>
							</div>
						</div>
						<PhoneSearch>
							<form onSubmit={handleSubmit} style={{ width: "100%" }}>
								<PhoneSearchContainer>
									<Autosuggest
										suggestions={suggestions ? suggestions.slice(0, 5) : []}
										onSuggestionsFetchRequested={({ value }) =>
											getSuggestions(value)
										}
										onSuggestionsClearRequested={() => setSuggestions([])}
										getSuggestionValue={(suggestion) =>
											suggestion ? suggestion.title : ""
										}
										renderSuggestion={renderSuggestion}
										onSuggestionSelected={(event, { suggestion }) => {
											navigate(`/product/${suggestion._id}`);
										}}
										inputProps={{
											placeholder: "Search for books/institutions",
											value: searchQuery,
											onChange: onSearchTermChange,
										}}
									/>
									<SearchBackground onClick={() => handleSearchQuery()}>
										<Search
											type="submit"
											className="searchButton"
											style={{ color: "#0e2f44", fontSize: 24 }}
										/>
									</SearchBackground>
								</PhoneSearchContainer>
							</form>
						</PhoneSearch>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
