// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Dispatch, SetStateAction } from "react";
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
