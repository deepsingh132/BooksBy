import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Categories from "../components/Categories";
import CategoryItem from "../components/CategoryItem";
import { MemoryRouter } from "react-router-dom";

const testCategories = [
  {
    id: 1,
    title: "Category 1",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Category 2",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    title: "Category 3",
    image: "https://picsum.photos/200/300",
  },
];

test("renders Categories component", () => {
  render(
      <Categories />
  );
  const categoriesElement = screen.getByTestId("categories");
  expect(categoriesElement).toBeInTheDocument();
});

test("category component is rendered only if categories are present", () => {
	render(
		<MemoryRouter>
			<>
				{testCategories?.map((item) => (
					<CategoryItem key={item.id} item={item} />
				))}
			</>
		</MemoryRouter>
	);
	const categoryElement = screen.getAllByTestId("category");
	expect(categoryElement[0]).toBeInTheDocument();
});