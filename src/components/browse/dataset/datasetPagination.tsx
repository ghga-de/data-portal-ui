import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { facetFilterModel } from '../../../models/facets'

interface dataSetPaginationProps {
  dsCount: number;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>
};

const DatasetPagination = (props: dataSetPaginationProps) => {
  const [pageCount, setpageCount] = useState(1);

  useEffect(() => {
    setpageCount(Math.ceil(props.dsCount / props.limit))
  }, [props.dsCount, props.limit]);

  const handlePageClick = (data: any) => {
    let skip = (data.selected) * props.limit;
    props.setCurrentPage(data.selected)
    getDatasetsSearchResp(props.setSearchResp, props.filterDict, props.searchKeyword, skip, props.limit)
  };

  return (
    <div className="p-1 mb-2 mt-4">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-left my-0"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        forcePage={props.currentPage}
      />
    </div>
  );
}

export default DatasetPagination;
