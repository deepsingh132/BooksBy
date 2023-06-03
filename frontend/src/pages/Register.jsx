import appIcon from "../icon/appicon.svg";
import {
  Container,
  FormContainer,
  AppTitle,
  Input,
  Form,
  Title,
  AppLogo,
  Wrapper,
  Agreement,
  SpinnerButton,
  VisibilityContainer,
  InputContainer,
  FormTitleContainer,
  SpinnerButtonContainer,
} from "../components/Styles/AuthStyles";
import { useState } from "react";
import { register } from "../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Modal from "../components/Modal";
import { createRoot } from "react-dom/client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchedPassword, setMatchedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMatchedPasswordChange = (e) => {
    setMatchedPassword(e.target.value);
  };

  const handleValidation = () => {
    if (name.length < 3) {
      showPopup("warning", "Name must be at least 3 characters long");
      return false;
    }

    if (password !== matchedPassword) {
      showPopup("error", "Passwords do not match");
      return false;
    }

    if (password.length < 8) {
      showPopup("warning", "Password must be at least 8 characters long");
      return false;
    }

    if (!name || !email || !password || !matchedPassword) {
      showPopup("error", "Please fill all the fields");
      return false;
    }

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(email)) {
      showPopup("error", "Invalid email");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      register(dispatch, { name, email, password });
    }
  };

  return (
    <Container>
      <AppTitle>BooksBy</AppTitle>
      <Wrapper>
        <AppLogo src={appIcon} alt="logo" />
        <FormContainer>
          <FormTitleContainer>
            <Title>Create An Account</Title>
          </FormTitleContainer>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <InputContainer>
              <Input
                placeholder="Full name"
                required
                data-testid="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <label htmlFor="email">Email</label>
            <InputContainer>
              <Input
                type="email"
                required
                id="email"
                data-testid="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <label htmlFor="password">Password</label>
            <InputContainer>
              <Input
                placeholder="At least 8 characters"
                required
                maxLength={128}
                minLength={8}
                id="password"
                data-testid="password"
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                style={{ padding: "0.4em 2.5em 0.4em 1.6em" }}
              />
              <VisibilityContainer onClick={handleTogglePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </VisibilityContainer>
            </InputContainer>
            <label htmlFor="matchedPassword">Re-enter password</label>
            <InputContainer>
              <Input
                type="password"
                required
                maxLength={128}
                minLength={8}
                id="matchedPassword"
                data-testid="matchedPassword"
                value={matchedPassword}
                onChange={handleMatchedPasswordChange}
              />
            </InputContainer>
            <Agreement>
              By creating an account, you agree to the BooksBy{" "}
              <b>Terms of Service</b> and <b>Privacy Policy</b>
            </Agreement>
            <SpinnerButtonContainer>
              <SpinnerButton
                type="submit"
                role="button"
                id="register"
                data-testid="register-button"
                disabled={isFetching}
                className={isFetching ? "loading" : ""}
              >
                {isFetching ? null : "Create"}
              </SpinnerButton>
            </SpinnerButtonContainer>
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default Register;
