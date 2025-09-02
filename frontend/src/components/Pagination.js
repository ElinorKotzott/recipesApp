import Button from 'react-bootstrap/Button';

function Pagination({ fetchRecipes, currentPage, totalPages }) {
  return (
    <div className="change-page-buttons">
      <Button
        variant="light"
        className="button pagination-button"
        onClick={() => fetchRecipes(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </Button>

      <span>
        Page {currentPage + 1} of {totalPages}
      </span>

      <Button
        variant="light"
        className="button pagination-button"
        onClick={() => fetchRecipes(currentPage + 1)}
        disabled={currentPage + 1 >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
