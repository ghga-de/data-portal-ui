import React, { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { scrollUp } from "../../../../utils/utils";
import { SearchResponseModel } from "../../../../models/dataset";
import { FacetFilterModel } from "../../../../models/facets";
import { handleFilterAndSearch } from "../../shared";

interface DataSetPaginationProps {
  dsCount: number;
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: FacetFilterModel[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchParams: any;
  setSearchParams: any;
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
}

/** Pagination navigation for the list of datasets browsed. */
const DatasetPagination = (props: DataSetPaginationProps) => {
  let pageCount = Math.ceil(props.dsCount / props.limit);
  let navigate = useNavigate();
  const handlePageClick = (data: any) => {
    let skip = data.selected * props.limit;
    navigate(
      handleFilterAndSearch(
        props.setSearchResults,
        props.filterDict,
        props.searchKeyword,
        props.limit,
        skip,
        data.selected,
        props.setPage,
        props.setFilterDict,
        null
      )
    );
  };

  return (
    <div className="p-0 p-md-1" onClick={scrollUp}>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
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
        forcePage={props.page === 0 ? 0 : props.page - 1}
      />
    </div>
  );
};

export default DatasetPagination;
