// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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

import { useState } from "react";
import { AccessRequest } from "../../../models/submissionsAndRequests";
import { Col, Row, Table } from "react-bootstrap";
import AccessRequestModal from "./accessRequestModal";
import { User } from "../../../services/auth";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";

//
interface AccessRequestListProps {
  requests: AccessRequest[];
  setRequests: any;
  user: User;
}

const AccessRequestsList = (props: AccessRequestListProps) => {
  let innerTable: TableFields[] = [
    {
      header: "ID",
      data: props.requests.map((x) => x.id),
      cssClasses: "d-none",
    },
    {
      header: "Dataset",
      data: props.requests.map((x) => x.dataset_id),
    },
    {
      header: "User",
      data: props.requests.map((x) => x.full_user_name),
    },
    {
      header: "Starts",
      data: props.requests.map((x) => x.access_starts),
    },
    {
      header: "Ends",
      data: props.requests.map((x) => x.access_ends),
    },
    {
      header: "Requested",
      data: props.requests.map((x) => x.request_created),
    },
    {
      header: "Status",
      data: props.requests.map((x) => x.status),
    },
  ];

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
    if (props.requests) {
      props.setRequests([...props.requests]);
      if (selectedAccessRequest) {
        sortedData.find(
          (x: any) =>
            x[innerTable.findIndex((x) => x.header === "ID")] ===
            selectedAccessRequest.id
        )[innerTable.findIndex((x) => x.header === "Status")] =
          selectedAccessRequest.status;
      }
    }
  }

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setSelectedAccessRequest(undefined);
    setShowModal(false);
  };
  const handleShowModal = (accessRequest: AccessRequest) => {
    setSelectedAccessRequest(accessRequest);
    setShowModal(true);
  };

  const [selectedAccessRequest, setSelectedAccessRequest] = useState<
    AccessRequest | undefined
  >();

  return (
    <div>
      <AccessRequestModal
        show={showModal}
        setShow={setShowModal}
        userId={props.user.id}
        handleClose={handleCloseModal}
        handleShow={handleShowModal}
        accessRequest={selectedAccessRequest}
        setAccessRequests={props.setRequests}
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
                          setSortDefinition={tableDefinition.setSortDefinition}
                          setSortedData={tableDefinition.setSortedData}
                          sortDefinition={tableDefinition.sortDefinition}
                          sortedData={tableDefinition.sortedData}
                          table={innerTable}
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
                    props.requests.filter(
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

export default AccessRequestsList;
