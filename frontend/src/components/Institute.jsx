import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { FavoriteBorder } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  margin-bottom: 10px;
  margin-top: 10px;
  //width: 635px;
  width: 80%;
  height: 250px;
  display: flex;
  text-overflow: ellipsis;
  flex-direction: row;
  border-radius: 8px;
  //border-width: 1px;
  //border-color: #cfd9de;
  //border: 1px solid #cfd9de;
  align-items: center;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
  //justify-content: center;
  background-color: #fff;
  position: relative;
  overflow: hidden; /* to prevent text overflow */

  ${mobile({
    width: "100%",
    height: "400px",
    flexDirection: "column",
  })}

  &:hover {
    /* cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  //padding: 5px;
  height: 100%;
  width: 100%;

  ${mobile({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  })}

`;
const ImageContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  //width: 250px;
  height: 250px;

  width: 40%;

  ${mobile({
    justifyContent: "center",
    width: "100%",
    height: "200px",
  })}

  @media only screen and (max-width: 1000px) {
    //width: 200px;
  }
`;
const Image = styled.img`
  object-fit: cover;
  //border-radius: 5px;
  height: 250px;
  width: 100%;


  ${mobile({
    justifyContent: "center",
    width: "100%",
    height: "200px",
  })}
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  /* @media only screen and (max-width: 1000px) {
    width: 100%;
  } */
`;






const InfoContainer = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
  //justify-content: space-between;
  white-space: nowrap;
  ${mobile({
    marginLeft: "0px",
    marginRight: "0px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  })}//padding: 10px;
  //text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  //margin-left: 20px;
  //margin-right: 20px;
  //align-items: center;
  //justify-content: center;
  //padding-bottom: 10px;
  //white-space: nowrap;
  //padding: 10px;
  //text-align: center;

  ${mobile({
    marginLeft: "0px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  })}
`;

const Title = styled.span`
  //font-weight: 700;
  font-size: 24px;
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${mobile({fontSize: "1.2rem"})}
`;

const Price = styled.span`
  //font-weight: 600;
  font-size: 18px;
  margin-top: 10px;

  ${mobile({ fontSize: "1rem" })}
`;

const Author = styled.span`
  //font-weight: 600;
  margin-top: 10px;
  font-size: 18px;

  ${mobile({ fontSize: "1rem" })}
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  ${mobile({
    width: "95%",
  })}
`;

const Hr = styled.hr`
  width: 100%;
  background-color: #f3f7f7;
  border: none;
  height: 2px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  //flex: 2;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;

  /* @media only screen and (max-width: 600px) {
    width: 80%;
  } */

`;

const ShowDetailsBtn = styled(Button)`
  width: 60%;
  height: 40px;
  background-color: #00b2b1 !important; //#1266f1 !important;
  text-transform: none !important;
  color: #fff !important;
  font-size: 1.2rem !important;
  margin-right: 10px;
  border-radius: 8px !important;
  font-weight: 600;
  box-shadow: none !important;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #008f8e !important;
  }

  ${mobile({
    width: "55%",
    fontSize: "1rem !important"
  })}
`;

const FavoriteBtn = styled(Button)`
  width: 35%;
  height: 40px;
  border-radius: 8px !important;
  background-color: #f3f7f7 !important;
  text-transform: none !important;
  color: #fff !important;
  font-size: 1.2em !important;
  color: #224047 !important;
  box-shadow: none !important;
  margin-left: 20px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #d9e1e1 !important;
  }
  ${mobile({
    width: "40%",
    fontSize: "1rem !important",
  })}
`;

const Institute = ({ item }) => {

  const { desc, ...data } = item;
  const navigate = useNavigate();

  const handleFavorite = (id) => {
    /**
     * TODO: Add to favorites
     */
  };



  return (
    <Container>
      <DetailsContainer>
        <ImageContainer
          onClick={() =>
            navigate(`/institute/${item._id}`, { state: { item: data } })
          }
        >
          <Image
            src={
              data.img
                ? data.img
                : "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt=""
          />
        </ImageContainer>
        <InfoContainer>
          <TextContainer>
            <Title>
              {" "}
              {/* <b>Institute name: </b> */}
              {item.name}
            </Title>
            <Author>
              {" "}
              {/* <b>Location: </b> */}
              {item.location}
            </Author>
            <Price>
              {/* <b>Books available: </b> */}
              Total books: <b>{item.totalBooks}</b>
            </Price>
          </TextContainer>

          <FooterContainer>
            <Hr />
            <ButtonContainer>
              <ShowDetailsBtn
                variant="contained"
                onClick={() =>
                  navigate(`/institute/${item._id}`, { state: { item: data } })
                }
              >
                Show details
              </ShowDetailsBtn>
              <FavoriteBtn
                variant="contained"
                onClick={() => {
                  handleFavorite(item._id);
                }}
              >
                <FavoriteBorder style={{ marginRight: "10px" }} /> Favorite
              </FavoriteBtn>
            </ButtonContainer>
          </FooterContainer>
        </InfoContainer>
      </DetailsContainer>
    </Container>
  );
};

export default Institute;
