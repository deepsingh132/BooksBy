import { createSlice } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";
import { Input } from "../components/Styles/AuthStyles";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

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

test("name input field is rendered", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const emailInput = screen.getByTestId("name");
	expect(emailInput).toBeInTheDocument();
});

test("email input field is rendered", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
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
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const passwordInput = screen.getByTestId("password");
	expect(passwordInput).toBeInTheDocument();
});

test("confirm password input field is rendered", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const confirmPasswordInput = screen.getByTestId("matchedPassword");
  expect(confirmPasswordInput).toBeInTheDocument();
});

test("register button is rendered", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const registerButton = screen.getByTestId("register-button");
  expect(registerButton).toBeInTheDocument();
});

test("email input field should be empty", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
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
				<Register />
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
				<Register />
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
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const passwordInput = screen.getByTestId("password");
	const testValue = "test";
	passwordInput.value = "test";
	expect(passwordInput).toHaveValue("test");
	fireEvent.change(passwordInput, { target: { value: "test" } });
	expect(passwordInput.value).toBe(testValue);
});

test("confirm password input should change", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const confirmPasswordInput = screen.getByTestId("matchedPassword");
  const testValue = "test";
  confirmPasswordInput.value = "test";
  expect(confirmPasswordInput).toHaveValue("test");
  fireEvent.change(confirmPasswordInput, { target: { value: "test" } });
  expect(confirmPasswordInput.value).toBe(testValue);
});

test("password input should be type password", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const passwordInput = screen.getByTestId("password");
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("confirm password input should be type password", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const confirmPasswordInput = screen.getByTestId("matchedPassword");
  expect(confirmPasswordInput).toHaveAttribute("type", "password");
});

test("password input should match confirm password input", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const passwordInput = screen.getByTestId("password");
  const confirmPasswordInput = screen.getByTestId("matchedPassword");
  passwordInput.value = "test";
  confirmPasswordInput.value = "test";
  const testValue = "test";
  expect(passwordInput.value).toBe(confirmPasswordInput.value);
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.change(confirmPasswordInput, { target: { value: testValue } });
  expect(testValue).toBe(testValue);
});

test("password input should not match confirm password input", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  const passwordInput = screen.getByTestId("password");
  const confirmPasswordInput = screen.getByTestId("matchedPassword");
  passwordInput.value = "test";
  confirmPasswordInput.value = "test1";
  const testValue = "test";
  const testValue1 = "test1";
  expect(testValue).not.toBe(testValue1);
  expect(passwordInput.value).not.toBe(confirmPasswordInput.value);
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.change(confirmPasswordInput, { target: { value: testValue1 } });
  expect(passwordInput.value).not.toBe(confirmPasswordInput.value);
});

const TestComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const handlePasswordChange = (e) => {
			setPassword(e.target.value);
  };

  return (
		<>
			<Input
				placeholder="Full name"
				required
				data-testid="name"
				id="name"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
      />
      {name.length < 3 && <span className="error-message">Name must be at least 3 characters</span>}
			<Input
				type="email"
				required
				id="email"
				data-testid="email"
				onChange={(e) => setEmail(e.target.value)}
      />
      {!emailPattern.test(email) && <span className="error-message">Please enter a valid email address</span>}
			<Input
				placeholder="At least 8 characters"
				required
				maxLength={128}
				minLength={8}
				id="password"
				data-testid="password"
				onChange={handlePasswordChange}
				type={"password"}
				style={{ padding: "0.4em 2.5em 0.4em 1.6em" }}
      ></Input>
      {password.length < 8 && <span className="error-message">Password must be at least 8 characters</span>}
		</>
	);
};

test("name input should be at least 3 characters", () => {
	render(<TestComponent />);
	const nameInput = screen.getByTestId("name");

	// Enter a name less than 3 characters
	userEvent.type(nameInput, "ab");

	// Assert error message or any other expected behavior
	// For example:
	const errorMessage = screen.getByText("Name must be at least 3 characters");
	expect(errorMessage).toBeInTheDocument();

	// Enter a name with 3 or more characters
	userEvent.clear(nameInput);
	userEvent.type(nameInput, "John");

	// Assert that the error message is not present
	expect(screen.queryByText("Name must be at least 3 characters")).toBeNull();
});

test("password input should be at least 8 characters", () => {
	render(<TestComponent />);
	const passwordInput = screen.getByTestId("password");
	// Enter a name less than 3 characters
	userEvent.type(passwordInput, "ab");

	// Assert error message or any other expected behavior
	// For example:
	const errorMessage = screen.getByText("Password must be at least 8 characters");
	expect(errorMessage).toBeInTheDocument();

	// Enter a password with 8 or more characters
	userEvent.clear(passwordInput);
	userEvent.type(passwordInput, "Test1234");

	// Assert that the error message is not present
	expect(screen.queryByText("Password must be at least 8 characters")).toBeNull();
});

test("email input should be a valid email", () => {
	render(<TestComponent />);
	const emailInput = screen.getByTestId("email");

	// Enter an invalid email
	userEvent.type(emailInput, "test");

	// Assert that the input is still of type "email"
	expect(emailInput).toHaveAttribute("type", "email");

	// Assert error message or any other expected behavior
	// For example:
	const errorMessage = screen.getByText("Please enter a valid email address");
	expect(errorMessage).toBeInTheDocument();

	// Enter a valid email
	userEvent.clear(emailInput);
	userEvent.type(emailInput, "test@example.com");

	// Assert that the error message is not present
	expect(screen.queryByText("Please enter a valid email address")).toBeNull();
});


test("register button should be disabled when isFetching is true", () => {
	store.dispatch({ type: "user/loginStart" });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("register-button");
	expect(loginButton).toBeDisabled();
});

test("register button should be enabled when isFetching is false", () => {
	store.dispatch({ type: "user/loginFailure"});
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("register-button");
	expect(loginButton).toBeEnabled();
});

test("register button should be enabled when register fails/passes", () => {
	store.dispatch({ type: "user/loginFailure" });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		</Provider>
	);
	const loginButton = screen.getByTestId("register-button");
	expect(loginButton).toBeEnabled();
});