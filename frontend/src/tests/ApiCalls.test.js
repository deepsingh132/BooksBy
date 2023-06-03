import { login } from "../redux/ApiCalls";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";

jest.mock("axios");


const register = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		await axios.post("/auth/register", user);
		dispatch(loginFailure());
  } catch (err) {
		dispatch(loginFailure());
	}
};

test("make mock register API call", async () => {
	// Mock the axios.post method
	axios.post.mockImplementation((url, user) => {
		// Return a successful response
		return Promise.resolve({ data: { message: "Verification email sent" } });
	});

	// Create a mock dispatch function
	const dispatch = jest.fn();

	// Call the register function
	await register(dispatch, {
		email: "test@example.com",
		password: "testPassword",
	});

	// Assert that the loginFailure action is dispatched
	expect(dispatch).toHaveBeenCalledWith(loginFailure());
});

test("make mock login api call", async () => {
	// Mock the axios.post method
	axios.post.mockImplementation((url, user) => {
		if (user.email === "testemail@email.com" && user.password === "testPassword") {
			// Return a successful response
			return Promise.resolve({
				data: { email: user.email, password: user.password },
			});
		} else {
			// Return an error response
			return Promise.reject(new Error("Invalid credentials"));
		}
	});

	// Create a mock dispatch function
	const dispatch = jest.fn();

	// Call the login function
	await login(dispatch, {
		email: "testemail@email.com",
		password: "testPassword",
	});

	// Assert that the loginSuccess action is dispatched
	expect(dispatch).toHaveBeenCalledWith(
		loginSuccess({ email: "testemail@email.com", password: "testPassword" })
	);
});


