import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import axios from "axios";
import Institute from "../pages/Institute";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("../pages/NotFound", () => {
	return () => <div data-testid="not-found">NotFound component</div>;
});

describe("Institute", () => {
	test("renders Institute component and fetches data", async () => {
		const mockData = {
			name: "Test Institute",
			img: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			location: "Test Location",
			totalBooks: 10,
		};

		axios.get.mockResolvedValueOnce({ data: mockData });

		useLocation.mockReturnValue({ pathname: "/institute/123" });

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/institute/123"]}>
					<Institute />
				</MemoryRouter>
			</Provider>
		);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();

		await screen.findByText("Test Institute");

		expect(screen.getByText("Test Institute")).toBeInTheDocument();
		expect(screen.getByText("Test Location")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(
			screen.getByText("No books found for this institution")
		).toBeInTheDocument();
	});
});
