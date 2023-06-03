import React, { useCallback, useEffect} from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userRedux";
import { userRequest } from "../requestMethods";
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

const VerifyUser = React.memo(({ user, token, setIsValidated }) => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
  dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const verifyUser = async (token) => {
      try {
        const res = await userRequest(token).post("/verify-user");
        if (res.status === 200) {
          setIsValidated(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setIsValidated(false);
          showPopup("error", "Session expired! Please login again");
          handleLogout();
        }
        showPopup("error", "Something went wrong! Please login again");
        handleLogout();
      }
    };

    if (user && token) {
      verifyUser(token);
    }
  }, [dispatch, token, user, setIsValidated, handleLogout]);

  return null;
});

export default VerifyUser;
