import { Card } from "@mui/material";
import styled from "styled-components";
import { mobile } from "../../responsive";


// export const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: fit-content;
//   padding-top: 20px;
//   padding-bottom: 20px;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   background-color: #f9f9f9;
// `;


export const StyledCard = styled(Card)`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 16px !important;
  min-width: 0;
  z-index: 0;
  //padding-bottom: 1.5rem;
  word-wrap: break-word;
  background-clip: border-box;
  height: fit-content;
  width: 542px;
  background-color: #fff !important;
  border: 0 !important;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04) !important;
  ${mobile({
    height: "fit-content",
    width: "95%",
  })}
`;

export const CardContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  //padding: 10px;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0);
  //padding: 1.5rem;
  border-bottom: 2px solid #f5f5f5;
  //background-color: #000;
  justify-content: flex-start;
  align-items: start;
  text-align: center;
`;

export const CardHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  justify-content: space-between;
  //justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "1rem" })}
`;

export const HeaderLeftContainer = styled.div`
  display: flex;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  flex-direction: column;
`;
export const HeaderLeft = styled.div`
  display: flex;
`;

export const MutedText = styled.p`
  color: #757575;
  margin-right: 5px;
`;

export const BoldTextContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BoldText = styled.p`
  color: #4f4f4f;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 700;
`;

export const HeaderRightContainer = styled.div`
  display: flex;
  text-align: right;
  flex-direction: column;
  width: auto;
  max-width: 30%;
`;

export const Links = styled.div`
  display: flex;
  text-decoration: none;
  font-size: 1rem;
  color: #3b71ca;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
    color: #2f0f5d;
  }
`;

export const CardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  ${mobile({ padding: "1rem" })}
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  //justify-content: space-between;
  width: calc(100% - 200px - 16px); /* added */
  ${mobile({ width: "60%" })}
`;



export const BookContainer = styled.div`
  display: flex;
  background-color: #000;
  height: 200px;
  width: 150px;
  max-width: 30%;
  border-radius: 0 6% 6% 0/4%;
  ${mobile({
    height: "150px", width: "100px"
  })}
`;

export const BookImg = styled.img`
  border-radius: 0 6% 6% 0/4%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  vertical-align: middle;
  width: 100%;
`;

export const ProgressContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex: 3;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusIndicator = styled.div`
  display: flex;
  line-height: 29px;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  color: #fff;
  align-items: center;
  justify-content: center;
  height: 29px !important;
  width: 29px !important;
  background-color: #1266f1;
  border-radius: 50%;
`;

export const StatusLineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StatusLine = styled.hr`
  border: 2px solid ${(props) => props.color || "#757575"};
  width: 100%;
`;

export const StatusTextContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: space-between;
  width: 100%;
  ${mobile({ marginBottom: "1rem" })}
`;

export const StatusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
  if (props.prop === "left") {
    return "flex-start";
  } else if (props.prop === "center") {
    return "center";
  } else if (props.prop === "right") {
    return "flex-end";
  }
}};
  width: 33.33%;
`;

export const ViewMore = styled.div`
  display: flex;

  //width: ;
  justify-content: flex-end;
  align-items: end;
`

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  justify-content: space-between;
  background-color: hsla(0, 0%, 100%, 0);
  border-top: 2px solid #f5f5f5;
`;
