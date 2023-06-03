import React, { useEffect, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";

const ProductAPITest = ({id}) => {
	const [product, setProduct] = useState({});
  const [error, setError] = useState('');

	useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('/products/book/' + id);
        setProduct(response.data);
      } catch (error) {
        setError('Error: Internal Server Error');
      }
    };

    fetchProduct();
  }, [id]);
	
	return (
		<div>
			<h1>Product API Test</h1>
			{error ? (
				<p>{error}</p>
			) : Object.keys(product).length > 0 ? (
				<div>
					<h2>Title: {product.title}</h2>
					<p>Description: {product.desc}</p>
					<p>Price: ₹{product.price}</p>
					<p>In Stock: {product.inStock ? "Yes" : "No"}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

const mockAxios = new MockAdapter(axios);

describe("ProductAPITest", () => {
	const mockProduct = {
		title: "Test Product",
		desc: "This is a test product",
		price: 10,
		inStock: true,
	};

	beforeEach(() => {
		mockAxios.reset();
	});

	it("should render product details after API call", async () => {
		mockAxios.onGet("/products/book/123").reply(200, mockProduct);

		render(
			<ProductAPITest id="123" />
		);

		await waitFor(() => {
			expect(screen.getByText("Title: Test Product")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByText("Description: This is a test product")
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText("Price: ₹10")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText("In Stock: Yes")).toBeInTheDocument();
		});
	});

	it("should handle API error", async () => {
		mockAxios.onGet("/products/book/123").reply(500, "Internal Server Error");

		render(<ProductAPITest id="123" />);

		await waitFor(() => {
			expect(screen.getByText("Loading...")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText("Error: Internal Server Error")).toBeInTheDocument();
		});
	});
});