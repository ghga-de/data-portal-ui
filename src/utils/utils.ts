import { facetFilterModel } from "../models/facets";

export const getFilterString = (filterDict: facetFilterModel[]) => {
  let filterString = "";
  for (var item of filterDict) {
    filterString += item.key + ":" + item.value + ";";
  }
  return filterString.slice(0, -1);
};

export const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getFilterParams = (filterString: string | null) => {
  let facetFilterModelList: facetFilterModel[] = [];
  if (filterString != null) {
    let filterStringList = filterString.split(";");
    for (var item of filterStringList) {
      let filterItem: facetFilterModel = {
        key: item.split(":")[0],
        value: item.split(":")[1],
      };
      facetFilterModelList.push(filterItem);
    }
  }
  return facetFilterModelList;
};

export const parseBytes = (bytes: number) => {
  const prefixes = [" B", " kB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"];
  let parsedBytes = prefixes.flatMap((prefix, index) => {
    let calculatedVal = bytes / Math.pow(1000, index)
    if (calculatedVal < 1000 && calculatedVal >= 0.1) {
      return String(Math.round(calculatedVal * 100) / 100) + prefix
    }
    else return null
  });
  var returnValue = parsedBytes.find((parsing) => parsing !== null)
  if (returnValue === undefined) returnValue = String(bytes) + prefixes[0]
  return returnValue
};
