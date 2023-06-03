import React, { useEffect, useState } from 'react';
import {
  BoldText,
  BookContainer,
  BookImg,
  CardBody,
  CardBodyContainer,
  CardContainer,
  CardDetails,
  CardHeader,
  CardHeaderContainer,
  FooterContainer,
  HeaderLeft,
  HeaderLeftContainer,
  Links,
  HeaderRightContainer,
  Info,
  InfoContainer,
  MutedText,
  StyledCard,
  BoldTextContainer
} from './Styles/OrderDetailStyles';
import Stepper from './Stepper';
import { publicRequest } from '../requestMethods';
import { createRoot } from 'react-dom/client';
import Modal from './Modal';

const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

const OrderCard = ({ order, productId }) => {
  const [orderStatus, setOrderStatus] = useState(0);
  const [product, setProduct] = useState({});
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    'en-US',
    dateOptions
  ).replace(',', ', ');
  const updatedOn = new Date(order.time);
  const now = new Date();
  const olderTime = new Date(updatedOn).toLocaleDateString('en-US', dateOptions);
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  const formattedTime = updatedOn.toLocaleTimeString('en-US', timeOptions);

  const formattedDateTime =
    updatedOn.toDateString() === now.toDateString()
      ? `${formattedTime}${updatedOn.getHours() >= 12 ? '' : ''}, Today`
      : `${formattedTime}${updatedOn.getHours() >= 12 ? '' : ''}, ${olderTime}`;

  useEffect(() => {
    const getStatusFromOrder = () => {
      if (order.status === 'pending' || order.status === 'paid') {
        setOrderStatus(0);
      } else if (order.status === 'confirmed') {
        setOrderStatus(1);
      } else if (order.status === 'shipped') {
        setOrderStatus(2);
      } else {
        setOrderStatus(3);
      }
    };
    getStatusFromOrder();
  }, [order.status]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/book/${productId}`);
        setProduct(res.data);
      } catch (err) {
        showPopup("error", "Something went wrong. Please try again later.");
      }
    };
    getProduct();
  }, [productId]);


  const handleReceipt = () => {
    window.open(order?.link, '_blank');
  }

  return (
    <StyledCard>
      <CardContainer>
        <CardHeader>
          <CardHeaderContainer>
            <HeaderLeftContainer>
              <HeaderLeft>
                <MutedText>Order ID: </MutedText>
                <BoldText>{order._id}</BoldText>
              </HeaderLeft>
              <HeaderLeft>
                <MutedText>Placed On:</MutedText>
                <BoldText>{formattedDate}</BoldText>
              </HeaderLeft>
            </HeaderLeftContainer>
            <HeaderRightContainer>
              <Links onClick={handleReceipt}>Receipt</Links>
            </HeaderRightContainer>
          </CardHeaderContainer>
        </CardHeader>
        <CardBodyContainer>
          <CardBody>
            <CardDetails>
              <InfoContainer>
                <BoldTextContainer>
                  <BoldText style={{ fontSize: '1.3rem' }}>
                    {product.title}
                  </BoldText>
                </BoldTextContainer>
                <MutedText>
                  Qt: {order.products.length} item
                </MutedText>
                <Info>
                  <BoldText style={{ fontSize: '1.5rem' }}>
                    &#8377; {order.amount}{' '}
                  </BoldText>
                  <MutedText style={{ marginLeft: '5px', fontSize: '1.2rem' }}>
                    via (Card)
                  </MutedText>
                </Info>
                <Info>
                  <MutedText>Last Updated on: </MutedText>
                  {formattedDateTime}
                </Info>
              </InfoContainer>
              <BookContainer>
                <BookImg src={product.img} />
              </BookContainer>
            </CardDetails>
          </CardBody>
          <Stepper orderStatus={orderStatus} />
        </CardBodyContainer>
        <FooterContainer>
          <Links>Track</Links>
          <Links>Cancel</Links>
          <Links>Help</Links>
        </FooterContainer>
      </CardContainer>
    </StyledCard>
  );
};

export default OrderCard;
