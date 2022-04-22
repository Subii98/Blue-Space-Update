import React, { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import Platform from './Platform.js';

function PlatformItems(props){

  useEffect(() => {

  }, [props.currentItems])

  return(
    <>
      {props.currentItems && <Platform platforms={props.currentItems} row={props.row}/>}
    </>
  )
}

function PaginatedItems(props) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(props.itemsPerPage)
    const [items, setItems] = useState(props.items)
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {

    }, [currentItems])

    useEffect(() => {
      // Fetch items from another resources.
      if (props.items){
        const endOffset = itemOffset + props.itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(props.items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.items.length / props.itemsPerPage));
      }
    }, [itemOffset, props.itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * props.itemsPerPage) % props.items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <PlatformItems currentItems={currentItems} row={props.row}/>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
}

export default PaginatedItems