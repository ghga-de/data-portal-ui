import { useCallback, useEffect, useState } from "react";
import { EmbeddedIVA, IVAStatus } from "../../../models/ivas";
import { User } from "../../../services/auth";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";
import IVABrowserListCreateCodeModal from "./IVABrowserListCreateCodeModal";

interface IVABrowserListProps {
  ivas: EmbeddedIVA[];
  user: User;
  onUpdate: any;
}

const IVABrowserList = (props: IVABrowserListProps) => {
  const ConfirmInvalidateModal = () => {
    return (
      <Modal
        show={showConfirmInvalidateModal}
        onHide={() => {
          setShowConfirmInvalidateModal(false);
          setSelectedIVA(undefined);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm invalidation of IVA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you really wish to invalidate the{" "}
            <em>
              {selectedIVA?.type
                .toString()
                .split(/(?=[A-Z])/)
                .join(" ")}
            </em>{" "}
            IVA for user <em>{selectedIVA?.user_name}</em> with address{" "}
            <em>{selectedIVA?.value}</em>?
          </p>
          <div>
            <Button variant="danger">Invalidate</Button>
            <Button
              variant="gray"
              className="ms-2 text-white"
              onClick={() => {
                setShowConfirmInvalidateModal(false);
                setSelectedIVA(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  const [showConfirmInvalidateModal, setShowConfirmInvalidateModal] =
    useState(false);

  const ConfirmTransmissionModal = () => {
    return (
      <Modal
        show={showConfirmTransmissionModal}
        onHide={() => {
          setShowConfirmTransmissionModal(false);
          setSelectedIVA(undefined);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm code transmission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please confirm the transmission of the verification code for the{" "}
            <em>
              {selectedIVA?.type
                .toString()
                .split(/(?=[A-Z])/)
                .join(" ")}
            </em>{" "}
            IVA for user <em>{selectedIVA?.user_name}</em> with address{" "}
            <em>{selectedIVA?.value}</em>.
          </p>
          <div>
            <Button variant="quaternary">Confirm</Button>
            <Button
              variant="gray"
              className="ms-2 text-white"
              onClick={() => {
                setShowConfirmTransmissionModal(false);
                setSelectedIVA(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  const [showConfirmTransmissionModal, setShowConfirmTransmissionModal] =
    useState(false);

  const InvalidateButton = (InvalidateButtonProps: { x: EmbeddedIVA }) => {
    return (
      <Button
        key={InvalidateButtonProps.x.id + "_invalidate_button"}
        className="py-0 text-white"
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

  const CreateCodeButton = (CreateCodeButtonProps: { x: EmbeddedIVA }) => {
    return (
      <Button
        key={`${CreateCodeButtonProps.x.id}_
            ${
              CreateCodeButtonProps.x.status.toString() ===
              IVAStatus[IVAStatus.CodeCreated]
                ? "re"
                : ""
            }create_code_button`}
        className="py-0 text-white ms-1"
        variant="quaternary"
        onClick={() => {
          setSelectedIVA(CreateCodeButtonProps.x);
          setCreateCodeModal(true);
        }}
      >
        {CreateCodeButtonProps.x.status.toString() ===
        IVAStatus[IVAStatus.CodeCreated]
          ? "Rec"
          : "C"}
        reate code
      </Button>
    );
  };

  const buildInnerTable = useCallback(() => {
    return [
      {
        header: "ID",
        data: props.ivas.map((x) => x.id),
        cssClasses: "d-none",
      },
      {
        header: "User",
        data: props.ivas.map((x) => x.user_name),
      },
      {
        header: "Type",
        data: props.ivas.map((x) =>
          x.type
            .toString()
            .split(/(?=[A-Z])/)
            .join(" ")
        ),
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
              x.status.toString() === IVAStatus[IVAStatus.Verified]
                ? "text-success"
                : x.status.toString() === IVAStatus[IVAStatus.Unverified]
                ? "text-secondary"
                : x.status.toString() === IVAStatus[IVAStatus.CodeTransmitted]
                ? "text-quaternary"
                : x.status.toString() === IVAStatus[IVAStatus.CodeCreated] ||
                  x.status.toString() === IVAStatus[IVAStatus.CodeRequested]
                ? "text-warning"
                : ""
            }
          >
            {x.status
              .toString()
              .split(/(?=[A-Z])/)
              .join(" ")}
          </span>
        )),
      },
      {
        header: "Actions",
        data: props.ivas.map((x: EmbeddedIVA) => {
          if (x.status.toString() === IVAStatus[IVAStatus.CodeRequested]) {
            return (
              <>
                <InvalidateButton x={x} />
                <CreateCodeButton x={x} />
              </>
            );
          }
          if (x.status.toString() === IVAStatus[IVAStatus.CodeCreated]) {
            return (
              <>
                <InvalidateButton x={x} />
                <Button
                  key={x.id + "_confirm_transmission_button"}
                  className="py-0 text-white ms-1"
                  variant="quaternary"
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
          }
          if (x.status.toString() !== IVAStatus[IVAStatus.Unverified]) {
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
  }

  const [showModal, setCreateCodeModal] = useState(false);

  const handleCloseModal = () => {
    setCreateCodeModal(false);
    setSelectedIVA(undefined);
  };
  const handleShowModal = (accessRequest: EmbeddedIVA) => {
    setSelectedIVA(accessRequest);
    setCreateCodeModal(true);
  };

  const [selectedIVA, setSelectedIVA] = useState<EmbeddedIVA | undefined>();

  return (
    <div>
      <IVABrowserListCreateCodeModal
        show={showModal}
        setShow={setCreateCodeModal}
        handleClose={handleCloseModal}
        handleShow={handleShowModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        ConfirmTransmissionModal={ConfirmTransmissionModal}
        showConfirmTransmissionModal={showConfirmTransmissionModal}
        setShowConfirmTransmissionModal={setShowConfirmTransmissionModal}
        onUpdate={onUpdate}
      />
      <ConfirmInvalidateModal />
      <ConfirmTransmissionModal />
      <Table className="w-lg-100" style={{ minWidth: "800px" }}>
        <thead className="border-light-3 border-1">
          <tr>
            {innerTable.map((y: any, idy: number) => {
              if (y.header !== "ID") {
                return (
                  <th
                    className={
                      y.cssClasses + " align-middle bg-quinary text-white lh-1"
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
              <tr key={"row_" + idy}>
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
