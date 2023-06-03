import React from "react";
import {
	Buttons,
	NullUserContainer,
	NullUserWrapper,
	SignInBtn,
} from "./Styles/NullPageStyles";
import { Link } from "react-router-dom";

const NullUser = ({ NullText, btnVisibility }) => {
	return (
		<>
			<NullUserContainer>
				<NullUserWrapper>
					{NullText}
					{btnVisibility && (
					<Buttons>
						<Link style={{ textDecoration: "none" }} to="/login">
							<SignInBtn backgroundColor="var(--accent-color)" border="none">
								Sign in
							</SignInBtn>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/register">
							<SignInBtn
								border="1px solid #e1e3e3"
								backgroundColor="#fff"
								hoverColor="#f5f5f5"
							>
								Register Now
							</SignInBtn>
						</Link>
						</Buttons>
					)}
				</NullUserWrapper>
			</NullUserContainer>
		</>
	);
};

export default NullUser;
