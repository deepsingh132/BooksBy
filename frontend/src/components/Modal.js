import React, { useState } from "react";
import { CheckCircleOutlineOutlined, ErrorOutline, ReportProblemOutlined, VerifiedOutlined, WarningOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";


const CardPopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const CardPopupContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 35%;
	max-width: 40%;
	overflow-wrap: break-word;
	white-space: normal;
	justify-content: center;
	background-color: #fff;
	border-radius: 7px;
	padding: 2rem 1.5rem;
  font-weight: 600;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	text-align: center;
	z-index: 9999;
  ${mobile({
	  padding: "1rem 0.5rem",
	  width: "85%",
	  maxWidth: "85%",
	  minWidth: "85%",
  })}
`;

const CardPopupMessage = styled.div`
	font-size: 1.1rem;
	overflow-wrap: break-word;
	max-width: 100%;
	white-space: break-spaces;
	margin-bottom: 20px;
`;

const buttonColors = {
  error: { backgroundColor: "#cc0000", color: "#fff" },
  warning: { backgroundColor: "#ffcc00", color: "#000" },
  info: { backgroundColor: "#ffcc00", color: "#000" },
  success: { backgroundColor: "#00cc00", color: "#fff" },
  verified: { backgroundColor: "#1DA1F2", color: "#fff" },
  default: { backgroundColor: "#00cc00", color: "#fff" },
};

const CardPopupButton = styled.button`
	 background-color: ${(props) =>
    buttonColors[props.prop]?.backgroundColor || buttonColors.default.backgroundColor};
  color: ${(props) => buttonColors[props.prop]?.color || buttonColors.default.color};
	color: ${(props) =>
		props.prop === "error"
			? "#fff"
			: props.prop === "warning" || props.prop === "info"
			? "#000"
			: "#fff"};
	width: fit-content;
	border: none;
	font-weight: 600;
	border-radius: 99px;
	padding: 0.8rem 3rem;
	cursor: pointer;
	transition: all 0.3s ease;
	&:hover {
		background-color: ${(props) => {
	if (props.prop === "error") {
		return "#ff0000";
	}
	else if (props.prop === "warning" || props.prop === "info") {
		return "#ffad07";
	}
	else if (props.prop === "success") {
		return "#009900";
	}
	else if (props.prop === "verified") {
		return "#0d95e8";
	}
	else {
		return "#009900";
	}
}};
	}
`;

const Error = styled(ErrorOutline)`
	color: #000;
	font-size: 15vh !important;
`;

const Warning = styled(WarningOutlined)`
	color: #000;
	font-size: 15vh !important;
`;

const Info = styled(ReportProblemOutlined)`
	color: #000;
	font-size: 15vh !important;
`;

const Success = styled(CheckCircleOutlineOutlined)`
	color: #000;
	font-size: 15vh !important;
`;

const VerifiedIcon = styled(VerifiedOutlined)`
	color: #000;
	font-size: 15vh !important;
`;



const CardPopup = ({ msgType,msg }) => {
	const [isOpen, setIsOpen] = useState(true);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOverlayClick = () => {
		setIsOpen(false);
	};

	if (isOpen) {
		document.body.style.overflow = "hidden";
	}

	if (!isOpen) {
		document.body.style.overflow = "unset";
		return null;
	}

	return (
		<CardPopupOverlay onClick={handleOverlayClick}>
			<CardPopupContent>
				{msgType === "error" ? (
					<Error />
				) : msgType === "warning" ? (
					<Warning />
				) : msgType === "info" ? (
					<Info />
				) : msgType === "success" ? (
					<Success />
				) : msgType === "verified" ? (
					<VerifiedIcon />
				) : (
					<Info />
				)}
				<CardPopupMessage>{msg}</CardPopupMessage>
				<CardPopupButton prop={msgType} onClick={handleClose}>
					OK
				</CardPopupButton>
			</CardPopupContent>
		</CardPopupOverlay>
	);
};

export default CardPopup;
