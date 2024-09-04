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

import { useCallback, useEffect, useState } from "react";
import {
  UserWithIVA,
  IVAState,
  IVAStatePrintable,
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

  const CreateCodeButton = (CreateCodeButtonProps: { x: UserWithIVA }) => {
    return (
      <Button
        key={`${CreateCodeButtonProps.x.id}_
            ${
              CreateCodeButtonProps.x.state === IVAState.CodeCreated ? "re" : ""
            }create_code_button`}
        className="py-0 text-white ms-1"
        variant="quinary"
        onClick={() => {
          setSelectedIVA(CreateCodeButtonProps.x);
          setShowCreateCodeModal(true);
        }}
      >
        {CreateCodeButtonProps.x.state === IVAState.CodeCreated ? "Rec" : "C"}
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
              x.state === IVAState.Verified
                ? "text-success"
                : x.state === IVAState.Unverified
                ? "text-secondary"
                : x.state === IVAState.CodeTransmitted
                ? "text-quaternary"
                : x.state === IVAState.CodeCreated ||
                  x.state === IVAState.CodeRequested
                ? "text-warning"
                : ""
            }
          >
            {IVAStatePrintable[x.state]}
          </span>
        )),
      },
      {
        header: "Actions",
        data: props.ivas.map((x: UserWithIVA) => {
          if (x.state === IVAState.CodeRequested) {
            return (
              <>
                <InvalidateButton x={x} />
                <CreateCodeButton x={x} />
              </>
            );
          } else if (x.state === IVAState.CodeCreated) {
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
          } else if (x.state !== IVAState.Unverified) {
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
      )[innerTable.findIndex((x) => x.header === "Status")] = selectedIVA.state;
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
              if (row.header !== "ID") {
                return (
                  <th
                    className={
                      row.cssClasses +
                      " align-middle bg-quinary text-white lh-1"
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
              } else
                return <th key={"table_th_" + rowIdx} className="d-none"></th>;
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row: any, rowIdx: number) => {
            return (
              <tr key={"row_" + rowIdx}>
                {row.map((cell: any, cellIdx: any) => {
                  if (cellIdx !== 0) {
                    return (
                      <td
                        className={innerTable[cellIdx].cssClasses}
                        key={"cell_" + cellIdx + "_row_" + rowIdx}
                      >
                        {cell}
                      </td>
                    );
                  } else
                    return (
                      <td
                        key={"cell_" + cellIdx + "_row_" + rowIdx}
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

export default IvaManagerList;
