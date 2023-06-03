import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../requestMethods';
import { useSelector } from 'react-redux';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import "../components/Styles/PreLoader.css";
import NullUser from '../components/NullUser';
import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f9f9f9;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: #f9f9f9;
  padding-bottom: 20px;
`;

const PageTitle = styled.div`
  display: flex;
  width: 95%;
  max-width: 542px;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  ${mobile({
    width: "95%"
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

const OrderDetails = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userObj = useSelector((state) => state.user.currentUser);
  const userId = userObj?.user?._id || userObj?.user?.id;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest(token).get(`/orders/find/${userId}`);
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showPopup("error", "Something went wrong!");
      }
    };

    if (userId) {
      getOrders();
    }
  }, [token, userId]);

  return (
    <Container>
      <Navbar />
      <Content>
        {userObj ? (
          <>
            <PageTitle>Your Orders</PageTitle>
            {isLoading ? (
              <div className="card is-loading">
                <div className="image"></div>
                <div className="content">
                  <h2> </h2>
                  <p></p>
                </div>
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) =>
                order.products.map((product) => (
                  <OrderCard
                    key={product._id}
                    order={order}
                    productId={product.productId}
                  />
                ))
              )
            ) : (
              <NullUser btnVisibility={false} NullText={"No Orders found!"} />
            )}
          </>
        ) : (
          <NullUser btnVisibility={true} NullText={"Please login to view your orders!"} />
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default OrderDetails;
