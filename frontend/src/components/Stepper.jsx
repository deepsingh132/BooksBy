import React from "react";
import {
  BoldText,
  MutedText,
  ProgressContainer,
  StatusContainer,
  StatusIndicator,
  StatusLine,
  StatusLineContainer,
  StatusText,
  StatusTextContainer,
} from "../components/Styles/OrderDetailStyles";

import { Check } from "@mui/icons-material";

const Stepper = ({ orderStatus }) => {

  return (
    <>
      <ProgressContainer>
        <StatusContainer>
          <StatusIndicator>{orderStatus === 1 || orderStatus === 2 || orderStatus === 3 ? <Check /> : 1}</StatusIndicator>
        </StatusContainer>

        <StatusLineContainer>
          <StatusLine color={orderStatus === 1 || orderStatus === 2 || orderStatus === 3 ? "#1266f1" : "#757575"} />
        </StatusLineContainer>

        <StatusContainer>
          <StatusIndicator>{orderStatus === 2 || orderStatus === 3 ? <Check /> : 2}</StatusIndicator>
        </StatusContainer>

        <StatusLineContainer>
          <StatusLine color={orderStatus === 3 ? "#1266f1" : "#757575"} />
        </StatusLineContainer>

        <StatusContainer>
          <StatusIndicator>{orderStatus === 3 ? <Check /> : 3}</StatusIndicator>
        </StatusContainer>
      </ProgressContainer>

      <StatusTextContainer>
        <StatusText prop="left">
          {orderStatus >= 0 ? (
            <BoldText>Placed</BoldText>
          ) : (
            <MutedText>Placed</MutedText>
          )}
        </StatusText>

        <StatusText prop="center">
          {orderStatus > 1 ? (
            <BoldText>Shipped</BoldText>
          ) : (
            <MutedText>Shipped</MutedText>
          )}
        </StatusText>

        <StatusText prop="right">
          {orderStatus > 2 ? (
            <BoldText>Delivered</BoldText>
          ) : (
            <MutedText>Delivered</MutedText>
          )}
        </StatusText>
      </StatusTextContainer>
    </>
  );



};

export default Stepper;
