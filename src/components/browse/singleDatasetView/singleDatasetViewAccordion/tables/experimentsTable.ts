import { useState } from "react";
import { datasetEmbeddedModel } from "../../../../../models/dataset";
import { transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface ExperimentsTableProps {
  details: datasetEmbeddedModel;
}

/**
 * This function creates the schema for the experiment summary table,
 * which is one of three tables in the dataset details view.
 * @param props - Object containing the data and details.
 * @returns The table definition object that includes table content, button text and definitions.
 */
export const ExperimentsTable = (props: ExperimentsTableProps) => {
  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  const experimentsTable: TableFields[] = [
    {
      header: "Experiment ID",
      data: props.details.has_experiment.map((x) =>
        x.ega_accession !== null ? x.ega_accession : x.alias
      ),
      cssClasses: "w-25 text-wrap text-break",
    },
    {
      header: "Description",
      data: props.details.has_experiment.map((x) => x.description),
      cssClasses: "text-wrap text-break",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(experimentsTable.map((x) => x.data))
  );

  const experimentsTableDef: SDSVTableDefinition = {
    table: experimentsTable,
    buttonText:
      props.details.has_experiment !== null
        ? "Experiment Summary (" +
          props.details.has_experiment.length +
          " experiments)"
        : "Experiment Summary",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return experimentsTableDef;
};
