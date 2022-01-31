import { facetModel } from './facets'

export interface datasetSampleModel {
    id: string;
    tissue: string,
}

export interface datasetFileModel {
    accession: string;
    format: string,
}

export interface datasetPublicationModel {
    id: string,
    title: string
}

export interface datasetExperimentModel {
    id: string,
    type: string,
    has_sample: datasetSampleModel[]
    has_file: datasetFileModel[]
}

export interface datasetModel {
    document_type: string;
    id: string,
    accession: string,
    title: string,
    description: string,
    type: string[],
    has_file: datasetFileModel[]
    has_study: string,
    has_publication: datasetPublicationModel[]
    has_experiment: datasetExperimentModel[]
    status: string
    creation_date: string
    update_date: string
};


export interface fileModel {
    id: string;
    name: string,
    size: number,
    format: string,
    category: string,
    checksum: string,
    creation_date: string,
};


export interface studyModel {
    id: string;
    title: string,
    abstract: string,
};


export interface datasetEmbeddedModel {
    id: string;
    title: string,
    description: string,
    type: string,
    files: fileModel[],
    has_study: studyModel,
    creation_date: string,
};

export interface hitContentModel {
    id: string;
    accession: string,
    title: string,
    description: string,
    type: string[],
    has_study: string,
};

export interface hitModel {
    document_type: string;
    id: string,
    context: string | null,
    content: hitContentModel,
};

export interface searchResponseModel {
    hits: hitModel[];
    facets: facetModel[],
};
