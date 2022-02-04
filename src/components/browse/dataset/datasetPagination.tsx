import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";

interface dataSetPaginationProps {
  dsCount: number;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: any;
};

const DatasetPagination = (props: dataSetPaginationProps) => {
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    getDatasetsSearchResp(props.setSearchResp, [], props.searchKeyword, 0, props.limit)
    setpageCount(Math.ceil(props.dsCount / props.limit))
  }, [props.setSearchResp, props.searchKeyword, props.limit, props.dsCount]);

  const handlePageClick = async (data: any) => {
    let skip = (data.selected) * props.limit;
    getDatasetsSearchResp(props.setSearchResp, [], props.searchKeyword, skip, props.limit)
  };

  return (
    <div className="container">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        marginPagesDisplayed={4}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-left"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        //breakLabel={"..."}
        //breakClassName={"page-item"}
        //breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default DatasetPagination;
