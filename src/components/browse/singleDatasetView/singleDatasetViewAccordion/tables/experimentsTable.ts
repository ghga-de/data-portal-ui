import { useState } from "react";
import { DatasetEmbeddedModel } from "../../../../../models/dataset";
import { transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface ExperimentsTableProps {
  details: DatasetEmbeddedModel;
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

  const experiments = props.details.experiments || [];

  const experimentsTable: TableFields[] = [
    {
      header: "Experiment ID",

      data: experiments.map((x) => x.accession),
      cssClasses: "",
    },
    {
      header: "EGA ID",
      data: experiments.map((x) => x.ega_accession),
      cssClasses: "",
    },
    {
      header: "Title",
      data: experiments?.map((x) => x.title),
      cssClasses: "text-wrap text-break",
    },
    {
      header: "Description",
      data: experiments?.map((x) => x.description),
      cssClasses: "text-wrap text-break",
    },
    {
      header: "Method",
      data: experiments?.map((x) => x.experiment_method.type || "N/A"),
      cssClasses: "",
    },
    {
      header: "Platform",
      data: experiments?.map(
        (x) => x.experiment_method.instrument_model || "N/A"
      ),
      cssClasses: "",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(experimentsTable.map((x) => x.data))
  );

  const experimentsTableDef: SDSVTableDefinition = {
    table: experimentsTable,
    buttonText: experiments
      ? "Experiment Summary (" + experiments.length + " experiments)"
      : "Experiment Summary (0 experiments)",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return experimentsTableDef;
};
