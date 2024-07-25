import { useState } from "react";
import { transposeTableForHTML } from "../../../../../utils/utils";
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

  const allFiles = props.allFiles;

  let filesTable: TableFields[] = allFiles
    ? [
        {
          header: "File ID",
          data: allFiles.map((x) => x.accession),
          cssClasses: "text-break",
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
      ]
    : [];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(filesTable.map((x) => x.data))
  );

  const filesTableDef: SDSVTableDefinition = {
    table: filesTable,
    buttonText: allFiles
      ? "File Summary (" + allFiles.length + " files)"
      : "File Summary (0 files)",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return filesTableDef;
};
