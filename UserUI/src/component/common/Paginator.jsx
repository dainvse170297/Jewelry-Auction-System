import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    const handlePageChange = (event, page) => {
        onPageChange(page);
    };
    return (
        // <nav aria-label="Page navigation">
        //     <ul className="pagination justify-content-center">
        //         {pageNumbers.map((pageNumber) => (
        //             <li
        //                 key={pageNumber}
        //                 className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
        //                 <button onClick={() => onPageChange(pageNumber)} className="page-link">
        //                     {pageNumber}
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
        <Stack spacing={2} alignItems="center">
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="circular"
            />
        </Stack>
    )
}

export default Paginator
