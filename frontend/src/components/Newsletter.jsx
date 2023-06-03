import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
	height: 60vh;
	background-color: #f9f9f9;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	${mobile({
		height: "40vh",
	})}
`;
const Title = styled.h1`
	font-size: 4rem;
	margin-bottom: 20px;
	overflow: hidden;
	white-space: nowrap;
	max-width: 90%;
	text-overflow: ellipsis;
	${mobile({
		fontSize: "2rem",
	})}
`;

const Desc = styled.div`
	font-size: 2rem;
	font-weight: 300;
	margin-bottom: 20px;
	${mobile({
		textAlign: "center",
		fontSize: "1.2rem",
	})}
`;

const InputContainer = styled.div`
	width: 50%;
	height: 40px;
	background-color: white;
	border-radius: 99px;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
	${mobile({ width: "80%" })}

	&:hover {
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	}

	&:focus-within {
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	}
`;

const Input = styled.input`
	border: none;
	flex: 8;
	border-radius: 99px;
	outline: none;
	padding-left: 20px;
`;

const Button = styled.button`
	flex: 1;
	border: none;
	display: flex;
	border-radius: 0px 99px 99px 0px;
	justify-content: center;
	align-items: center;
	background-color: #202b67;
	color: var(--accent-color);

	&:hover {
		background-color: var(--accent-color);
		color: #202b67;
	}
`;

const Newsletter = () => {
	return (
		<Container>
			<Title>Newsletter</Title>
			<Desc>Get timely updates from your favorite products</Desc>
			<InputContainer>
				<Input placeholder="Your email" />
				<Button>
					<Send />
				</Button>
			</InputContainer>
		</Container>
	);
};

export default Newsletter;
