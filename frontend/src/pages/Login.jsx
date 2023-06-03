import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appIcon from "../icon/appicon.svg";
import GoogleLogin from "../components/GoogleLogin";
import { login } from "../redux/ApiCalls";

import {
	AppLogo,
	AppTitle,
	AppTitleContainer,
	Container,
	CreateAccount,
	CustomLink,
	Form,
	FormContainer,
	FormTitleContainer,
	GoogleContainer,
	Input,
	InputContainer,
	LabelContainer,
	Line,
	LineContainer,
	Or,
	PassWord,
	SpinnerButton,
	SpinnerButtonContainer,
	Title,
	VisibilityContainer,
	Wrapper,
} from "../components/Styles/AuthStyles";
import { loginFailure } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { publicRequest } from "../requestMethods";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Modal from "../components/Modal";



const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const GoogleLoginMemoized = React.memo(GoogleLogin);
	const ModalMemoized = React.memo(Modal);

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const showPopup = (msgType, msg) => {
		const rootElement = document.getElementById("modal");
		const existingRoot = rootElement._reactRootContainer;
		if (existingRoot) {
			existingRoot.render(<ModalMemoized msgType={msgType} msg={msg} />);
		} else {
			createRoot(rootElement).render(<ModalMemoized msgType={msgType} msg={msg} />);
		}
	};

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	const navigate = useNavigate();

	const { isFetching, error } = useSelector((state) => state.user);

	useEffect(() => {
		// Get the token from the query parameter and show the popup
		const token = new URLSearchParams(window.location.search).get(
			"verifytoken"
		);
		const verifiedEmail = new URLSearchParams(window.location.search).get(
			"email"
		);
		const msg = new URLSearchParams(window.location.search).get("msg");

		if (verifiedEmail) {
			setEmail(verifiedEmail);
		}

		/**
		 * Verify the user using the token
		 */
		const VerifyUser = async () => {
			try {
				const res = await publicRequest(`auth/verify/${token}`);

				if (msg) {
					showPopup("error", msg);
				}

				if (res.status === 200 || res.status === 201) {
					showPopup(
						"verified",
						`${res.data.message} Please login to continue`
					);
				}  else {
					showPopup("error", res.data.message);
				}
			} catch (error) {
				showPopup("error", error.response.data.message);
			}
		};
		if (token) VerifyUser();
	}, []);



	const handleValidation = () => {
		if (email === "" || password === "") {
			showPopup("error", "Please fill all the fields");
			return;
		}
		const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!emailPattern.test(email)) {
			showPopup("warning", "Invalid email");
			return;
		}
		if (password.length < 8) {
			showPopup("warning", "Password must be at least 8 characters long");
			return;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (handleValidation()) {
			login(dispatch, { email, password });
		}
	};

	if (user) {
		navigate("/");
	}

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
		if (error) {
			dispatch(loginFailure());
		}
}, [dispatch, error, navigate, user]);


	return (
			<Container>
				<AppTitleContainer>
					<AppTitle>BooksBy</AppTitle>
				</AppTitleContainer>
				<Wrapper>
					<AppLogo src={appIcon} alt="logo" />
					<FormContainer data-testid="form">
						<FormTitleContainer>
							<Title>Sign In</Title>
						</FormTitleContainer>
						<Form onSubmit={handleSubmit}>
							<label htmlFor="Email">Email</label>
							<InputContainer>
								<Input
									type="email"
									required
									data-testid="email"
									aria-labelledby="Email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputContainer>
							<LabelContainer>
								<label htmlFor="Password">Password</label>
								<PassWord
									data-testid="forgot-password"
									onClick={() => navigate("/recover_password")}
								>
									Forgot your password?
								</PassWord>
							</LabelContainer>
							<InputContainer>
								<Input
									required
									aria-labelledby="Password"
									maxLength={128}
									minLength={8}
									id="password"
									data-testid="password"
									type={showPassword ? "text" : "password"}
									style={{ padding: "0.4em 3em 0.4em 1.6em" }}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{showPassword ? (
									<VisibilityContainer onClick={handleTogglePasswordVisibility}>
										<Visibility />
									</VisibilityContainer>
								) : (
									<VisibilityContainer onClick={handleTogglePasswordVisibility}>
										<VisibilityOff />
									</VisibilityContainer>
								)}
							</InputContainer>
							<SpinnerButtonContainer>
								<SpinnerButton
									type="submit"
									id="submit"
									data-testid="login-button"
									disabled={isFetching}
									className={isFetching ? "loading" : ""}
								>
									{isFetching ? null : "Sign In"}
								</SpinnerButton>
							</SpinnerButtonContainer>
							<GoogleContainer>
								<LineContainer>
									<Line />
									<Or>or</Or>
									<Line />
								</LineContainer>
								<GoogleLoginMemoized />
							</GoogleContainer>
							<CustomLink to="/register" data-testid="register">
								<CreateAccount>Create a new account</CreateAccount>
							</CustomLink>
						</Form>
					</FormContainer>
				</Wrapper>
			</Container>
	);
};

export default Login;
