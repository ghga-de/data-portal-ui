import { Accordion, Table } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";
import { parseBytes } from "../../../../utils/utils";

interface SingleDatasetViewAccordionProps {
  details: datasetEmbeddedModel;
}

const SingleDatasetViewAccordion = (props: SingleDatasetViewAccordionProps) => {
  let fileSize = 0;

  return (
    <Accordion>
      <Accordion.Item className="mb-4" eventKey="0">
        <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
          Experiment Summary
        </Accordion.Button>
        <Accordion.Body className="pt-4">
          <Table bordered hover className="fs-8" size="sm">
            <thead>
              <tr>
                <th className="fs-7 w-25">Experiment</th>
                <th className="w-25">Alias</th>
                <th>Number of Samples</th>
              </tr>
            </thead>
            <tbody>
              {props.details.has_experiment.map((x) => {
                return (
                  <tr key={x.accession}>
                    <td>
                      {x.accession}
                      <br />
                      <span className="fs-9 text-muted">{}</span>
                    </td>
                    <td>{x.alias}</td>
                    <td>{x.has_sample.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="mb-4" eventKey="1">
        <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
          Sample Summary
        </Accordion.Button>
        <Accordion.Body className="pt-4">
          <Table bordered hover className="fs-8" size="sm">
            <thead>
              <tr>
                <th className="fs-7 w-25">Sample</th>
                <th className="w-25">Sample ID</th>
                <th>Sex</th>
              </tr>
            </thead>
            <tbody>
              {props.details.has_sample.map((x) => {
                return (
                  <tr key={x.accession}>
                    <td>
                      {x.name}
                      <br />
                      <span className="fs-9 text-muted">{}</span>
                    </td>
                    <td>{x.accession}</td>
                    <td className="text-capitalize">{x.has_individual.sex}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="mb-4" eventKey="2">
        <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
          File Summary ({props.details.has_file.length} files,{" "}
          {props.details.has_file.map((x) => {
            fileSize = fileSize + x.size;
            return null;
          })}
          {parseBytes(fileSize)})
        </Accordion.Button>
        <Accordion.Body className="pt-4">
          <Table bordered hover className="fs-8" size="sm">
            <thead>
              <tr>
                <th className="fs-7 w-25">File name</th>
                <th className="w-25">File type</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {props.details.has_file.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.name}</td>
                    <td>{x.format.toUpperCase()}</td>
                    <td>{parseBytes(x.size)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SingleDatasetViewAccordion;
