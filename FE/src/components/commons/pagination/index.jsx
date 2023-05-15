import React from 'react';
import "./index.scss"

function Pagination({data, itemsPerPage, onHandleChangePage, currentPage, onHandleChangeItemsPerPage}) {
    const listPage = [];
    const pagesLength = Math.ceil((data.length) / itemsPerPage);
    for (let i = 1; i <= pagesLength ; i++) {
        listPage.push(i);
    }
    const handleChangePage = (page) => {
        if(page <=1){
            onHandleChangePage(1);
            return;
        }
        if(page >= pagesLength){
            onHandleChangePage(pagesLength)
            return;
        }
        onHandleChangePage(page)
    }
    
    return (
        <div className='pagination d-flex justify-content-between'>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link"  aria-label="Previous" onClick={() => handleChangePage(currentPage - 1)} >
                            <span aria-hidden="true">&laquo;</span>
                        </span>
                    </li>
                    {listPage.map((page,idx) =>  
                        <li className={`page-item ${page === currentPage ? "active" : ""}`} key={idx} onClick={() => handleChangePage(page)}><span className="page-link">{page}</span></li> 
                    )}
                    <li className="page-item">
                        <span className="page-link"  aria-label="Next" onClick={() => handleChangePage(currentPage + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </span>
                    </li>
                </ul>
            </nav>
            <select id="itemsPerPage" value={itemsPerPage} onChange={(event) => onHandleChangeItemsPerPage(event)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </div>
    );
}

export default Pagination;