import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import SpinnerOverlay from "../components/SpinnerOverlay";
import NotFound from "./NotFound";
import { mobile } from "../responsive";
import { createRoot } from "react-dom/client";
import Modal from "../components/Modal";

const Container = styled.div`
  //overflow: hidden;
  //background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  padding: 50px 50px 150px;
  display: flex;
  ${mobile({ padding: "10px", alignItems: "center", flexDirection: "column", marginTop: "10px" })}
`;

const LeftContainer = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  ${mobile({ width: "100%" })}
`;

const InstituteCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: fit-content;
  background-color: #fff;
  padding-bottom: 16px;
  border: 1px solid #cfd9de;
  border-radius: 7px;
  ${mobile({ width: "100%", maxWidth: "500px", alignSelf: "center" })}

  @media only screen and (min-width: 769px) and (max-width: 1000px) {
    width: 300px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 300px;
  ${mobile({ maxHeight: "200px" })}
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 7px 7px 0px 0px;
  ${mobile({ maxHeight: "200px" })}
`;

const DescContainer = styled.div`
  display: flex;
  width: 100%;
  text-overflow: ellipsis;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.8rem;
  text-overflow: ellipsis;
  line-height: 4.6rem;
  ${mobile({
    justifyContent: "center",
    fontSize: "2.2rem",
    lineHeight: "3rem",
  })}
`;

const SubInfoContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  margin-top: 10px;
  margin-left: 10px;
  text-align: left;
  flex-direction: column;
`;

const LocationContainer = styled.div``;

const BooksContainer = styled.div``;

const RightContainer = styled.div`
  display: flex;
  width: 60%;
  margin-left: 40px;
  //flex: 1;
  flex-direction: column;
  white-space: nowrap;
  font-size: 1.8rem;

  padding: 0px 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  ${mobile({
    padding: "10px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    marginLeft: "0px",
    whiteSpace: "normal",
    marginTop: "20px",
  })}
`;

const Select = styled.select`
  padding: 10px 30px 10px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  width: fit-content;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  white-space: normal;
  margin: 10px;
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

const Institute = () => {
  const location = useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState(null);
  const [data, setData] = useState(null);
  const [books, setBooks] = useState([]);
  const [courses, setCourses] = useState({});
  const [isFetched, setIsFetched] = useState(true);

  useEffect(() => {
    if (location.state && !filters) {
      setData(location.state.item);
      setCourses(location.state.item?.courses ?? {});
      setBooks(
        location.state.item?.courses?.[
          Object.keys(location.state.item?.courses)?.[0]
        ] ?? []
      );
      setIsFetched(false);
    }
    else {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/institute/${query}`);
          setData(res.data);
          setCourses(res.data.courses);
          if (!filters && res.data.courses) {
            setBooks(res.data.courses[Object.keys(res.data.courses)?.[0]]);
          }
          setIsFetched(false);
        } catch (error) {
          showPopup("error", "Something went wrong, please try again later.");
          setIsFetched(false);
        }
      };
      if (query) {
      fetchData();
    }
    }
  }, [filters, location, query]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
    setBooks(courses[value]);
  };

  return (
    <>
      <Container>
        <Navbar />
        <Wrapper data-testid="wrapper">
          {!isFetched ? (
            <>
              {data ? (
                <>
                  <LeftContainer>
                    <InstituteCard>
                      <ImgContainer>
                        <Image
                          src={
                            data.img
                              ? data.img
                              : "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          alt=""
                        />
                      </ImgContainer>
                      <DescContainer>
                        <Title>
                          {data.name ? data.name : "Not available"}
                        </Title>
                        <SubInfoContainer>
                          <LocationContainer>
                            <b>Location: </b>{" "}
                            {data.location ? data.location : "Not available"}
                          </LocationContainer>
                          <BooksContainer>
                            <b>Books available: </b>{" "}
                            {data.totalBooks ? data.totalBooks : "Not available"}
                          </BooksContainer>
                        </SubInfoContainer>
                      </DescContainer>
                    </InstituteCard>
                  </LeftContainer>
                  <RightContainer>
                    {books.length > 0 ? (
                      <>
                        <FilterContainer>
                          Books used by the institute: &nbsp;
                          <Select onChange={handleFilters}>
                            {Object.keys(courses).map((course) => (
                              <Option key={course}>{course}</Option>
                            ))}
                          </Select>
                        </FilterContainer>
                        <Products books={books} />
                      </>
                    ) : (
                      <h3 style={{ whiteSpace: "normal" }}>
                        No books found for this institution
                      </h3>
                    )}
                  </RightContainer>
                </>
              ) : (
                <NotFound />
              )}
            </>
          ) : (
            <SpinnerOverlay apiCall={true} />
          )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Institute;
