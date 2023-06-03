import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #fff !important;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  ${mobile({ color: "#fff" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ListItemContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ListItem = styled.li`
  width: fit-content;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#0b3c5d", color: "fff" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({ color: "#fff" })}
`;

const Payment = styled.img`
  width: 50%;
`;

const CustomRoomIcon = styled(Room)`
  margin-right: 10px;
  ${mobile({ color: "var(--accent-color)" })}
`;

const CustomPhoneIcon = styled(Phone)`
  margin-right: 10px;
  ${mobile({ color: "var(--accent-color)" })}
`;

const CustomMailIcon = styled(MailOutline)`
  margin-right: 10px;
  ${mobile({ color: "var(--accent-color)" })}
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>BooksBy</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItemContainer>
            <ListItem>Home</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>Cart</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>Fiction</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>Non-Fiction</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>School</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>University</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>My Account</ListItem>
          </ListItemContainer>
          <ListItemContainer>
          <ListItem>Order Tracking</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>Wishlist</ListItem>
          </ListItemContainer>
          <ListItemContainer>
            <ListItem>Terms</ListItem>
          </ListItemContainer>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <CustomRoomIcon /> 622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <CustomPhoneIcon /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <CustomMailIcon /> contact@deep.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
