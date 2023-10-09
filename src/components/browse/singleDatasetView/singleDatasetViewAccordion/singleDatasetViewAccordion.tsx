import { Accordion, Col, Row, Table } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";
import { ExperimentsTable } from "./tables/experimentsTable";
import { FilesTable } from "./tables/filesTable";
import { SamplesTable } from "./tables/samplesTable";
import SortButton, { SDSVTableDefinition } from "../../../../utils/sortButton";
import { parseBytes } from "../../../../utils/utils";

interface SingleDatasetViewAccordionProps {
  details: datasetEmbeddedModel;
}

/** Section at the end of dataset details page consisting of three collapsible summary tables. */
const SingleDatasetViewAccordion = (props: SingleDatasetViewAccordionProps) => {
  const all_files = Object.keys(props.details)
    .filter((key) => key.endsWith("_files"))
    .flatMap((key: string) => {
      const files = (props.details as any)[key];
      const file_category =
        key.charAt(0).toUpperCase() + key.slice(1, -1).replace("_", " ");
      return files.map((file: any) => ({ ...file, file_category }));
    });

  const fileSize = all_files.reduce((a, c) => a + c.size, 0);

  let Tables: SDSVTableDefinition[] = [
    ExperimentsTable(props),
    SamplesTable(props),
    FilesTable({ all_files }, fileSize),
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
              <thead className="border-light-3 border-1 bg-white">
                <tr>
                  {x.table.map((y: any, idy: number) => (
                    <th
                      className={
                        y.className + " align-middle bg-white pt-3 lh-1"
                      }
                      key={"table_sdsv_th_" + idy}
                      style={{ position: "sticky", top: "0px" }}
                    >
                      <Row className="flex-nowrap align-items-center">
                        <Col xs={"auto"} className="pe-0 ps-2">
                          <SortButton
                            tableDefinition={x}
                            index={idy}
                            buttonVariant="outline-secondary"
                          />
                        </Col>
                        <Col className="ps-0">{y.header}</Col>
                      </Row>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {x.sortedData.map((y: any, idy: number) => (
                  <tr key={"row_" + idy + "_table_sdsv_" + idx}>
                    {y.map((z: any, idz: any) => (
                      <td
                        className={x.table[idz]?.cssClasses}
                        key={
                          "cell_" + idz + "_row_" + idy + "_table_sdsv_" + idx
                        }
                      >
                        {typeof z === "number" &&
                        x.buttonText.includes("File Summary")
                          ? parseBytes(z)
                          : z}
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
