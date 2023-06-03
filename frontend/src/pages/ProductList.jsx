import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import ProductSearch from "./ProductSearch";
import { Checkbox, FormControl, FormControlLabel, FormGroup }  from "@mui/material";
import CustomCheckboxIcon from "../components/Styles/Checkbox";

const Container = styled.div`
  background-color: #f0faf9;
  overflow-x: hidden;
  ${mobile({
    overflow: "hidden",
  })}
`;

const ProductsContainer = styled.div`
  display: flex;
  ${mobile({
    flexDirection: "column",
    alignItems: "center"
  })}
`;

const FilterContainer = styled.div`
  width: 25%;
  background-color: #fff;
  border-bottom: 1px solid #cfd9de;
  border-right: 1px solid #cfd9de;

  ${mobile({
    backgroundColor: "#f9f9f9",
    borderRight: "none",
    marginLeft: "0px",
    width: "100%",
  })}
`;

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  ${mobile({
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  })}
`;

const FilterHeaderContainer = styled.div`
  display: flex;
  width: 85%;
  padding-bottom: 5px;
  border-bottom: 1px solid #cfd9de;
  justify-content: space-between;
  ${mobile({
    justifyContent: "center",
    display: "none",
    border: "none",
  })}

`;

const FilterHeader = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : "#17333c")};
  margin-bottom: 10px;

  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : "#17333c")};
  }

  ${mobile({ marginRight: "0px" })}
`;

