import { useCallback, useEffect, useState } from "react";
import { IVA } from "../../../models/ivas";
import { User } from "../../../services/auth";
import { Col, Row, Table } from "react-bootstrap";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";
import IVABrowserListModal from "./ivaBrowserListModal";

interface IVABrowserListProps {
  ivas: IVA[];
  user: User;
  onUpdate: any;
}

const IVABrowserList = (props: IVABrowserListProps) => {
  const buildInnerTable = useCallback(() => {
    return [
      {
        header: "ID",
        data: props.ivas.map((x) => x.id),
        cssClasses: "d-none",
      },
      {
        header: "User",
        data: props.ivas.map((x) => props.user.full_name || props.user.name),
      },
      {
        header: "Type",
        data: props.ivas.map((x) => x.type),
      },
      {
        header: "Address",
        data: props.ivas.map((x) => x.value),
      },
      {
        header: "Last Changed Date",
        data: props.ivas.map((x) => x.lastChange.split("T")[0]),
      },
      {
        header: "Status",
        data: props.ivas.map((x) => x.status),
      },
      {
        header: "Actions",
        data: props.ivas.map((x) => ""),
      },
    ];
  }, [props.ivas, props.user.full_name, props.user.name]);

  const [innerTable, setInnerTable] = useState<TableFields[]>(
    buildInnerTable()
  );

  useEffect(() => {
    let table: TableFields[] = buildInnerTable();
    setInnerTable(table);
    setSortedData(transposeTableForHTML(table.map((x) => x.data)));
  }, [buildInnerTable, props.ivas]);

  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(innerTable.map((x) => x.data))
  );

  let tableDefinition = {
    sortDefinition,
    setSortDefinition,
    sortedData,
    setSortedData,
    table: innerTable,
  };

  function onUpdate() {
    props.onUpdate();
    if (selectedIVA) {
      sortedData.find(
        (x: any) =>
          x[innerTable.findIndex((x) => x.header === "ID")] === selectedIVA.id
      )[innerTable.findIndex((x) => x.header === "Status")] =
        selectedIVA.status;
    }
  }

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIVA(undefined);
  };
  const handleShowModal = (accessRequest: IVA) => {
    setSelectedIVA(accessRequest);
    setShowModal(true);
  };

  const [selectedIVA, setSelectedIVA] = useState<IVA | undefined>();

  return (
    <div>
      <IVABrowserListModal
        show={showModal}
        setShow={setShowModal}
        user={props.user}
        handleClose={handleCloseModal}
        handleShow={handleShowModal}
        iva={selectedIVA}
        onUpdate={onUpdate}
      />
      <Table className="w-lg-100" style={{ minWidth: "800px" }}>
        <thead className="border-light-3 border-1">
          <tr>
            {innerTable.map((y: any, idy: number) => {
              if (y.header !== "ID") {
                return (
                  <th
                    className={
                      y.cssClasses +
                      " align-middle bg-secondary text-white lh-1"
                    }
                    key={"table_th_" + idy}
                    style={{ position: "sticky", top: "0px" }}
                  >
                    <Row className="flex-nowrap align-items-center">
                      <Col xs={"auto"} className="pe-0 ps-2">
                        <SortButton
                          tableDefinition={tableDefinition}
                          index={idy}
                          buttonVariant="outline-white"
                        />
                      </Col>
                      <Col className="ps-0">{y.header}</Col>
                    </Row>
                  </th>
                );
              } else
                return <th key={"table_th_" + idy} className="d-none"></th>;
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((y: any, idy: number) => {
            return (
              <tr
                role="button"
                title={"View access request"}
                key={"row_" + idy}
                className={
                  y.find((x: any) => x === "allowed")
                    ? "text-success"
                    : y.find((x: any) => x === "denied")
                    ? "text-danger"
                    : ""
                }
                onClick={() =>
                  handleShowModal(
                    props.ivas.filter(
                      (x) =>
                        x.id ===
                        y[innerTable.findIndex((x) => x.header === "ID")]
                    )[0]
                  )
                }
              >
                {y.map((z: any, idz: any) => {
                  if (idz !== 0) {
                    return (
                      <td
                        className={innerTable[idz].cssClasses}
                        key={"cell_" + idz + "_row_" + idy}
                      >
                        {z}
                      </td>
                    );
                  } else
                    return (
                      <td
                        key={"cell_" + idz + "_row_" + idy}
                        className="d-none"
                      ></td>
                    );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default IVABrowserList;
