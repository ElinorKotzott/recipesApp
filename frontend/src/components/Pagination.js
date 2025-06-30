function Pagination( { fetchRecipes, currentPage, totalPages } ) {
    return(
        <div className="change-page-buttons">
            <button className="button pagination-button"
                onClick={() => fetchRecipes(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Previous
            </button>

            <span>Page {currentPage + 1} of {totalPages}</span>

            <button className="button pagination-button"
                onClick={() => fetchRecipes(currentPage + 1)}
                disabled={currentPage + 1 >= totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination;