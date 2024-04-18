import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>««</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>«</button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={currentPage === number ? 'font-bold' : ''}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>»»</button>
    </div>
  );
};

export default Pagination;