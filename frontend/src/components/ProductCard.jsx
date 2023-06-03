import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RatingsContainer from './RatingsContainer';
import { mobile } from '../responsive';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.search ? '100%' : '380px')};
  min-width: 300px;
  max-width: 300px;
  padding: 20px;
  box-sizing: border-box;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 0.5px solid lightgray;
  text-overflow: ellipsis;
  word-wrap: break-word;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f6f6f6;
`;

const ImgContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

const CardImage = styled.img`
  max-width: 100%;
  z-index: 2;
  max-height: ${(props) => (props.search ? '196px' : '100%')};
  object-fit: contain;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  text-overflow: ellipsis;
  padding: 20px;
  box-sizing: border-box;
  ${mobile({
    alignItems: 'center',
    justifyContent: 'center',
  })}
`;

const BookTitleContainer = styled.div`
  display: flex;
  max-width: 99%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  ${mobile({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`;

const BookTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-family: Copernicus, 'Libre Baskerville', Georgia, serif;
  letter-spacing: normal;
  text-decoration: none;
  color: #0f1111;
  &:hover {
    text-decoration: underline;
    color: #1266f1;
  }
  ${mobile({
    alignSelf: 'center',
  })}
`;

const BookDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
`;

const BookDesc = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  font-family: 'Proxima Nova', Montserrat, Arial, sans-serif;
  word-wrap: break-word;
  white-space: normal;
  letter-spacing: normal;
  color: #555;
  line-height: 24px !important;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #3b71ca;
  }
`;

const BookPrice = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  word-wrap: break-word;
  white-space: normal;
  letter-spacing: normal;
  color: #0f1111;
`;

const Circle = styled.div`
  height: ${(props) => (props.search ? '50%' : '150px')};
  width: ${(props) => (props.search ? '70%' : '150px')};
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const ProductCard = ({ item, search }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <CardContainer search={search}>
      <Card>
        <ImageContainer onClick={handleProductClick} title={item.title}>
          {item.img && <Circle search={search} />}
          <ImgContainer>
            <CardImage
              src={
                item.img ||
                'https://d15be2nos83ntc.cloudfront.net/images/no-cover.png'
              }
              search={search}
            />
          </ImgContainer>
        </ImageContainer>
        <CardInfoContainer>
          <BookTitleContainer>
            <BookTitle to={`/product/${item._id}`}>{item.title}</BookTitle>
          </BookTitleContainer>
          <BookDescContainer>
            <BookDesc to={`/products?=${item.author ? item.author.trim() : ''}`}>
              {item.author ? item.author : 'Author Unknown'}
            </BookDesc>
            <BookDesc>{item.type || ''}</BookDesc>
          </BookDescContainer>
          <RatingsContainer rating={item.rating} />
          <BookPrice>
            <span style={{ fontSize: '16px', verticalAlign: 'top', marginRight: '2px' }}>
              &#8377;
            </span>
            {item.price}
          </BookPrice>
        </CardInfoContainer>
      </Card>
    </CardContainer>
  );
};

export default ProductCard;
