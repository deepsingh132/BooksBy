import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  margin: 18px;
  min-width: 200px;
  height: 300px;
  display: flex;
  text-overflow: ellipsis;
  border-radius: 0 6% 6% 0/4%;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  ${mobile({
    'min-width': '140px',
    height: '200px',
    margin: '0px 15px 10px 0px',
  })}

  cursor: ${({ clicked }) => (clicked ? 'default' : 'pointer')};

  .book {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: perspective(2000px);
  }

  ${({ clicked }) =>
    clicked &&
    `
    .book {
      z-index: 1;
      transform: perspective(2000px);
      box-shadow: inset 10px 0 50px rgba(0, 0, 0, 0.5);
    }

    .cover {
      transform: rotateY(-135deg);
    }
  `}

  .cover {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transform-origin: left;
    z-index: 1;
    transition: 1s;
  }

  .cover img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    display: flex;
    position: absolute;
    top: 0;
    flex-direction: column;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 0px;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const Author = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const Product = ({ item }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Container clicked={clicked} onClick={handleClick}>
      <div className="book">
        <div className="cover">
          <Image
            src={
              item.img ||
              'https://d15be2nos83ntc.cloudfront.net/images/no-cover.png'
            }
          />
        </div>
        <div className="details">
          <Text>
            <Title>{item.title}</Title>
            <Author>{item.author}</Author>
            <Price>₹ {item.price}</Price>
          </Text>
          <Link
            style={{ marginTop: '5px', marginBottom: '15px' }}
            to={`/product/${item._id}`}
          >
            <Button
              style={{
                background: '#0b3c5d',
                color: 'var(--accent-color)',
              }}
            >
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Product;
