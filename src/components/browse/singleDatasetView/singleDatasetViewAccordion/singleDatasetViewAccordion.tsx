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

import { Accordion, Col, Row, Table } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import { ExperimentsTable } from "./tables/experimentsTable";
import { FilesTable } from "./tables/filesTable";
import { SamplesTable } from "./tables/samplesTable";
import SortButton, { SDSVTableDefinition } from "../../../../utils/sortButton";
import { parseBytes } from "../../../../utils/utils";
import { DatasetInformationFileSummaryModel } from "../../../../models/files";

interface SingleDatasetViewAccordionProps {
  details: DatasetEmbeddedModel;
  files: DatasetInformationFileSummaryModel;
}

/** Section at the end of dataset details page consisting of three collapsible summary tables. */
const SingleDatasetViewAccordion = (props: SingleDatasetViewAccordionProps) => {
  const allFiles = Object.keys(props.details)
    .filter((key) => key.endsWith("_files"))
    .flatMap((key: string) => {
      const files = (props.details as any)[key];
      const file_category =
        key.charAt(0).toUpperCase() + key.slice(1, -1).replaceAll("_", " ");
      const files_with_info = files.map((x: any) => {
        const found_file = props.files.file_information.find(
          (y) => y.accession === x.accession
        );
        var size = 0;
        var sha256_hash = "";
        var storage_alias = "";
        if (found_file !== undefined) {
          const file_information = found_file;
          size = file_information.size;
          sha256_hash = file_information.sha256_hash;
          storage_alias = file_information.storage_alias;
        }
        return { ...x, size, sha256_hash, storage_alias };
      });
      return files_with_info.map((file: any) => ({ ...file, file_category }));
    });

  let Tables: SDSVTableDefinition[] = [
    ExperimentsTable(props),
    SamplesTable(props),
    FilesTable({ allFiles }),
  ];

  return (
    <Accordion>
      {Tables.map((x, idx) => (
        <Accordion.Item
          className="mb-4 border-0"
          eventKey={idx.toString()}
          key={"table_sdsv_" + idx}
        >
          <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
            {x.buttonText}
          </Accordion.Button>
          <Accordion.Body
            className="py-0 px-1 px-sm-2 px-lg-4 overflow-auto bg-white"
            style={{ maxHeight: "425px" }}
          >
            <Table
              hover
              className="my-1 my-sm-2 fs-8 fs-sm-7"
              size="sm"
              style={{ minWidth: "800px" }}
            >
              <thead className="bg-white">
                <tr>
                  {x.table.map((row: any, rowIdx: number) => (
                    <th
                      className={
                        row.className + " align-middle bg-white pt-3 lh-1"
                      }
                      key={"table_sdsv_th_" + rowIdx}
                      style={{ position: "sticky", top: "0px" }}
                    >
                      <Row className="flex-nowrap align-items-center">
                        <Col xs={"auto"} className="pe-0 ps-2">
                          <SortButton
                            tableDefinition={x}
                            index={rowIdx}
                            buttonVariant="outline-secondary"
                          />
                        </Col>
                        <Col className="ps-0">{row.header}</Col>
                      </Row>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {x.sortedData.map((row: any, rowIdx: number) => (
                  <tr key={"row_" + rowIdx + "_table_sdsv_" + idx}>
                    {row.map((cell: any, cell_idx: any) => (
                      <td
                        className={x.table[cell_idx]?.cssClasses}
                        key={
                          "cell_" +
                          cell_idx +
                          "_row_" +
                          rowIdx +
                          "_table_sdsv_" +
                          idx
                        }
                      >
                        {typeof cell === "number" &&
                        x.buttonText.includes("File Summary")
                          ? parseBytes(cell)
                          : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default SingleDatasetViewAccordion;
