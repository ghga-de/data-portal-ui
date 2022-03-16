import { facetFilterModel } from '../models/facets'


export const getFilterString = (filterDict: facetFilterModel[]) => {
    let filterString = ''
    for (var item of filterDict) {
      filterString += (item.key + ":" + item.value + ";")
    }
    return filterString.slice(0, -1)
  }
