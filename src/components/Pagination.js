import React from 'react'
import './Pagination.css'

const Pagination = ({ postersPerPage, totalFilms, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(totalFilms / postersPerPage); i++) {
        pageNumbers.push(i)
    }

    // On selection of paginate, want to cycle through movie posters

    return (
        <div className="pagination-grid">
            {pageNumbers.map(number => (
                <div key={number}>
                    <a onClick={() => paginate(number)} href="!#">{number}</a>
                </div>
            ))}
        </div>
    )
}

export default Pagination;