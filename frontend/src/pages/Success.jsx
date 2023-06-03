import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";
import { removeAllProducts } from "../redux/cartRedux";
import Lottie from "lottie-react";
import book1 from "../assets/book.json";
import styled from "styled-components";
import success from "../assets/success.json";
import { mobile } from "../responsive";
import { Button } from "../components/Styles/CartStyles";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Modal from "../components/Modal";
import SpinnerOverlay from "../components/SpinnerOverlay";
import NotFound from "./NotFound";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  /* display: flex; */
  height: 100%;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  font-weight: 500;
  overflow: hidden;
  ${mobile({
    fontSize: "20px",
  })}
`;

const Animation = styled(Lottie)`
  height: 500px;
  width: 500px;
  ${mobile({
    height: "300px",
    width: "300px",
  })}
`;

const OrderStatus = styled.div`
  display: block;
  width: 100vw;
  max-width: 90vw;
  white-space: wrap;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow-wrap: break-word;
  ${mobile({
    margin: "10px",
    maxWidth: "90vw",
    fontSize: "1.1rem",
  })}
`;

const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

const Success = () => {
  const { search } = useLocation(); // get the query parameters from the URL
  const dispatch = useDispatch();
  const sessionId = new URLSearchParams(search).get("session_id"); // retrieve the session ID from the query parameters
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const [invoicePdf, setInvoicePdf] = useState('');
  const [orderId, setOrderId] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const [isDisplay, setIsDisplay] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const lottieRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId || !user) {
      setIsFetching(false);
    }
  }, [sessionId, user]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await publicRequest.get(
          `checkout/order/success?session_id=${sessionId}`
        );
        setOrderId(res.data.orderID); // set the order ID in the state
        setInvoiceUrl(res.data.invoiceUrl);
        setInvoicePdf(res.data.invoicePdf);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        showPopup("error", "Error in fetching order details, contact support with the payment ID: " + sessionId);
      }
    };
    if (sessionId && user) {
      getOrder();
    }
  }, [sessionId, user]);

  const handleGoToHomepage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (orderId && sessionId && invoiceUrl && invoicePdf) {
      dispatch(removeAllProducts()); // remove all products from the cart after the order has been created successfully
				setTimeout(() => {
					// open the invoice in a new tab and download the invoice PDF after 3 seconds
					window.open(invoiceUrl, "_blank");
					window.open(invoicePdf, "_blank");
				}, 3000);
		}
  });

  return (
    <>
    {!isFetching && sessionId && user? (
        <>
          <Container>
            <Wrapper>
              <Navbar />
              {orderId? (
                <>
                {isDisplay && (
                <Wrapper>
                  <Animation
                    animationData={success}
                    loop={false}
                    autoPlay={true}
                    lottieRef={lottieRef}
                    style={{ height: "90%", width: "100%" }}
                    onComplete={() => setIsDisplay(false)}
                  />
                </Wrapper>
                )}
                <InfoContainer>
                  {orderId && sessionId && !isDisplay && (
                    <>
                      <Animation animationData={book1} loop={true} />
                      <OrderStatus>
                          {`Order has been created successfully. Your order number is: ${orderId}`}

                        </OrderStatus>
                        <Button style={{ width: "fit-content", marginTop: "20px", padding: "15px" }} onClick={handleGoToHomepage}>
                          Go to Homepage
                        </Button>
                    </>
                  )}
                  </InfoContainer>
                </>
              ) : (
                  <NotFound/>
              )
              }
              <Footer />
            </Wrapper>
          </Container>
      </>
      ) : (
          <>
            {isFetching && <SpinnerOverlay apiCall={true} />}
          {!isFetching && (
            <NotFound />
          )}
          </>
    )}
  </>
  );
};

export default Success;
