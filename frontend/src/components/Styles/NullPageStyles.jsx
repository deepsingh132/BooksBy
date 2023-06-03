import styled from "styled-components";
import { mobile } from "../../responsive";

export const NullUserContainer = styled.div`
  height: 50vh;
  width: 70%;
  //border-radius: 8px;
  background-color: #f9f9f9;
  ${mobile({
    width: "100vw",
  })}
`;

export const NullUserWrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: 24px;
  word-spacing: 2px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInBtn = styled.button`
  //height: 10px;
  //width: 20px;
  padding: 7px 20px 7px 20px;
  display: flex;
  margin: 5px;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  color: #0f1111;
  font-weight: 600;
  box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#ecb30a"};
  }
`;
