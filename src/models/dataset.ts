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

import { FacetModel } from "./facets";

export interface FileModel {
  accession: string;
  ega_accession: string;
  alias: string;
  name: string;
  format: string;
}

export interface ExperimentEmbeddedModel {
  accession: string;
  ega_accession: string;
  alias: string;
  type: string;
  title: string;
  description: string;
  experiment_method: {
    accession: string;
    alias: string;
    name: string;
    description: string;
    type: string;
    instrument_model: string;
  };
}

export interface PublicationModel {
  accession: string;
  title: string;
  abstract: string;
  journal: string;
  year: number;
  author: string;
  doi: string;
  alias: string;
}

export interface SampleModel {
  accession: string;
  ega_accession: string;
  name: string;
  description: string;
  alias: string;
  individual: {
    accession: string;
    alias: string;
    phenotypic_features_terms: string[];
    diagnosis_terms: string[];
    sex: string;
    geographical_region_term: string;
  };
  case_control_status: string;
  biospecimen_type: string;
  biospecimen_tissue_term: string;
}

export interface StudyEmbeddedModel {
  accession: string;
  ega_accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  affiliations: string[];
  attributes: AttributeModel[];
  publications: PublicationModel[];
}

export interface DataAccessPolicyModel {
  accession: string;
  alias: string;
  name: string;
  description: string;
  policy_text: string;
  policy_url: string;
  data_access_committee: DataAccessCommitteeModel;
}

export interface DataAccessCommitteeModel {
  accession: string;
  alias: string;
  email: string;
  institute: string;
}

export interface AttributeModel {
  key: string;
  value: string;
}

export interface DatasetEmbeddedModel {
  accession: string;
  ega_accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  experiments: ExperimentEmbeddedModel[] | undefined;
  study_files: FileModel[];
  sample_files: FileModel[];
  sequencing_process_files: FileModel[];
  analysis_process_output_files: FileModel[];
  samples: SampleModel[];
  study: StudyEmbeddedModel;
  data_access_policy: DataAccessPolicyModel;
}

export interface HitContentModel {
  title: string;
  alias: string;
  description?: string;
  types?: string[];
}

export interface HitModel {
  id_: string;
  content: HitContentModel;
}

export interface SearchResponseModel {
  facets: FacetModel[];
  count: number;
  hits: HitModel[];
}

export interface DatasetDetailsSummaryModel {
  title: string;
  description: string;
  accession: string;
  types: string[];
  dac_email: string;
  samples_summary: SampleSummaryModel;
  studies_summary: StudySummaryModel;
  experiments_summary: ExperimentsSummaryModel;
  files_summary: FileSummaryModel;
}

export interface DatasetSummaryModel {
  count: number;
}

export interface SampleSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
    tissues: { value: string; count: number }[];
    phenotypic_features: { value: string; count: number }[];
  };
}

export interface StudySummaryModel {
  count: number;
  stats: {
    accession: string[];
    title: string[];
  };
}

export interface ExperimentsSummaryModel {
  count: number;
  stats: {
    experiment_methods: { value: string; count: number }[];
  };
}

export interface FileSummaryModel {
  count: number;
  stats: {
    format: { value: string; count: number }[];
  };
}

export interface IndividualSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
  };
}

export interface ExperimentMethodSummaryModel {
  count: number;
  stats: {
    instrument_model: { value: string; count: number }[];
  };
}

export interface MetadataSummaryModel {
  resource_stats: {
    Dataset: DatasetSummaryModel;
    Individual: IndividualSummaryModel;
    ExperimentMethod: ExperimentMethodSummaryModel;
    AnalysisProcessOutputFile: FileSummaryModel;
    SequencingProcessFile: FileSummaryModel;
    StudyFile: FileSummaryModel;
  };
}
