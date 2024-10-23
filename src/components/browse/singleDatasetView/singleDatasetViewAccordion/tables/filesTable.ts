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

import { useState } from "react";
import { parseBytes, transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface FilesTableProps {
  allFiles: any[];
}

/**
 * This function creates the schema for the file summary table,
 * which is one of three tables in the dataset details view.
 * @param props - Object containing the data and details.
 * @returns The table definition object that includes table content, button text and definitions.
 */
export const FilesTable = (props: FilesTableProps) => {
  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  const allFiles = props.allFiles || [];

  let filesTable: TableFields[] = [
    {
      header: "File ID",
      data: allFiles.map((x) => x.accession),
      cssClasses: "",
    },
    {
      header: "EGA ID",
      data: allFiles.map((x) => x.ega_accession),
      cssClasses: "",
    },
    {
      header: "File name",
      data: allFiles.map((x) => x.name),
      cssClasses: "text-break",
    },
    {
      header: "File Type",
      data: allFiles.map((x) => x.format?.toUpperCase()),
      cssClasses: "",
    },
    {
      header: "File Origin",
      data: allFiles.map((x) => x.file_category),
      cssClasses: "",
    },
    {
      header: "File Size",
      data: allFiles.map((x) => parseBytes(x.size)),
      cssClasses: "",
    },
    {
      header: "File Location",
      data: allFiles.map((x) => x.storage_alias),
      cssClasses: "",
    },
    {
      header: "File Hash",
      data: allFiles.map((x) => x.sha256_hash),
      cssClasses: "",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(filesTable.map((x) => x.data))
  );

  var totalSize = 0;
  allFiles.map((x) => (totalSize += x.size));

  const filesTableDef: SDSVTableDefinition = {
    table: filesTable,
    buttonText: allFiles
      ? "File Summary (" +
        allFiles.length +
        " files: " +
        parseBytes(totalSize) +
        ")"
      : "File Summary (0 files)",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return filesTableDef;
};
