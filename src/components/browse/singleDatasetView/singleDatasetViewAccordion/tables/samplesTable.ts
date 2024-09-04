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
      header: "EGA ID",
      data: samples.map((x) => x.ega_accession),
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