const Filter = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  ${mobile({
    margin: "5px",
    width: "0px 20px",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #a4afb0;
  ${mobile({ display: "none", marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 8px;
  width: fit-content;
  font-weight: 500;
  color: "#17333c" !important;
  font-size: 17px;
  background-color: #fff;
  border: 0.5px solid lightgray;
  border-color: #bbbfbf;
  border-radius: 10px;

  &:hover {
    border-color: #999;
    background-color: #f3f3f3;
  }

  ${mobile({
    margin: "10px 5px",
    border: "none",
    borderRadius: "20px",
  })}
`;
const Option = styled.option`
  color: "#2c4044";
`;

const Products = styled.div`
  display: flex;
  width: 100%;
  background-color: #f0faf9;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const HorizontalFilter = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #cfd9de;
  padding: 5px 20px;
  ${mobile({
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const FilterBackground = styled.div`
  display: flex;
  flex-direction: row;
  width: 280px;
  cursor: pointer;
  white-space: nowrap;
  background-color: #f0faf9;
  border: ${(props) =>
    props.checked ? "2px solid #00b2b1" : "2px solid #eceef0"};
  color: #133034;
  border-radius: 10px;
  justify-content: flex-start;
  margin: 10px;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const CustomFormGroup = styled(FormGroup)`
  ${mobile({
    flexDirection: "column !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  })}
`;

const CustomLabel = styled.h3`
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #133034;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const SortContainer = styled.div`
  display: flex;
  font-weight: 400;
  margin-top: 20px;
  margin-right: 30px;
  align-items: center;
  justify-content: flex-end;
`;

const styles = {
  checkbox: {
    label: {
      color: "#48595e",
    },
  },
};

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const [sort, setSort] = useState("newest");
  const [isSchool, setIsSchool] = useState(false);
  const [isCollege, setIsCollege] = useState(false);

  const [filters, setFilters] = useState({
    school: false,
    college: false,
    fiction: false,
    nonFiction: false,
    reference: false,
    kidsBooks: false,
    novels: false,
  });

   const handleFilters = (e) => {
     const name = e.target.name;
     const value = e.target.checked;
     const newFilters = { ...filters };

     // Update the state values based on the checkbox that was clicked
     if (name === "school") {
       setIsSchool(value);
       setIsCollege(false);
     } else if(name === "college"){
       setIsCollege(value);
       setIsSchool(false);
     }

     // Uncheck all other checkboxes
     Object.keys(newFilters).forEach((key) => {
       if (key !== name) {
         newFilters[key] = false;
       }
     });

     setFilters({
       ...newFilters,
       [name]: value,
     });
   };

    const handleClick = (name) => {
      if (name === "school") {
        setIsSchool(!isSchool);
        setIsCollege(false);
        setFilters({
          ...filters,
          school: !isSchool,
          college: false,
        });
      } else if (name === "college") {
        setIsCollege(!isCollege);
        setIsSchool(false);
        setFilters({
          ...filters,
          college: !isCollege,
          school: false,
        });
      }
    };

  const handleReset = () => {
    setIsSchool(false);
    setIsCollege(false);
    setFilters({
      ...filters,
      school: false,
      college: false,
      fiction: false,
      nonFiction: false,
      reference: false,
      kidsBooks: false,
      novels: false,
    });
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Navbar />
      <ProductsContainer>
        <FilterContainer>
          <FilterContent>
            <FilterHeaderContainer>
              <FilterHeader>Filter by</FilterHeader>
              <FilterHeader color="#00b2b1" onClick={() => handleReset()}>
                Reset filters
              </FilterHeader>
            </FilterHeaderContainer>
            <Filter>
              <FilterText>Genre </FilterText>
              <FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CustomCheckboxIcon />}
                        checkedIcon={<CustomCheckboxIcon checked={true} />}
                        checked={filters.fiction}
                        onChange={handleFilters}
                        name="fiction"
                      />
                    }
                    sx={styles.label}
                    label="Fiction"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CustomCheckboxIcon />}
                        checkedIcon={<CustomCheckboxIcon checked={true} />}
                        checked={filters.nonFiction}
                        onChange={handleFilters}
                        name="nonFiction"
                      />
                    }
                    sx={styles.label}
                    label="Non-Fiction"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CustomCheckboxIcon />}
                        checkedIcon={<CustomCheckboxIcon checked={true} />}
                        checked={filters.reference}
                        onChange={handleFilters}
                        name="reference"
                      />
                    }
                    sx={styles.label}
                    label="Reference"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CustomCheckboxIcon />}
                        checkedIcon={<CustomCheckboxIcon checked={true} />}
                        checked={filters.kidsBooks}
                        onChange={handleFilters}
                        name="kidsBooks"
                      />
                    }
                    sx={styles.label}
                    label="Kids Books"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CustomCheckboxIcon />}
                        checkedIcon={<CustomCheckboxIcon checked={true} />}
                        checked={filters.novels}
                        onChange={handleFilters}
                        name="novels"
                      />
                    }
                    sx={styles.label}
                    label="Novels"
                  />
                </FormGroup>
              </FormControl>
            </Filter>
          </FilterContent>
        </FilterContainer>
        <Products>
          <HorizontalFilter>
            <FormControl>
              <CustomFormGroup row>
                <FilterBackground
                  onClick={() => handleClick("school")}
                  checked={isSchool}
                >
                  <span
                    role="img"
                    aria-label="school"
                    style={{
                      display: "flex",
                      fontSize: "30px",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    🏫
                  </span>
                  <CustomLabel>School</CustomLabel>
                  <Checkbox
                    icon={<CustomCheckboxIcon />}
                    checkedIcon={<CustomCheckboxIcon checked={true} />}
                    inputProps={{ "aria-label": "Custom checkbox icon" }}
                    checked={filters.school}
                    onChange={handleFilters}
                    name="school"
                  />
                </FilterBackground>

                <FilterBackground
                  onClick={() => handleClick("college")}
                  checked={isCollege}
                >
                  <span
                    role="img"
                    aria-label="college"
                    style={{
                      display: "flex",
                      fontSize: "30px",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    🎓
                  </span>
                  <CustomLabel>College / University</CustomLabel>
                  <Checkbox
                    icon={<CustomCheckboxIcon />}
                    checkedIcon={<CustomCheckboxIcon checked={true} />}
                    checked={filters.college}
                    onChange={handleFilters}
                    name="college"
                  />
                </FilterBackground>
              </CustomFormGroup>
            </FormControl>
          </HorizontalFilter>

          <SortContainer>
            <FilterText style={{ marginBottom: "0px", marginRight: "5px" }}>
              Sort by
            </FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </SortContainer>
          <ProductSearch
            cat={cat}
            query={query}
            filters={filters}
            sort={sort}
          />
        </Products>
      </ProductsContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
