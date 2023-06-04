import { loginSuccess } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import google from "../assets/google.png";
import {
  GoogleBtnContainer,
  GoogleIcon,
  GoogleLoginBtn,
} from "./Styles/AuthStyles";
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

const Login = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    // Get the token from the query parameter and log in the user
    const token = new URLSearchParams(window.location.search).get('token');

    const verifyToken = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        if (token) {
          const res = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/auth/login/verify-token",
            {},
            config
          );
          dispatch(loginSuccess(res.data));
        }
      } catch (err) {
        showPopup("error", "Something went wrong");
      }
    };
    verifyToken();

  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    window.open(process.env.REACT_APP_BACKEND_URL + "/auth/google" , "_self");
  };

  return (
    <GoogleBtnContainer>
      <GoogleLoginBtn onClick={handleClick}>
        <GoogleIcon
          src={google}
          alt="google"
        ></GoogleIcon>
        Sign in with Google
      </GoogleLoginBtn>
    </GoogleBtnContainer>
  );
};

export default Login;
