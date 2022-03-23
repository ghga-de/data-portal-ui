import { facetModel } from './facets'

export interface datasetSampleModel {
    id: string,
    tissue: string,
}

export interface datasetFileModel {
    accession: string,
    format: string,
}

export interface datasetPublicationModel {
    id: string,
    title: string,
}

export interface datasetExperimentModel {
    id: string,
    type: string,
    has_sample: datasetSampleModel[],
    has_file: datasetFileModel[],
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
    has_publication: datasetPublicationModel[],
    has_experiment: datasetExperimentModel[],
    status: string,
    creation_date: string,
    update_date: string,
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

export interface experimentModel {
    title: string,
    has_technology: [
        id: string,
        name: string,
    ]
};

export interface publicationModel {
    title: string,
    abstract: string,
    alias: string,
};

export interface sampleModel {
    name: string,
    has_individual: [
        gender: string,
        sex: string,
        has_phenotypic_feature: [
            id: string,
            name: string,
        ]
    ],
    tissue: string,

};

export interface studyModel {
    id: string;
    title: string,
    accession: string,
    abstract: string,
    has_publication: publicationModel[],
};


export interface datasetEmbeddedModel {
    id: string;
    title: string,
    description: string,
    type: string,
    has_experiment: experimentModel[],
    has_file: fileModel[],
    has_sample: sampleModel[],
    has_study: studyModel[],
    creation_date: string,
};

export interface hitContentModel {
    id: string;
    accession: string,
    title: string,
    description: string,
    type: string[],
    has_study: studyModel[],
    has_file: string[],
    has_sample: string[],
    has_experiment: string[],
};

export interface hitModel {
    document_type: string,
    id: string,
    context: string | null,
    content: hitContentModel,
};

export interface searchResponseModel {
    count: number,
    hits: hitModel[],
    facets: facetModel[],
};
