import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";

const userSlice = createSlice({
	name: "user",
	initialState: {
  currentUser: null,
    isFetching: false,
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

const userReducer = userSlice.reducer;

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.total += action.payload.price * action.payload.quantity;
		},
		removeAllProducts: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

const cartReducer = cartSlice.reducer;

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export const store = configureStore({
  reducer: rootReducer,
});


test("navbar renders search box", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const searchBar = screen.getByTestId("search-box");
  expect(searchBar).toBeInTheDocument();
});

test("navbar renders search button", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const searchButton = screen.getByTestId("search-button");
  expect(searchButton).toBeInTheDocument();
});

test("navbar renders logo", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const logo = screen.getByTestId("logo");
  expect(logo).toBeInTheDocument();
});

test("navbar renders autosuggest component when any character is entered in search box", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		</Provider>
	);

	const searchBar = screen.getByPlaceholderText("Search for books or institutions");
	userEvent.type(searchBar, "a");

	const autosuggest = screen.getByRole("listbox");
	expect(autosuggest).toBeInTheDocument();
});

test("navbar renders with correct links if user is Signed in", () => {
  store.dispatch({
    type: "user/loginSuccess",
    payload: {
      user: {
        currentUser: {
        _id: "60f1b5b4f0f4c1b5b4f0f4c1",
        username: "testuser",
        email: "abc@email.com",
        isAdmin: false,
        createdAt: "2021-07-16T15:00:20.000Z",
        updatedAt: "2021-07-16T15:00:20.000Z",
        __v: 0,
        },
      },
    }
  });
  render(
    <Provider store={store}>
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const orders = screen.getByText("Orders");
  const loginLink = screen.getByText("Account");

  expect(orders).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});

test("navbar renders with correct links if user is not Signed in", () => {
  store.dispatch({ type: "user/logoutUser" });
  render(
    <Provider store={store}>
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const loginLink = screen.getByText("Orders");
  const signupLink = screen.getAllByText("Sign In");

  expect(loginLink).toBeInTheDocument();
  expect(signupLink[0]).toBeInTheDocument();
});

test("cart icon is rendered", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
  const cartIcon = screen.getByTestId("cart");
  expect(cartIcon).toBeInTheDocument();
});

test("cart icon does not display mui badge if cart is empty", () => {
  store.dispatch({ type: "cart/removeAllProducts" });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const cartIcon = screen.getByTestId("cart");
  const badge = screen.getByTestId("cart-badge");

  expect(cartIcon).toBeInTheDocument();
  expect(badge).toBeInTheDocument();
  expect(badge).not.toHaveTextContent();
});



test("cart icon displays mui badge with correct quantity", () => {
  store.dispatch({
    type: "cart/addProduct",
    payload: {
      _id: "60f1b5b4f0f4c1b5b4f0f4c1",
      title: "test product",
      desc: "test product",
      img: "test product",
      categories: ["test product"],
      size: "test product",
      color: "test product",
      price: 100,
      quantity: 1,
    },
  });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  const cartIcon = screen.getByTestId("cart");
  const badge = screen.getByTestId("cart-badge");

  expect(cartIcon).toBeInTheDocument();
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveTextContent("1");
});