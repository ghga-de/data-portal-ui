import { useCallback, useEffect, useState } from "react";
import {
  UserWithIVA,
  IVAStatus,
  IVAStatusPrintable,
  IVATypePrintable,
} from "../../../models/ivas";
import { User } from "../../../services/auth";
import { Button, Col, Row, Table } from "react-bootstrap";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";
import IvaManagerListCreateCodeModal from "./ivaManagerListCreateCodeModal";
import IvaManagerListConfirmInvalidateModal from "./ivaManagerListConfirmInvalidateModal";
import IvaManagerListConfirmTransmissionModal from "./ivaManagerListConfirmTransmissionModal";

interface IvaManagerListProps {
  ivas: UserWithIVA[];
  user: User;
  onUpdate: any;
}

const IvaManagerList = (props: IvaManagerListProps) => {
  const [showConfirmInvalidateModal, setShowConfirmInvalidateModal] =
    useState(false);

  const [showConfirmTransmissionModal, setShowConfirmTransmissionModal] =
    useState(false);

  const [showCreateCodeModal, setShowCreateCodeModal] = useState(false);

  const InvalidateButton = (InvalidateButtonProps: { x: UserWithIVA }) => {
    return (
      <Button
        key={InvalidateButtonProps.x.id + "_invalidate_button"}
        className="py-0 text-white px-1"
        variant="danger"
        onClick={() => {
          setSelectedIVA(InvalidateButtonProps.x);
          setShowConfirmInvalidateModal(true);
        }}
      >
        Invalidate
      </Button>
    );
  };

  const CreateCodeButton = (CreateCodeButtonProps: { x: UserWithIVA }) => {
    return (
      <Button
        key={`${CreateCodeButtonProps.x.id}_
            ${
              CreateCodeButtonProps.x.status === IVAStatus.CodeCreated
                ? "re"
                : ""
            }create_code_button`}
        className="py-0 text-white ms-1 px-1"
        variant="quinary"
        onClick={() => {
          setSelectedIVA(CreateCodeButtonProps.x);
          setShowCreateCodeModal(true);
        }}
      >
        {CreateCodeButtonProps.x.status === IVAStatus.CodeCreated ? "Rec" : "C"}
        reate code
      </Button>
    );
  };

  const buildInnerTable = useCallback(() => {
    return [
      {
        header: "ID",
        data: props.ivas.map((x) => x.id),
      },
      {
        header: "User",
        data: props.ivas.map((x) => x.user_name),
      },
      {
        header: "Type",
        data: props.ivas.map((x) => IVATypePrintable[x.type]),
      },
      {
        header: "Address",
        data: props.ivas.map((x) => x.value),
      },
      {
        header: "Last Changed",
        data: props.ivas.map((x) => x.changed.split("T")[0]),
      },
      {
        header: "Status",
        data: props.ivas.map((x) => (
          <span
            className={
              x.status === IVAStatus.Verified
                ? "text-success"
                : x.status === IVAStatus.Unverified
                ? "text-secondary"
                : x.status === IVAStatus.CodeTransmitted
                ? "text-quaternary"
                : x.status === IVAStatus.CodeCreated ||
                  x.status === IVAStatus.CodeRequested
                ? "text-warning"
                : ""
            }
          >
            {IVAStatusPrintable[x.status]}
          </span>
        )),
      },
      {
        header: "Actions",
        data: props.ivas.map((x: UserWithIVA) => {
          if (x.status === IVAStatus.CodeRequested) {
            return (
              <>
                <InvalidateButton x={x} />
                <CreateCodeButton x={x} />
              </>
            );
          } else if (x.status === IVAStatus.CodeCreated) {
            return (
              <>
                <InvalidateButton x={x} />
                <Button
                  key={x.id + "_confirm_transmission_button"}
                  className="py-0 text-white ms-1 px-1"
                  variant="warning"
                  onClick={() => {
                    setSelectedIVA(x);
                    setShowConfirmTransmissionModal(true);
                  }}
                >
                  Confirm transmission
                </Button>
                <CreateCodeButton x={x} />
              </>
            );
          } else if (x.status !== IVAStatus.Unverified) {
            return <InvalidateButton x={x} />;
          }
          return <></>;
        }),
      },
    ];
  }, [props.ivas]);

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
    let table: TableFields[] = buildInnerTable();
    setInnerTable(table);
    setSortedData(transposeTableForHTML(table.map((x) => x.data)));
  }

  const [selectedIVA, setSelectedIVA] = useState<UserWithIVA | undefined>();

  return (
    <div>
      <IvaManagerListCreateCodeModal
        show={showCreateCodeModal}
        setShow={setShowCreateCodeModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        setShowConfirmTransmissionModal={setShowConfirmTransmissionModal}
        onUpdate={onUpdate}
      />
      <IvaManagerListConfirmInvalidateModal
        show={showConfirmInvalidateModal}
        setShow={setShowConfirmInvalidateModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        onUpdate={onUpdate}
      />
      <IvaManagerListConfirmTransmissionModal
        show={showConfirmTransmissionModal}
        setShow={setShowConfirmTransmissionModal}
        setShowCreateCodeModal={setShowCreateCodeModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        onUpdate={onUpdate}
      />
      <Table className="w-lg-100" style={{ minWidth: "800px" }}>
        <thead className="border-light-3 border-1">
          <tr>
            {innerTable.map((row: any, rowIdx: number) => {
              return (
                <th
                  className={
                    row.cssClasses + " align-middle bg-quinary text-white lh-1"
                  }
                  key={"table_th_" + rowIdx}
                  style={{ position: "sticky", top: "0px" }}
                >
                  <Row className="flex-nowrap align-items-center">
                    <Col xs={"auto"} className="pe-0 ps-2">
                      <SortButton
                        tableDefinition={tableDefinition}
                        index={rowIdx}
                        buttonVariant="outline-white"
                      />
                    </Col>
                    <Col className="ps-0">{row.header}</Col>
                  </Row>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row: any, rowIdx: number) => {
            return (
              <tr key={"row_" + rowIdx}>
                {row.map((cell: any, cellIdx: any) => {
                  return (
                    <td
                      className={innerTable[cellIdx].cssClasses}
                      key={"cell_" + cellIdx + "_row_" + rowIdx}
                    >
                      {cell}
                    </td>
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

export default IvaManagerList;
