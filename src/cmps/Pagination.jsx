export function Pagination({ currentPage, maxPage, onPageChange }) {
    if (maxPage <= 1) return null

    const pages = Array.from({ length: maxPage }, (_, i) => i)

    return (
        <section className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="page-btn"
            >
                Previous
            </button>

            {pages.map(pageIdx => (
                <button
                    key={pageIdx}
                    onClick={() => onPageChange(pageIdx)}
                    className={`page-btn ${currentPage === pageIdx ? 'active' : ''}`}
                >
                    {pageIdx + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === maxPage - 1}
                className="page-btn"
            >
                Next
            </button>
        </section>
    )
}