import { useState } from "react";
import { DatasetEmbeddedModel } from "../../../../../models/dataset";
import { transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface SamplesTableProps {
  details: DatasetEmbeddedModel;
}

/**
 * This function creates the schema for the sample summary table,
 * which is one of three tables in the dataset details view.
 * @param props - Object containing the data and details.
 * @returns The table definition object that includes table content, button text and definitions.
 */
export const SamplesTable = (props: SamplesTableProps) => {
  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  const samplesTable: TableFields[] = [
    {
      header: "Sample ID",
      data: props.details.samples.map((x) => x.alias),
      cssClasses: "",
    },
    {
      header: "Description",
      data: props.details.samples.map((x) => x.description),
      cssClasses: "text-wrap text-break",
    },
    {
      header: "Status",
      data: props.details.samples.map((x) => x.condition.case_control_status),
      cssClasses: "text-capitalize",
    },
    {
      header: "Phenotype",
      data: props.details.samples.map((x) =>
        x.biospecimen.individual.phenotypic_features !== null
          ? x.biospecimen.individual.phenotypic_features[0]
          : "N/A"
      ),
      cssClasses: "",
    },
    {
      header: "Tissue",
      data: props.details.samples.map((x) =>
        x.biospecimen !== null ? x.biospecimen.tissue : "N/A"
      ),
      cssClasses: "text-capitalize",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(samplesTable.map((x) => x.data))
  );

  const samplesTableDef: SDSVTableDefinition = {
    table: samplesTable,
    buttonText:
      props.details.samples !== null
        ? "Sample Summary (" + props.details.samples.length + " samples)"
        : "Sample Summary",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return samplesTableDef;
};
