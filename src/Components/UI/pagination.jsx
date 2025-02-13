import React from 'react';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // Adjust this number as needed

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationItems = () => {
    const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    const items = [];

    // Add "Previous" button
    items.push(
      <PaginationItem key="prev">
        <PaginationLink
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationLink>
      </PaginationItem>
    );

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageClick(i)}
            active={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis if necessary
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis">
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
      );
    }

    // Add "Next" button
    items.push(
      <PaginationItem key="next">
        <PaginationLink
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="pagination">
      <ul style={{ display: "flex", listStyle: "none", padding: 0, gap: 5, margin: 5 }}>
        {renderPaginationItems()}
      </ul>
    </div>
  );
  };


export const PaginationItem = ({ children, active, onClick }) => {
    return (
      <li className={`pagination-item ${active ? 'active' : ''}`}>
        <button className="pagination-link" onClick={onClick}>
          {children}
        </button>
      </li>
    );
  };
  
  export const PaginationLink = ({ children, onClick, disabled }) => {
    return (
      <button
        className="pagination-link"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
  
  export const PaginationNext = ({ onClick, disabled }) => {
    return (
      <PaginationLink onClick={onClick} disabled={disabled}>
        Next
      </PaginationLink>
    );
  };
  
  export const PaginationPrevious = ({ onClick, disabled }) => {
    return (
      <PaginationLink onClick={onClick} disabled={disabled}>
        Previous
      </PaginationLink>
    );
  };
  
  export const PaginationContent = ({ children }) => {
    return <div className="pagination-content">{children}</div>;
  };

export default Pagination;