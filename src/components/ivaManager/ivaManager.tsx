import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useAuth } from "../../services/auth";
import { EmbeddedIVA } from "../../models/ivas";
import { useEffect, useState } from "react";
import { useMessages } from "../messages/usage";
import {
  FILTER_MAX_ISO,
  FILTER_MIN_ISO,
  AUTH_URL,
  fetchJson,
} from "../../utils/utils";
import IvaManagerList from "./ivaManagerList/ivaManagerList";
import IvaManagerFilter from "./ivaManagerFilter/ivaManagerFilter";

const IvaManager = () => {
  const [ivas, setIVAs] = useState<EmbeddedIVA[] | null | undefined>(undefined);

  const { showMessage } = useMessages();
  const { user } = useAuth();

  let filteredIVAs: EmbeddedIVA[] | undefined = undefined;

  const [filterObj, setFilterObj] = useState({
    userFilter: "",
    fromFilter: FILTER_MIN_ISO,
    untilFilter: FILTER_MAX_ISO,
    statusFilter: "",
  });

  function handleFilter(
    user?: string,
    from?: string,
    until?: string,
    status?: string
  ) {
    if (ivas) {
      let userString: string =
        user !== undefined ? user : filterObj["userFilter"];
      let fromString: string =
        from !== undefined ? from : filterObj["fromFilter"];
      let untilString: string =
        until !== undefined ? until : filterObj["untilFilter"];
      let statusString: string =
        status !== undefined ? status : filterObj["statusFilter"];

      let fromDate = Date.parse(fromString);
      if (fromDate < Date.parse(FILTER_MIN_ISO) || !fromString)
        fromDate = Date.parse(FILTER_MIN_ISO);

      let untilDate = Date.parse(untilString);
      if (untilDate > Date.parse(FILTER_MAX_ISO) || !untilString)
        untilDate = Date.parse(FILTER_MAX_ISO);

      setFilterObj({
        userFilter: userString,
        fromFilter: fromString,
        untilFilter: untilString,
        statusFilter: statusString,
      });
    }
  }

  function onUpdate() {
    if (filteredIVAs) {
      filteredIVAs = [...filteredIVAs];
    }
  }

  useEffect(() => {
    async function fetchData() {
      let ivas: EmbeddedIVA[] | null = null;
      if (user?.id) {
        const url = new URL(`ivas`, AUTH_URL);
        try {
          const response = await fetchJson(url);
          if (response.ok) {
            ivas = await response.json();
          } else {
            throw new Error("Failed to retrieve IVAs: " + response.text);
          }
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve IVAs.",
          });
        }
      }
      if (ivas !== null) {
        setIVAs(ivas);
      }
    }
    if (ivas === null || ivas === undefined) fetchData();
  }, [ivas, showMessage, user]);

  filteredIVAs = ivas?.filter(
    (iva) =>
      iva.user_name
        ?.toLowerCase()
        .includes(filterObj["userFilter"].toLowerCase()) &&
      (filterObj["fromFilter"] === "" ||
        Date.parse(iva.changed) > Date.parse(filterObj["fromFilter"])) &&
      (filterObj["untilFilter"] === "" ||
        Date.parse(iva.changed) < Date.parse(filterObj["untilFilter"])) &&
      (filterObj["statusFilter"] === "" ||
        iva.status.toString() === filterObj["statusFilter"])
  );

  if (!user || user.role !== "data_steward") {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in as a data steward to manage independent verification
          addresses.
        </Alert>
      </Container>
    );
  }

  if (ivas === undefined) {
    return (
      <Container className="p-4">
        Loading IVAs... <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (ivas === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">IVAs could not be loaded.</Alert>
      </Container>
    );
  }
  return (
    <Container className="pb-4">
      <Row>
        <Col className="overflow-auto">
          <h3 style={{ margin: "1em 0" }}>
            Independent Verification Address Management
          </h3>
          <IvaManagerFilter handleFilter={handleFilter} filterObj={filterObj} />
          <IvaManagerList
            ivas={filteredIVAs ? filteredIVAs : []}
            user={user}
            onUpdate={onUpdate}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default IvaManager;