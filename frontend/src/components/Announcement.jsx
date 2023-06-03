import styled from "styled-components";

const Container = styled.div`
	height: auto;
	background-color: var(--accent-color);
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	overflow: hidden;
	font-weight: 600;
	padding: 5px 20px;
`;

const Text = styled.span`
	text-align: center;
	margin: 0 auto;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Announcement = () => {
	return (
		<Container>
			<Text>Super Deal! Free Shipping on Orders Over ₹200</Text>
		</Container>
	);
};

export default Announcement;
