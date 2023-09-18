import { facetModel } from "./facets";

export interface datasetSampleModel {
  id: string;
  tissue: string;
}

export interface datasetFileModel {
  accession: string;
  format: string;
}

export interface datasetPublicationModel {
  id: string;
  title: string;
}

export interface datasetExperimentModel {
  id: string;
  type: string;
  has_sample: datasetSampleModel[];
  has_file: datasetFileModel[];
}

export interface datasetModel {
  document_type: string;
  id: string;
  accession: string;
  title: string;
  description: string;
  type: string[];
  has_file: datasetFileModel[];
  has_study: string;
  has_publication: datasetPublicationModel[];
  has_experiment: datasetExperimentModel[];
  status: string;
  creation_date: string;
  update_date: string;
}

export interface fileModel {
  accession: string;
  alias: string;
  name: string;
  format: string;
  size: number;
  checksum: string;
  checksum_type: string;
}

export interface sequencingExperimentEmbeddedModel {
  title: string;
  sequencing_protocol: {
    instrument_model: string;
  };
  description: string;
  accession: string;
  alias: string;
  type: string;
}

export interface publicationModel {
  accession: string;
  title: string;
  abstract: string;
  journal: string;
  year: number;
  author: string;
  doi: string;
  alias: string;
}

export interface sampleModel {
  accession: string;
  name: string;
  description: string;
  alias: string;
  biospecimen: {
    individual: {
      sex: string;
      phenotypic_features: string[];
    };
    tissue: string;
  };
  condition: {
    name: string;
    case_control_status: string;
  };
}

export interface projectModel {
  id: string;
  title: string;
  alias: string;
  has_attribute: attributeModel[];
  description: string;
  accession: string;
  ega_accession: string;
}

export interface studyEmbeddedModel {
  accession: string;
  alias: string;
  title: string;
  description: string;
  type: string;
  attributes: attributeModel[];
  publications: publicationModel[];
}

export interface dataAccessPolicyModel {
  accession: string;
  alias: string;
  name: string;
  description: string;
  policy_text: string;
  policy_url: string;
  data_access_committee: dataAccessCommitteeModel;
}

export interface dataAccessCommitteeModel {
  accession: string;
  alias: string;
  email: string;
  institute: string;
}

export interface dataAccessCommitteeMemberModel {
  email: string;
  id: string;
  organization: string;
}

export interface attributeModel {
  key: string;
  value: string;
}

export interface datasetEmbeddedModel {
  accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  sequencing_experiments: sequencingExperimentEmbeddedModel[] | undefined;
  study_files: fileModel[];
  sample_files: fileModel[];
  sequencing_process_files: fileModel[];
  analysis_process_output_files: fileModel[];
  samples: sampleModel[];
  studies: studyEmbeddedModel[];
  data_access_policy: dataAccessPolicyModel;
}

export interface hitContentModel {
  accession: string;
  title: string;
  description: string;
  types: string[];
  study_files: string[];
  studies: string[];
  samples: string[];
  sequencing_experiments: string[];
}

export interface hitModel {
  document_type: string;
  context: string | null;
  content: hitContentModel;
}

export interface searchResponseModel {
  facets: facetModel[];
  count: number;
  hits: hitModel[];
}

export interface datasetDetailsSummaryModel {
  title: string;
  description: string;
  accession: string;
  types: string[];
  dac_email: string;
  samples_summary: sampleSummaryModel;
  studies_summary: studySummaryModel;
  sequencing_experiments_summary: experimentSummaryModel;
  files_summary: fileSummaryModel;
}

export interface datasetSummaryModel {
  count: number;
}

export interface sampleSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
    tissues: { value: string; count: number }[];
    phenotypic_features: { value: string; count: number }[];
  };
}

export interface studySummaryModel {
  count: number;
  stats: {
    accession: string[];
    title: string[];
  };
}

export interface experimentSummaryModel {
  count: number;
  stats: {
    sequencing_protocols: { value: string; count: number }[];
  };
}

export interface fileSummaryModel {
  count: number;
  stats: {
    format: { value: string; count: number }[];
    size: number;
  };
}

export interface individualSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
  };
}

export interface protocolSummaryModel {
  count: number;
  stats: {
    type: { value: string; count: number }[];
  };
}

export interface metadataSummaryModel {
  resource_stats: {
    Dataset: datasetSummaryModel;
    SequencingProcessFile: fileSummaryModel;
    Individual: individualSummaryModel;
    SequencingProtocol: protocolSummaryModel;
  };
}
