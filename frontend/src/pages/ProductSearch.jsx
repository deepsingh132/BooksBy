import { useEffect, useState } from "react";
import styled from "styled-components";
import Institute from "../components/Institute";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import ProductCard from "../components/ProductCard";
import Lottie from "lottie-react";
import loading from "../assets/circlebooks.json";
import { Pagination } from "../components/Pagination";
import { createRoot } from "react-dom/client";
import Modal from "../components/Modal";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
`;
const Container = styled.div`
  display: flex;
  margin: 10px 50px 0px 30px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({
    margin: "10px 0px 0px 0px",
  })}
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InstituteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  ${mobile({
    width: "90%",
    alignItems: "center",
    marginLeft: "0px",
  })}
`;

const NullContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Animation = styled(Lottie)`
  height: 400px;
  width: 400px;
  ${mobile({
    height: "300px",
    width: "300px",
  })}
`;

const ResultsCount = styled.span`
  display: inline-block;
  font-size: 1rem;
  color: #4a6a6f;
  margin-left: 100px;
  align-self: flex-start;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 20px;
  ${mobile({
    alignSelf: "center",
    marginLeft: "0px",
  })}
`;

const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;

const showPopup = (msgType, msg) => {
    const rootElement = document.getElementById("modal");
    const existingRoot = rootElement._reactRootContainer;
    if (existingRoot) {
      existingRoot.render(<Modal msgType={msgType} msg={msg} />);
    } else {
      createRoot(rootElement).render(<Modal msgType={msgType} msg={msg} />);
    }
  };

const ProductSearch = ({ cat, query, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const checkedFilter = Object.keys(filters).find((key) => filters[key]);
  const [results, setResults] = useState(null);
  const [newQuery, setNewQuery] = useState(query);
  const [institutes, setInstitutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    if (query) {
      setNewQuery(query);
    }
  }, [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  useEffect(() => {
    if (products.length > 0 && institutes.length === 0) {
      setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
    else if (institutes.length > 0 && products.length === 0) {
      setTotalPages(Math.ceil(institutes.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
    else if (products.length > 0 && institutes.length > 0) {
      setTotalPages(Math.ceil((products.length + institutes.length) / ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
    else {
      setTotalPages(0);
    }
  }, [products, institutes]);

  useEffect(() => {
    const filterProducts = () => {
      if (!checkedFilter) {
        setFilteredProducts(
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } else {
        setFilteredProducts(() =>
          products.filter((item) => item.categories.includes(checkedFilter))
        );
      }
    };
    filterProducts();
  }, [checkedFilter, products, results]);


  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  }, [sort]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await publicRequest.get(
          `/products/search?q=${query}`
        );
        setResults(res.data);
        setIsLoading(false);
      } catch (err) {
        showPopup("error", "Something went wrong. Please try again later.");
        setIsLoading(false);
      }
    };
    if (query) {
      setFilteredProducts([]);
      setResults(null); // Clear previous results
      setInstitutes([]);
      searchProducts();
    }
  }, [newQuery, query]);

  useEffect(() => {
    const getProducts = () => {
      if (results.books) {
        setProducts(results.books);
      }
      if (results.institutions) {
        setInstitutes(results.institutions);
      }
    };
    if (results) {
      getProducts();
    }
  }, [results]);

  useEffect(() => {
		if (
			checkedFilter === "fiction" ||
			checkedFilter === "nonFiction" ||
			checkedFilter === "reference" ||
			checkedFilter === "kidsBooks" ||
			checkedFilter === "novels"
    ) {
			setIsFilterActive(true);
		} else {
			setIsFilterActive(false);
		}
	}, [checkedFilter]);
  return (
		<Wrapper>
			{/* Check if data is being loaded */}
			{isLoading ? (
				<Animation animationData={loading} loop={true} autoPlay={true} />
			) : (
				<PaginationContainer>
					{/* Check if there are matching filtered products or institutes */}
					{filteredProducts.length > 0 || institutes.length > 0 ? (
              <>
                {filteredProducts.length === 0 && isFilterActive && (
											<ResultsCount style={{ marginLeft: "0px", alignSelf: "center" }}>
												No results found
											</ResultsCount>
										)}
							{/* Render Institutes */}
							{institutes.length > 0 &&
								checkedFilter !== "fiction" &&
								checkedFilter !== "nonFiction" &&
								checkedFilter !== "reference" &&
								checkedFilter !== "kidsBooks" &&
								checkedFilter !== "novels" &&
								currentPage === 1 &&
								checkedFilter !==
									institutes.filter(
										(item) => !item.type?.includes(checkedFilter)
									) && (
									<InstituteContainer>
										{filteredProducts.length === 0 && institutes.length > 0 && (
											<ResultsCount style={{ marginLeft: "0px" }}>
												{institutes.length > 1
													? `${institutes.length} institutes found`
													: `${institutes.length} institute found`}
											</ResultsCount>
										)}

										{filteredProducts.length > 0 && institutes.length > 0 && (
											<ResultsCount style={{ marginLeft: "0px" }}>
												{`${products.length} books found including ${institutes.length} institutes`}
											</ResultsCount>
										)}
										<h2
											style={{
												display: "flex",
												alignSelf: "flex-start",
												marginLeft: "0px",
												width: "100%",
												color: "#32494a",
											}}
										>
											Institutes
										</h2>
										{institutes.slice(0, 10).map((item) => (
											<Institute item={item} key={item._id} />
										))}
									</InstituteContainer>
								)}
							{/* Render Products */}
							<ResultsContainer>
								{filteredProducts.length > 0 && institutes.length === 0 && (
									<ResultsCount>
										{`${filteredProducts.length} results`}
									</ResultsCount>
								)}
								<Container>
									{filteredProducts.slice(0, ITEMS_PER_PAGE).map((item) => (
										<ProductCard item={item} key={item._id} search={true} />
									))}
								</Container>
							</ResultsContainer>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</>
					) : (
						<NullContainer>No Books found</NullContainer>
					)}
				</PaginationContainer>
			)}
		</Wrapper>
	);
};

export default ProductSearch;
