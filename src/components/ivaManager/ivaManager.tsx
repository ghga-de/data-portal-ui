import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useAuth } from "../../services/auth";
import { UserWithIVA } from "../../models/ivas";
import { useEffect, useState } from "react";
import { FILTER_MAX_ISO, FILTER_MIN_ISO } from "../../utils/utils";
import IvaManagerList from "./ivaManagerList/ivaManagerList";
import IvaManagerFilter from "./ivaManagerFilter/ivaManagerFilter";
import { getAllIVAs } from "../../services/ivas";

const IvaManager = () => {
  const [ivas, setIVAs] = useState<UserWithIVA[] | null | undefined>(undefined);
  const { user } = useAuth();

  let filteredIVAs: UserWithIVA[] | undefined = undefined;

  const [filterObj, setFilterObj] = useState({
    userFilter: "",
    fromFilter: FILTER_MIN_ISO,
    untilFilter: FILTER_MAX_ISO,
    stateFilter: "",
  });

  function handleFilter(
    user?: string,
    from?: string,
    until?: string,
    state?: string
  ) {
    if (ivas) {
      let userString: string =
        user !== undefined ? user : filterObj["userFilter"];
      let fromString: string =
        from !== undefined ? from : filterObj["fromFilter"];
      let untilString: string =
        until !== undefined ? until : filterObj["untilFilter"];
      let stateString: string =
        state !== undefined ? state : filterObj["stateFilter"];

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
        stateFilter: stateString,
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
      const ivas = await getAllIVAs();
      setIVAs(ivas);
    }
    if (ivas === undefined && user?.role === "data_steward") fetchData();
  }, [ivas, user]);

  filteredIVAs = ivas?.filter(
    (iva) =>
      iva.user_name
        ?.toLowerCase()
        .includes(filterObj["userFilter"].toLowerCase()) &&
      (filterObj["fromFilter"] === "" ||
        Date.parse(iva.changed) > Date.parse(filterObj["fromFilter"])) &&
      (filterObj["untilFilter"] === "" ||
        Date.parse(iva.changed) < Date.parse(filterObj["untilFilter"])) &&
      (filterObj["stateFilter"] === "" ||
        iva.state.toString() === filterObj["stateFilter"])
  );

  if (user?.role !== "data_steward") {
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
