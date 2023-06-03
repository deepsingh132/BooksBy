import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

const Container = styled.div`
	width: 100%;
	height: 60vh;
	display: flex;
	background-color: #4070f4;
	position: relative;
	overflow: hidden;
	${mobile({
		height: "40vh",
	})}
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #fff7f7;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.8;
	z-index: 2;
	${mobile({
		//backgroundColor: "transparent",
	})}
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	transition: all 1.5s ease;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: #${(props) => props.bg};
	overflow: hidden;
	${mobile({
		marginTop: "0px",
		borderRadius: "7px 7px 0px 0px",
	})}
`;

const ImgContainer = styled.div`
	height: 100vh;
	width: 50%;
	/* flex: 1; */
	align-items: center;
	justify-content: center;
	${mobile({
		width: "100vw",
		position: "relative",
	})}
`;

const Overlay = styled.div`
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
	${mobile({
		display: "block",
	})}
`;

const Image = styled.img`
	height: 70%;
	object-fit: cover;
	max-width: 100%;
	${mobile({
		objectFit: "cover",
		width: "100%",
		background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
	})}
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-items: center;
	margin-left: 10px;
	transform: translateY(-50%);
	padding: 10px;
	${mobile({
		//display: "none",
		width: "100vw",
		padding: "0px",
		marginLeft: "0px",
		top: "50%",
		position: "absolute",
	})}
`;

const Title = styled.h1`
	font-size: 2rem;
	${mobile({
		fontSize: "1.5rem",
		color: "#fff",
	})}
`;

const Desc = styled.p`
	align-items: center;
	justify-content: center;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 2px;
	${mobile({
		display: "none",
	})}
`;

const Button = styled.button`
	padding: 10px 20px;
	font-size: 20px;
	font-weight: 500;
	margin-top: 20px;
	background-color: var(--accent-color);
	border: none;
	color: #fff;
	border-radius: 50px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background-color: #f5ca89;
	}
	${mobile({
		display: "none",
	})}
`;

const Dots = styled.div`
	position: absolute;
	bottom: 25px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
`;

const Dot = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	opacity: 0.7;
	background-color: ${(props) => (props.isActive ? "#fff" : "#ccc")};
	margin-right: 5px;
	cursor: pointer;
`;

const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const [slides, setSlides] = useState([]);
	const sortedSlides = slides?.sort((a, b) => a.id - b.id);

	useEffect(() => {
		const getSlider = async () => {
			try {
				const response = await publicRequest.get("/products/slider");
				setSlides(response.data);
			} catch (error) {
				showPopup("error", "Something went wrong");
			}
		};
		getSlider();
	}, []);

	const handleClick = (direction) => {
		if (direction === "left") {
			if (mobile) {
				setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
			}
		} else {
			setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setSlideIndex((prevIndex) =>
				prevIndex === slides.length - 1 ? 0 : prevIndex + 1
			);
		}, 4000);
		return () => clearInterval(interval);
	}, [slides]);

	return (
		<Container data-testid="slider">
			<Arrow data-testid="leftbtn" direction="left" onClick={() => handleClick("left")}>
				<ArrowLeftOutlined />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{sortedSlides?.map((item) => (
					<Slide data-testid="slide" bg={item.bg} key={item.id} id={item.id}>
						<ImgContainer>
							<Overlay />
							<Image data-testid="sliderimg" src={item.img} />
						</ImgContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Button>Buy Now</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow data-testid="rightbtn" direction="right" onClick={() => handleClick("right")}>
				<ArrowRightOutlined />
			</Arrow>

			<Dots>
				{sortedSlides?.map((item, index) => (
					<Dot
						key={item.id}
						isActive={slideIndex === index}
						onClick={() => setSlideIndex(index)}
					/>
				))}
			</Dots>
		</Container>
	);
};

export default Slider;
