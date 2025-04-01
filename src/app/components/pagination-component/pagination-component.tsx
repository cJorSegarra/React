type PaginationProps = {
    paginate: (pageNumber: number) => void;
    currentPage: number;
    totalPages: number;
};

const Pagination = ({ paginate, currentPage, totalPages }: PaginationProps) => (
    <div>
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Back
        </button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
);

export default Pagination;
