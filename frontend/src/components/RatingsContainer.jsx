import React, { useEffect } from "react";
import Rating from "react-rating";
import styled from "styled-components";
import { mobile } from "../responsive";

import starGrey from "../assets/star-grey.png";
import starYellow from "../assets/star-yellow.png";

const Wrapper = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  white-space: nowrap;
  ${mobile({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const Ratings = styled.img`
  height: 18px;
  width: 18px;
  margin-bottom: 10px;
  ${mobile({
    width: "24px",
    height: "24px",
  })}
`;

const RatingsContainer = ({ rating }) => {
  useEffect(() => {
    // Add your side effects or data fetching logic here
    // This code will be executed when the "rating" prop changes
  }, [rating]);

  return (
    <Wrapper>
      <Rating
        initialRating={rating}
        readonly={true}
        emptySymbol={<Ratings src={starGrey} alt="" />}
        fullSymbol={<Ratings src={starYellow} alt="" />}
      />
    </Wrapper>
  );
};

export default RatingsContainer;
