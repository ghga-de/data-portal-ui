// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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

import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { transposeTableForHTML } from "./utils";

//
const SortTable = (
  setSortItem: any,
  sortedItem: any,
  setSortedItem: any,
  item: any,
  key: number,
  order: number
) => {
  setSortItem({ key: key, order: order });
  if (order !== 0) {
    sortedItem.sort((a: any, b: any) => (a[key] > b[key] ? 1 : -1));
    if (order === 2) {
      sortedItem.reverse();
    }
    setSortedItem(sortedItem);
  } else {
    setSortedItem(item);
  }
};

export interface TableFields {
  header: string;
  data: any;
  cssClasses?: string;
}

interface SortButtonProps {
  table: TableFields[];
  sortDefinition: {
    key: number;
    order: number;
  };
  setSortDefinition: React.Dispatch<
    React.SetStateAction<{
      key: number;
      order: number;
    }>
  >;
  sortedData: any[];
  setSortedData: React.Dispatch<any>;
  index: any;
  buttonVariant: string;
}

const SortButton = (props: SortButtonProps) => {
  let iconsDef = [faSort, faSortUp, faSortDown];

  return (
    <Button
      variant={props.buttonVariant}
      className="p-0 fs-8 fs-sm-7 px-1 me-1 border-0"
      onClick={() => {
        SortTable(
          props.setSortDefinition,
          props.sortedData,
          props.setSortedData,
          Array.from(
            transposeTableForHTML(props.table.map((y: any) => y.data))
          ),
          props.index,
          props.sortDefinition.key === props.index
            ? (props.sortDefinition.order + 1) % 3
            : 1
        );
      }}
    >
      <FontAwesomeIcon
        icon={
          props.sortDefinition.key === props.index
            ? iconsDef[props.sortDefinition.order]
            : iconsDef[0]
        }
      />
    </Button>
  );
};

export default SortButton;
