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
  // id: string;
  accession: string;
  alias: string;
  // study is a repeat of data?
  study: studyEmbeddedModel;
  name: string;
  format: string;
  size: number;
  checksum: string;
  checksum_type: string;
  dataset: string;
  // category: string;
  // creation_date: string;
}

export interface experimentEmbeddedModel {
  title: string;
  has_protocol: [
    {
      id: string;
      instrument_model: string;
    }
  ];
  description: string;
  accession: string;
  ega_accession: string;
  alias: string;
  has_sample: sampleModel[];
  type: string;
}

export interface publicationModel {
  id: string;
  title: string;
  abstract: string;
  alias: string;
  xref: string[];
  accession: string;
  author: string;
  journal: string;
  year: number;
}

export interface sampleModel {
  name: string;
  has_individual: {
    gender: string;
    sex: string;
    has_phenotypic_feature: [
      {
        id: string;
        name: string;
        concept_name: string;
      }
    ];
  };
  has_anatomical_entity: [
    {
      concept_name: string;
    }
  ];
  tissue: string;
  description: string;
  accession: string;
  ega_accession: string;
  alias: string;
  case_control_status: string;
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
  // id: string;
  accession: string;
  alias: string;
  title: string;
  description: string;
  // accession: string;
  type: string;
  release_date: string;
  // abstract: string;
  // has_publication: publicationModel[];
  attributes: attributeModel[];
  has_project: projectModel;
  // ega_accession: string;
}

export interface dataAccessPolicyModel {
  // id: string;
  accession: string;
  alias: string;
  name: string;
  description: string;
  // data_request_form: string;
  policy_text: string;
  policy_url: string;
  data_access_committee: dataAccessCommitteeModel;
}

export interface dataAccessCommitteeModel {
  // id: string;
  accession: string;
  // has_member: dataAccessCommitteeMemberModel[];
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
  // id: string;
  accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  // has_experiment: experimentEmbeddedModel[];
  // study_files vs files?
  study_files: fileModel[];
  has_sample: sampleModel[];
  studies: studyEmbeddedModel[];
  data_access_policy: dataAccessPolicyModel;
  // has_attribute: attributeModel[];
  // has_publication: publicationModel[];
  // creation_date: string;
  // release_status: string;
  // release_date: string;
  // update_date: string;
}

export interface hitContentModel {
  // id: string;
  accession: string;
  // ega_accession: string;
  title: string;
  description: string;
  types: string[];
  study_files: string[];
  studies: string[];
  // has_sample: string[];
  // has_experiment: string[];
}

export interface hitModel {
  document_type: string;
  id: string;
  context: string | null;
  content: hitContentModel;
}

export interface searchResponseModel {
  count: number;
  hits: hitModel[];
  facets: facetModel[];
}

export interface datasetDetailsSummaryModel {
  id: string;
  title: string;
  description: string;
  accession: string;
  ega_accession: string;
  type: string;
  dac_email: string;
  sample_summary: sampleSummaryModel;
  study_summary: studySummaryModel;
  experiment_summary: experimentSummaryModel;
  file_summary: fileSummaryModel;
}

export interface datasetSummaryModel {
  count: number;
}

export interface sampleSummaryModel {
  count: number;
  stats: {
    sex: sexSummaryModel;
    tissues: { [key: string]: number };
    phenotypes: { [key: string]: number };
  };
}

export interface sexSummaryModel {
  female: number;
  male: number;
  unkown: number;
}

export interface studySummaryModel {
  count: number;
  stats: {
    ega_accession: string;
    accession: string;
    title: string;
  };
}

export interface experimentSummaryModel {
  count: number;
  stats: {
    protocol: { [key: string]: number };
  };
}

export interface fileSummaryModel {
  count: number;
  stats: {
    format: { [key: string]: number };
    size: number;
  };
}

export interface individualSummaryModel {
  count: number;
  stats: {
    sex: { [key: string]: number };
  };
}

export interface protocolSummaryModel {
  count: number;
  stats: {
    protocol: { [key: string]: number };
  };
}

export interface metadataSummaryModel {
  dataset_summary: datasetSummaryModel;
  sample_summary: sampleSummaryModel;
  study_summary: studySummaryModel;
  experiment_summary: experimentSummaryModel;
  file_summary: fileSummaryModel;
  individual_summary: individualSummaryModel;
  protocol_summary: protocolSummaryModel;
}
