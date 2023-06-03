import React, { useEffect, useState } from 'react'
import { BackToLogin, ContainerBg, Form, Input, InputContainer, LabelContainer, SpinnerButton, SpinnerButtonContainer, SubTitle, Title} from '../components/Styles/AuthStyles'
import { publicRequest } from '../requestMethods';
import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const showPopup = (msgType, msg) => {
		const rootElement = document.getElementById("modal");
		const existingRoot = rootElement._reactRootContainer;
		if (existingRoot) {
			existingRoot.render(<Modal msgType={msgType} msg={msg} />);
		} else {
			createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
		}
};
  
const PasswordRecover = () => {
  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching) {
      setEmail("");
    }
  }, [isFetching]);

  const sendEmail = async () => {
    try {
      setIsFetching(true);
      const res = await publicRequest.post("/auth/recover", { email })
        setIsFetching(false);
        showPopup("success", res.data.message);
    } catch (error) {
      setIsFetching(false);
      if (error.response.data.message) {
        showPopup("error", error.response.data.message);
      }
      else {
        showPopup("error", error.response.data);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showPopup("error", "Please enter your email");
      return;
    }
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(email)) {
			showPopup("warning", "Invalid email");
			return;
		}
      sendEmail();
  }

  return (
		<ContainerBg>
			<Title>Forgot your password?</Title>
			<SubTitle>No worries, we'll send you reset instructions</SubTitle>
			<Form onSubmit={handleSubmit}>
				<LabelContainer style={{ marginBottom: "0px" }}>
					<label>Email</label>
				</LabelContainer>
				<InputContainer>
					<Input
						type="email"
						required
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</InputContainer>
				<SpinnerButtonContainer>
					<SpinnerButton
						type="submit"
						disabled={isFetching}
						className={isFetching ? "loading" : ""}
					>
						{isFetching ? null : "Send"}
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

export default PasswordRecover