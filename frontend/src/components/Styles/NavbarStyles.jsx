import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

export const NavContainer = styled.nav`
	height: 50px;
	width: 100vw;
	//top: 0;
	padding: 10px 0px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	//position: fixed;
	border-bottom: 2px solid #f1f1f1;
	//top: 0;
	//z-index: 1000;
	//box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	//background: #f9f9f9; //rgb(14, 47, 68);
	background: #fff;
	margin-bottom: 0px;
	//box-sizing: border-box;
	${mobile({
		height: "100%",
		width: "100vw",
		justifyContent: "center",
		//padding: "10px 0px",
		//marginBottom: "100px",
	})}
`;

export const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
	background-color: #3f51b5;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	${mobile({ padding: "10px 0px" })}
`;

export const PhoneSearch = styled.div`
	align-items: center;
	justify-content: center;
	width: 99%;
	display: none;
	//margin-bottom: 40px;
	margin: 2px 0 1px;
	${mobile({ display: "flex", alignSelf: "center", paddingBottom: "10px" })}
`;

export const PhoneSearchContainer = styled.div`
	/* border: 2px solid #d8d5d5; */
	display: flex;
	flex: 1;
	align-self: center;
	width: 100%;
	height: 38px;
	background-color: #fff;
	align-items: center;
	border-radius: 7px;

	&:focus-within {
		border: 2px solid var(--accent-color);
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.2),
			0px 0px 2px #ff9900;
		outline: none;
	}

	${mobile({
		//display: "flex",
		//flex: "1 !important",
	})}
`;

export const Left = styled.div`
	/* flex: 1; */
	display: flex;
	align-items: center;
	//margin-right: 10px;
`;

export const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: "none" })}
`;

export const SearchContainer = styled.div`
	/* border: 2px solid #d8d5d5; */
	display: flex;
	//flex: 1;
	width: 100%;
	height: 38px;
	background-color: #fff;
	align-items: center;
	margin-left: 10px;
	border-radius: 7px;

	&:focus-within {
		border: 2px solid var(--accent-color);
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.2),
			0px 0px 2px #ff9900;
		outline: none;
	}

	@media only screen and (min-width: 1300px) {
		width: 600px;
	}

	@media only screen and (min-width: 1000px) and (max-width: 1299px) {
		width: 400px;
	}

	@media only screen and (min-width: 769px) and (max-width: 999px) {
		width: 100%;
	}

	${mobile({
		display: "none",
	})}
`;

export const Input = styled.input`
	border: none;
	width: 100%;
	flex: 1;
	outline: none;
	background-color: #fff; //#f7f7f7;
	border-radius: 20px;
	margin-right: 10px;
	margin-left: 10px;
	${mobile({ width: "70%" })}
`;

export const Center = styled.div`
	flex: 1;
	align-items: center;
	align-self: center;
	text-align: center;
	display: flex;
	justify-content: center;
	//${mobile({ width: "100%" })}
`;

export const SearchBackground = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 38px;
	cursor: pointer;
	background-color: var(--accent-color);
	border-radius: 0px 7px 7px 0px;
	${mobile({ width: "40px" })}

	&:hover {
		background-color: #ebb30a;
	}
`;

export const Right = styled.div`
	flex: 1;
	display: flex;
	width: auto;
	margin-right: 10px;
	align-items: center;
	justify-content: flex-end;

	${mobile({
		flex: "0",
		fontSize: "14px",
		marginRight: "20px",
		marginLeft: "10px",
	})}
`;

export const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
	margin-top: auto;
`;

export const List = styled.ul`
	display: flex;
	color: #fff;
	z-index: 9999;
	margin-right: 10px;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	${mobile({
		display: "none",
	})}
`;

export const Item = styled.li`
	text-decoration: none;
	color: #fff;
`;

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	z-index: 999;
	display: ${({ isMenuOpen }) => (isMenuOpen ? "block" : "none")};
`;

export const AutoSuggestContainer = styled.div`
	display: flex;
	flex: 1;
	height: auto;
	text-align: left;
	padding-right: 10px;
	flex-direction: row;
	align-items: center;
	color: #000;
	//cursor: pointer;
	margin: 5px;
	width: 100%;
	max-width: auto;
	text-decoration: none;
`;

export const AutoSuggestImg = styled.img`
	height: 50px;
	width: 50px;
	object-fit: contain;
	margin-right: 10px;
`;

export const AutoSuggestText = styled.h3`
	font-size: 14px;
	margin: 0;
	padding: 0;
	overflow: hidden;
	word-break: normal;
	word-wrap: break-word;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-decoration: none;
`;

export const MenuItem = styled.div`
	/* font-size: 1.1rem; */
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	margin-top: 3px;
	justify-content: center;
	//margin-left: 15px;
	${mobile({
		// fontSize: "0.9rem",
		flexDirection: "row",
		marginLeft: "0px",
		marginTop: "0px",
		alignItems: "baseline",
	})}
`;

export const CenterContainer = styled.div`
	flex: 1;
	align-items: center;
	align-self: center;
	text-align: center;
	display: flex;
	justify-content: center;
	//${mobile({ width: "100%" })}
`;

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const LogoImg = styled.div`
	height: 85px;
	width: 85px;
	margin-left: 10px;
	margin-right: 5px;
	${mobile({ marginLeft: "5px", height: "80px", width: "80px" })}
`;

export const AppIconImg = styled.img`
	height: 100%;
	width: 100%;
	${mobile({ height: "80px", width: "80px" })}
`;

export const StyledLink = styled(Link)`
	text-decoration: none;

	&:hover {
		/* text-decoration: underline; */
		/* color: #fff; */
	}
`;

// export const ProfilePic = styled.img`
// 	height: 30px;
// 	width: 30px;
// 	object-fit: cover;
// 	border-radius: 50%;
// 	margin-right: 10px;
// 	${mobile({ height: "30px", width: "30px" })}
// `;

export const Logo = styled.h1`
	font-weight: bold;
	font-size: 27px;
	margin-left: 25px;
	//color: var(--accent-color);
	//color: #023047;
	color: #0b3c5d;
	${mobile({ marginLeft: "0px", fontSize: "24px" })}
`;
