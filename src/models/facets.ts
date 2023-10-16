export interface FacetOptionsModel {
  value: string;
  count: number;
}

export interface FacetModel {
  key: string;
  name: string;
  options: FacetOptionsModel[];
}

export interface FacetFilterModel {
  key: string;
  value: string;
}
