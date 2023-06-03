import styled from "styled-components";

const TitleText = styled.h2`
  font-weight: 700;
  margin-left: 30px;
  //font-family: Copernicus, "Libre Baskerville", Georgia, serif;
  line-height: 32px;
  margin-top: 50px;
  font-size: 24px;
  line-height: 1.5;
`;
const CustomHr = styled.hr`
  color: #e7e7e7;
  height: 1px;
  border: none;
  border-top: 0.1px solid #e7e7e7;
  display: block;
  margin-bottom: 10px;
  line-height: 19px;
  border-top-width: 1px;
`;

export const Title = ({ text }) => {

  return (
    <>
      <TitleText>{text}</TitleText>
      <CustomHr/>
    </>
  );
};
