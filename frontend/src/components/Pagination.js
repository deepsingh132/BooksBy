import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const ChevronButton = styled(({ left, ...props }) =>
  left ? <ChevronLeft {...props} /> : <ChevronRight {...props} />
)`
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  margin: 0 10px;
  color: ${({ disabled }) => (disabled ? '#999' : '#555')};
  width: 1.5em !important;
  height: 1.5em !important;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    border-radius: 50%;
    color: ${({ disabled }) => (disabled ? '#999' : '#555')};
  }
`;

const PagesBtn = styled.button`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  border: 1px solid #ddd;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &.active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageNumbers = [];
  const maxPageNumbers = totalPages;
  let startPageNumber, endPageNumber;
  
  if (totalPages <= maxPageNumbers) {
    startPageNumber = 1;
    endPageNumber = totalPages;
  } else {
    const offset = Math.floor(maxPageNumbers / 2);
    if (currentPage - offset < 1) {
      startPageNumber = 1;
      endPageNumber = maxPageNumbers;
    } else if (currentPage + offset > totalPages) {
      endPageNumber = totalPages;
      startPageNumber = totalPages - maxPageNumbers + 1;
    } else {
      startPageNumber = currentPage - offset;
      endPageNumber = currentPage + offset;
    }
  }

  for (let i = startPageNumber; i <= endPageNumber; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (!isFirstPage) {
      window.scrollTo(0, 0); // Scroll to top when page changes
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      window.scrollTo(0, 0); // Scroll to top when page changes
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page > totalPages || page < 1) return;
    if (page !== currentPage) {
      window.scrollTo(0, 0); // Scroll to top when page changes
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    return pageNumbers.map((pageNumber) => (
      <PagesBtn
        key={pageNumber}
        onClick={() => handlePageClick(pageNumber)}
        className={pageNumber === currentPage ? 'active' : ''}
      >
        {pageNumber}
      </PagesBtn>
    ));
  };

  return (
    <PaginationContainer>
      <ChevronButton left onClick={handlePrevClick} disabled={isFirstPage} />
      {renderPageNumbers()}
      <ChevronButton onClick={handleNextClick} disabled={isLastPage} />
    </PaginationContainer>
  );
};
