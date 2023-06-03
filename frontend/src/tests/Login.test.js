import { createSlice } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { CustomLink } from "../components/Styles/AuthStyles";

// Mock the navigate function
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Preserve all non-mocked functionalities
  useNavigate: () => mockNavigate, // Mock the useNavigate hook
}));

// Create a custom store with a mock user slice
const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false, // Set isFetching to true to simulate loading state
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
		},
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		logoutUser: (state) => {
			localStorage.removeItem("user");
			state.currentUser = null;
		},
	},
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

test("email input field is rendered", () => {
	render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
		</Provider>
	);
	const emailInput = screen.getByTestId("email");
	expect(emailInput).toBeInTheDocument();
});

test("password input field is rendered", () => {
	render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
		</Provider>
	);
	const passwordInput = screen.getByTestId("password");
	expect(passwordInput).toBeInTheDocument();
});

test("email input field should be empty", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const emailInput = screen.getByTestId("email");
	expect(emailInput).toHaveValue("");
});

test("password input field should be empty", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const passwordInput = screen.getByTestId("password");
	expect(passwordInput).toHaveValue("");
});

test("email input should change", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const emailInput = screen.getByTestId("email");
	const testValue = "test";
	emailInput.value = "test";
	expect(emailInput).toHaveValue("test");
	fireEvent.change(emailInput, { target: { value: "test" } });
	expect(emailInput.value).toBe(testValue);
});

test("password input should change", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const passwordInput = screen.getByTestId("password");
	const testValue = "test";
	passwordInput.value = "test"
	expect(passwordInput).toHaveValue("test");
	fireEvent.change(passwordInput, { target: { value: "test" } });
	expect(passwordInput.value).toBe(testValue);
});

test("login button is rendered", () => {
	render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("login-button");
	expect(loginButton).toBeInTheDocument();
});

test("login button should be disabled when isFetching is true", () => {
	store.dispatch({type: "user/loginStart"})
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("login-button");
	expect(loginButton).toBeDisabled();
});

test("login button should be enabled when isFetching is false", () => {
	store.dispatch({ type: "user/loginSuccess", payload: {} });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("login-button");
	expect(loginButton).toBeEnabled();
});

test("login button should be enabled when login fails", () => {
	store.dispatch({ type: "user/loginFailure" });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("login-button");
	expect(loginButton).toBeEnabled();
});

test("clicking on 'Forgot your password?' navigates to password recovery page", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);

	const forgotPasswordLink = screen.getByTestId("forgot-password");

	fireEvent.click(forgotPasswordLink);

	expect(mockNavigate).toHaveBeenCalledWith("/recover_password");
});

test("Clicking on 'Create an account' navigates to register page", () => {
	render(
		<MemoryRouter>
			<CustomLink to="/register" data-testid="register">
				Create a new account
			</CustomLink>
		</MemoryRouter>
	);

	const createAccountLink = screen.getByTestId("register");

	fireEvent.click(createAccountLink);
});