import React, { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { facetFilterModel } from '../../../models/facets'
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom'
import { scrollUp } from "../../../utils/utils";


interface dataSetPaginationProps {
  dsCount: number;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchParams: any;
  setSearchParams: any;
}

const DatasetPagination = (props: dataSetPaginationProps) => {
  let pageCount = Math.ceil(props.dsCount / props.limit);
  let navigate = useNavigate();

  const handlePageClick = (data: any) => {
    let skip = data.selected * props.limit;
    props.setPage(data.selected + 1);
    getDatasetsSearchResp(
      props.setSearchResp,
      props.filterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
    props.setSearchParams({ p: data.selected + 1 })
    if (getFilterString(props.filterDict) === '' || getFilterString(props.filterDict) === null) {
      if (props.searchKeyword === '' || props.searchKeyword === null) {
        navigate(`?p=${data.selected + 1}`)
      } else {
        navigate(`?q=${props.searchKeyword}&p=${data.selected + 1}`)
      }
    } else {
      if (props.searchKeyword === '' || props.searchKeyword === null) {
        navigate(`?f=${getFilterString(props.filterDict)}&p=${data.selected + 1}`)
      } else {
        navigate(`?q=${props.searchKeyword}&f=${getFilterString(props.filterDict)}&p=${data.selected + 1}`)
      }
    }
  };

  return (
    <div className="p-1 mb-2 mt-4" onClick={scrollUp}>
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
        forcePage={props.page === 0 ? 0 : props.page - 1}
      />
    </div>
  );
};

export default DatasetPagination;
