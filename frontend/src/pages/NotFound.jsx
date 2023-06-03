import React from 'react';
import Lottie from "lottie-react";
import styled from 'styled-components';
import { mobile } from '../responsive';
import ErrorAnimation from "../assets/404.json";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 50px;
  align-items: center;
  text-align: center;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 500;
  ${mobile({
    padding: "20px",
    fontSize: "20px",
  })};
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 7px;
  border: none;
  background-color: #265bff;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #ff8c00;
  }
`;

const Animation = styled(Lottie)`
  height: 500px;
  width: 500px;
  ${mobile({
    height: "300px",
    width: "300px",
  })}
`;

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <Animation
          animationData={ErrorAnimation}
          loop={true}
          autoplay={true}
        />
        <InfoContainer>
          <h1>404</h1>
          <h2>UH OH! You're lost.</h2>
          <p>
            The page you are looking for does not exist. How you got here is
            a mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <Link to="/">
            <Button>HOME</Button>
          </Link>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
