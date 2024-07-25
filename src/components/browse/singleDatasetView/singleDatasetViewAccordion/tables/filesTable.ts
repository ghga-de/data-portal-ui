import { useState } from "react";
import { transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface FilesTableProps {
  all_files: any[];
}

/**
 * This function creates the schema for the file summary table,
 * which is one of three tables in the dataset details view.
 * @param props - Object containing the data and details.
 * @param fileSize - File size in bytes to be displayed on table
 * @returns The table definition object that includes table content, button text and definitions.
 */
export const FilesTable = (props: FilesTableProps, fileSize: number) => {
  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  let filesTable: TableFields[] = [
    {
      header: "File ID",
      data: props.all_files?.map((x) => x.accession),
      cssClasses: "text-break",
    },
    {
      header: "File name",
      data: props.all_files?.map((x) => x.name),
      cssClasses: "text-break",
    },
    {
      header: "File Type",
      data: props.all_files?.map((x) => x.format?.toUpperCase()),
      cssClasses: "",
    },
    {
      header: "File Origin",
      data: props.all_files?.map((x) => x.file_category),
      cssClasses: "",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(filesTable.map((x) => x.data))
  );

  const filesTableDef: SDSVTableDefinition = {
    table: filesTable,
    buttonText:
      props.all_files !== null && props.all_files !== undefined
        ? "File Summary (" + props.all_files.length + " files)"
        : "File Summary (0 files)",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return filesTableDef;
};
