import React, { Dispatch, SetStateAction, } from "react";
import ReactPaginate from 'react-paginate'
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { facetFilterModel } from '../../../models/facets'
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom'

interface dataSetPaginationProps {
  dsCount: number;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>
  searchParams: any
  setSearchParams: any
};

const DatasetPagination = (props: dataSetPaginationProps) => {
  let pageCount = Math.ceil(props.dsCount / props.limit);
  let navigate = useNavigate();

  const handlePageClick = (data: any) => {
    let skip = data.selected * props.limit;
    props.setPage(data.selected + 1)
    getDatasetsSearchResp(props.setSearchResp, props.filterDict, props.searchKeyword, skip, props.limit)
    if (props.searchParams.p === undefined) {
      props.setSearchParams({ p: data.selected + 1 })
      if (getFilterString(props.filterDict) === '') {
        if (props.searchKeyword === '') {
          navigate(`?p=${data.selected + 1}`)
        } else {
          navigate(`?q=${props.searchKeyword}&p=${data.selected + 1}`)
        }
      } else {
        if (props.searchKeyword === '') {
          navigate(`?f=${getFilterString(props.filterDict)}&p=${data.selected + 1}`)
        } else {
          navigate(`?q=${props.searchKeyword}&f=${getFilterString(props.filterDict)}&p=${data.selected + 1}`)
        }
      }
    } else {
      if (getFilterString(props.filterDict) === '') {
        if (props.searchParams.q === null) {
          navigate(`?p=${props.searchParams.p}`)
        } else {
          navigate(`?q=${props.searchParams.q}&p=${props.searchParams.p}`)
        }
      } else {
        if (props.searchParams.q === null) {
          navigate(`?f=${getFilterString(props.filterDict)}&p=${props.searchParams.p}`)
        } else {
          navigate(`?q=${props.searchParams.q}&f=${getFilterString(props.filterDict)}&p=${props.searchParams.p}`)
        }
      }
    }
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
        forcePage={props.page === 0 ? 0 : props.page - 1}
      />
    </div>
  );
}

export default DatasetPagination;
