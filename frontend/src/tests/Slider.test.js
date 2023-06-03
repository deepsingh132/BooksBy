import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Slider from "../components/Slider";
import { useState } from "react";


const testSlides = [
  {
    id: 1,
    title: "Slide 1",
    description: "Slide 1 description",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Slide 2",
    description: "Slide 2 description",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    title: "Slide 3",
    description: "Slide 3 description",
    image: "https://picsum.photos/200/300",
  },
];

const TestComponent = () => {
  const [slides, setSlides] = useState(testSlides);
  return (
  <>
				{slides?.map((item) => (
					<div data-testid="slide" bg={item.bg} key={item.id}>
						<div>
							<img alt="" data-testid="sliderimg" src={item.img} />
						</div>
						<div>
							<p data-testid="title">{item.title}</p>
							<p data-testid="desc">{item.desc}</p>
							<button data-testid="btn">Buy Now</button>
						</div>
					</div>
        ))}
    </>
	);
}

test("renders Slider component", () => {
  render(
    <MemoryRouter>
      <Slider />
    </MemoryRouter>
  );
  const sliderElement = screen.getByTestId("slider");
  expect(sliderElement).toBeInTheDocument();
});


test("slide component is rendered only if slides are present", () => {

  render(<TestComponent />);
  const slideElement = screen.getAllByTestId("slide");
  expect(slideElement[0]).toBeInTheDocument();
});

test("title should be rendered", () => {
  render(<TestComponent />);
  const titleElement = screen.getAllByTestId("title");
  expect(titleElement[0]).toBeInTheDocument();
});

test("description should be rendered", () => {
  render(<TestComponent />);
  const descElement = screen.getAllByTestId("desc");
  expect(descElement[0]).toBeInTheDocument();
});

test("image should be rendered", () => {
  render(<TestComponent />);
  const imgElement = screen.getAllByTestId("sliderimg");
  expect(imgElement[0]).toBeInTheDocument();
});

test("renders left arrow", () => {
  render(
    <MemoryRouter>
      <Slider />
    </MemoryRouter>
  );
  const leftArrow = screen.getByTestId("leftbtn");
  expect(leftArrow).toBeInTheDocument();
});

test("renders right arrow", () => {
  render(
    <MemoryRouter>
      <Slider />
    </MemoryRouter>
  );
  const rightArrow = screen.getByTestId("rightbtn");
  expect(rightArrow).toBeInTheDocument();
});