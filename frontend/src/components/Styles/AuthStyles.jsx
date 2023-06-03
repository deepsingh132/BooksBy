import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

export const ContainerBg = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Container = styled.div`
	display: flex;
	width: 100vw;
	min-height: 100vh;
	background-color: #f4f1ec;
	height: 100%;
	overflow-x: hidden;
	padding-bottom: 10px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${mobile({
		paddingTop: "50px",
		paddingBottom: "50px",
	})}
`;

export const Wrapper = styled.div`
	display: flex;
	//height: fit-content;
	justify-content: center;
	max-width: "41.6rem";
	align-items: center;
	align-content: center;
	position: relative;
	width: 50%;
	border-radius: 1.5rem;
	border: 0.1rem solid rgb(227, 229, 231);
	padding: 2.5rem;
	margin-top: 10px;
	box-shadow: rgba(0, 0, 0, 0.08) 0px 4.48rem 5.27rem,
		rgba(0, 0, 0, 0.06) 0px 1.87rem 2.2rem, rgba(0, 0, 0, 0.05) 0px 1rem 1.17rem,
		rgba(0, 0, 0, 0.04) 0px 0.56rem 0.66rem,
		rgba(0, 0, 0, 0.03) 0px 0.29rem 0.35rem, rgba(0, 0, 0, 0.1) 0px 0px 0.8rem;
	background-color: #ffffff;
	${mobile({
		width: "95%",
		borderRadius: "1.5rem",
		padding: "1.6rem",
		flexDirection: "column",
	})}
`;

export const FormContainer = styled.div`
	display: flex;
	padding: 30px;
	//justify-content: center;
	flex-direction: column;
	${mobile({
		padding: "0px",
	})}
`;

export const FormTitleContainer = styled.div`
	display: flex;
	height: fit-content;
	width: 100%;
	margin-top: 0px;
	${mobile({
		alignItems: "center",
		justifyContent: "center",
	})}
`;

export const Title = styled.h1`
	font-size: 2rem;
	line-height: 1.2;
	text-rendering: optimizeLegibility;
	//padding-bottom: 20px;
	font-weight: 500;
	margin-bottom: 20px;

	${mobile({
		textAlign: "center",
	})}
`;

export const SubTitle = styled.h2`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	line-height: 1.2;
	text-rendering: optimizeLegibility;
	padding-bottom: 10px;
	color: gray;
	font-weight: 400;
	margin-bottom: 20px;
	${mobile({
		textAlign: "center",
	})}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const KeyIcon = styled.div`
	display: flex;
	height: 50px;
	width: 50px;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
	background-color: var(--accent-color);
	border-radius: 50%;
	transform: translateY(-50%);
	transition: 0.3s ease-in-out;
	${mobile({
		height: "40px",
		width: "40px",
	})}
`;

export const Input = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	border-radius: 24px;
	border: 1px solid #a6a6a6;
	border-top-color: #949494;
	background-color: #fafafa;
	font-size: 16px;
	min-width: 40%;
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
	width: 100%;
	//height: 100%;
	margin: 10px 0px;
	//height: 36px;
	padding: 0.4em 1em 0.4em 1.6em;
	line-height: 23px;
	outline: 0;
	&:hover:not(:focus) {
		background-color: #ebebeb;
	}
	&:focus {
		background-color: #fff;
		border-color: #000;
		box-shadow: 0 0 0 2px #dee0ed;
	}

	${mobile({})}
`;

export const BackToLogin = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin-top: 20px;
	&:hover {
		text-decoration: underline;
		text-decoration-color: gray;
	}
`;

export const VisibilityContainer = styled.div`
	position: absolute;
	display: flex;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	transition: 0.3s ease-in-out;
	cursor: pointer;
`;

export const SpinnerButtonContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const PassWord = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-end;
	font-size: 16px;
	margin-left: 30px;
	color: #1e1915;
	line-height: 19px;
	justify-content: right;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

export const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const CreateAccount = styled.span`
	font-size: 16px;
	width: fit-content;
	line-height: 19px;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export const AppTitleContainer = styled.div`
	display: flex;
	margin-top: 1%;
	padding-bottom: 20px;
	vertical-align: top;
	cursor: pointer;
	text-align: center;
	z-index: 9999;
`;

export const AppLogo = styled.img`
	height: 100%;
	width: 50%;
`;

export const AppTitle = styled.h1`
	font-size: 38px;
	text-align: center;
	font-weight: 600;
`;

export const Error = styled.span`
	color: red;
	margin-top: 10px;
`;

export const LineContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const Line = styled.hr`
	flex-grow: 1;
	margin: 0 10px;
	border: none;
	border-top: 1px solid #a6a6a6;
`;

export const Or = styled.span`
	font-size: 18px;
	font-weight: 500;
`;

export const CustomLink = styled(Link)`
	text-decoration: none;
	width: fit-content;
	margin-top: 10px;
	color: #1e1915;
	&:hover {
		text-decoration: underline;
	}
`;

export const GoogleContainer = styled.div`
	display: flex;
	font-weight: 500;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const Agreement = styled.span`
	font-size: 14px;
	margin: 20px 0px;
`;

export const GoogleBtnContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const GoogleLoginBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	min-width: 40%;
	height: 40px;
	width: 100%;
	margin-top: 5px;
	padding: 10px;
	border: 1px solid #17181c;
	border-radius: 24px;
	font-weight: 500;
	//font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: #e6e6e6;
		box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	}
`;

export const GoogleIcon = styled.img`
	display: flex;
	height: 22px;
	margin-right: 10px;
	align-items: center;
	justify-content: space-between;
`;

export const SpinnerButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 40%;
	height: 40px;
	width: 100%;
	border-radius: 24px;
	border: none;
	font-weight: 500;
	padding: 10px;
	box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	background-color: var(--accent-color);
	color: #000;
	cursor: pointer;
	margin-top: 20px;
	margin-bottom: 5px;
	transition: all 0.3s ease-in-out;

	&:disabled {
		color: green;
		cursor: not-allowed;
	}

	&:hover {
		background-color: #eeb50a;
	}

	&.loading {
		min-width: 0px;
		width: 40px;
		height: 40px;
		padding: 0px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: var(--accent-color);
		}
	}

	&.loading::after {
		content: "";
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 5px solid #fff;
		border-top-color: transparent;
		animation: spinner 1.2s linear infinite;
	}

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
