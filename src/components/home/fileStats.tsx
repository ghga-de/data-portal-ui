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
    for (const statsName of Object.keys(stats).filter((key) =>
      key.endsWith("File")
    )) {
      const fileSummary = stats[statsName];
      count += fileSummary.count || 0;
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
      },
    };
  } else {
    return { count: 0, stats: { format: [] } };
  }
}
