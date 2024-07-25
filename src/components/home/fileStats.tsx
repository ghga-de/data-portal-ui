import { MetadataSummaryModel, FileSummaryModel } from "../../models/dataset";

/** Aggregate file stats for all files types. */
export function aggregateFileStats(
  summary: MetadataSummaryModel
): FileSummaryModel {
  if (summary.resource_stats) {
    const stats: {
      [key: string]: FileSummaryModel;
    } = summary.resource_stats as any;
    const formats: { [format: string]: number } = {};
    let count = 0;
    let size = 0;
    for (const statsName of Object.keys(stats).filter((key) =>
      key.endsWith("File")
    )) {
      const fileSummary = stats[statsName];
      count += fileSummary.count || 0;
      size += fileSummary.stats?.size || 0;
      for (const format of fileSummary.stats?.format || []) {
        formats[format.value] = (formats[format.value] || 0) + format.count;
      }
    }
    return {
      count,
      stats: {
        format: Object.entries(formats).map(([value, count]) => ({
          value,
          count,
        })),
        size,
      },
    };
  } else {
    return { count: 0, stats: { format: [], size: 0 } };
  }
}
