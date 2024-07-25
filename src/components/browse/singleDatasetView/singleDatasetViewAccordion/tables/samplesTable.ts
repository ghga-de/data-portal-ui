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

  const samples = props.details.samples || [];

  const samplesTable: TableFields[] = [
    {
      header: "Sample ID",
      data: samples.map((x) => x.accession),
      cssClasses: "",
    },
    {
      header: "Description",
      data: samples.map((x) => x.description),
      cssClasses: "text-wrap text-break",
    },
    {
      header: "Status",
      data: samples.map(
        (x) => (x.case_control_status || "").toLowerCase() || "N/A"
      ),
      cssClasses: "text-capitalize",
    },
    {
      header: "Sex",
      data: samples.map((x) => (x.individual.sex || "").toLowerCase() || "N/A"),
      cssClasses: "text-capitalize",
    },
    {
      header: "Phenotype",
      data: samples.map(
        (x) =>
          (x.individual.phenotypic_features_terms || []).join(", ") || "N/A"
      ),
      cssClasses: "text-wrap text-break",
    },
    {
      header: "Biospecimen type",
      data: samples.map((x) => x.biospecimen_type || "N/A"),
      cssClasses: "",
    },
    {
      header: "Tissue",
      data: samples.map((x) => x.biospecimen_tissue_term || "N/A"),
      cssClasses: "text-capitalize",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(samplesTable.map((x) => x.data))
  );

  const samplesTableDef: SDSVTableDefinition = {
    table: samplesTable,
    buttonText: samples
      ? "Sample Summary (" + samples.length + " samples)"
      : "Sample Summary (0 samples)",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return samplesTableDef;
};
