import React, { useState } from 'react'
import { BackToLogin, ContainerBg, Form, Input, InputContainer, KeyIcon, LabelContainer, SpinnerButton, SpinnerButtonContainer, SubTitle, Title, VisibilityContainer} from '../components/Styles/AuthStyles'
import { createRoot } from 'react-dom/client';
import { publicRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';
import Modal from '../components/Modal';

const showPopup = (msgType, msg) => {
		const rootElement = document.getElementById("modal");
		const existingRoot = rootElement._reactRootContainer;
		if (existingRoot) {
			existingRoot.render(<Modal msgType={msgType} msg={msg} />);
		} else {
			createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
		}
};

const PasswordReset = () => {

	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { token, email } = Object.fromEntries(new URLSearchParams(window.location.search));
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login")
		}
	}, [navigate, token]);

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const resetPassword = async () => {
		setIsFetching(true);
		if (!token) {
			setIsFetching(false);
			showPopup("error", "Invalid token");
			return;
		}
		try {
      const response = await publicRequest.post(`/auth/reset/${token}`, {
				password,
				confirmPassword,
			});
      setIsFetching(false);
			showPopup("success", response.data.message + "\n Redirecting to login page...");
			setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setIsFetching(false);
      showPopup("error", err.response?.data?.message);
    }
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			showPopup("error", "Passwords do not match");
			return;
		}
		resetPassword();
  }

  return (
		<ContainerBg>
			<KeyIcon>
				<Key />
			</KeyIcon>
			<Title>Set new password</Title>
			<SubTitle>
				Your new password must be different from previously used passwords
			</SubTitle>
			<Form onSubmit={handleSubmit}>
				<LabelContainer>
					<label>Email</label>
				</LabelContainer>
				<InputContainer>
					<Input type="email" disabled value={email ? email : ""} />
				</InputContainer>
				<LabelContainer>
					<label>New Password</label>
				</LabelContainer>
				<InputContainer>
					<Input
						type={showPassword ? "text" : "password"}
						required
						aria-labelledby="Password"
						maxLength={128}
						minLength={8}
						id="password"
						data-testid="password"
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
				<LabelContainer>
					<label>Confirm New Password</label>
				</LabelContainer>
				<InputContainer>
					<Input
						type="password"
						required
						onChange={(e) => setconfirmPassword(e.target.value)}
					/>
				</InputContainer>
				<SpinnerButtonContainer>
					<SpinnerButton
						type="submit"
						disabled={isFetching}
						className={isFetching ? "loading" : ""}
					>
						{isFetching ? null : "Reset Password"}
					</SpinnerButton>
				</SpinnerButtonContainer>
			</Form>
			<BackToLogin onClick={() => navigate("/login")}>
				<SubTitle>
					<ArrowBack /> &nbsp; Back to log in
				</SubTitle>
			</BackToLogin>
		</ContainerBg>
	);
}

export default PasswordReset;