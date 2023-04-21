import { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../messages/usage";
import authService, { User } from "../../services/auth";
import { fetchJson } from "../../utils/utils";
import { Buffer } from "buffer";

const WPS_URL = process.env.REACT_APP_SVC_WPS_URL;

interface Dataset {
  id: string;
  title: string;
  description: string;
  workType: string;
}

interface Errors {
  userKey?: string | null;
}

/** Work Package creation */

export function WorkPackage() {
  const [datasets, setDatasets] = useState<Dataset[] | null | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [dataset, setDataset] = useState<Dataset | undefined>(undefined);
  const [files, setFiles] = useState<string | undefined>(undefined);
  const [userKey, setUserKey] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const { showMessage } = useMessages();

  useEffect(() => {
    async function fetchData() {
      let datasets: Dataset[] | null = null;
      const user = await authService.getUser();
      setUser(user);
      if (user) {
        const url = `${WPS_URL}/datasets`;
        try {
          const response = await fetchJson(url);
          datasets = await response.json();
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
          });
          console.log(error);
        }
      }
      setDatasets(datasets);
    }
    fetchData();
  }, [showMessage]);

  if (datasets === undefined) {
    return (
      <Container className="p-4">
        Loading datasets... <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in to prepare for downloading or uploading data.
        </Alert>
      </Container>
    );
  }

  if (datasets === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">Datasets could no tbe loaded.</Alert>
      </Container>
    );
  }

  function copyToken() {
    if (!token) return;
    navigator.clipboard.writeText(token);
    showMessage({
      type: "success",
      title: "The token has been copied to the clipboard.",
    });
  }

  if (token === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Unfortunately, the token could not be created.
        </Alert>
        <div className="mt-4">
          <Button
            type="button"
            variant="primary"
            className="text-white"
            onClick={() => setToken(undefined)}
          >
            Try again
          </Button>
        </div>
      </Container>
    );
  }

  if (token) {
    // TODO: we should also show how long the token is valid here
    return (
      <Container className="p-4">
        <Alert variant="success">
          A token for {dataset?.workType} has been created.
        </Alert>
        <Alert variant="info">
          <Form.Text>
            Make sure to copy your {dataset?.workType} token now as you will not
            be able to see this again.
          </Form.Text>
          <InputGroup className="mb-3">
            <Form.Control value={token} readOnly></Form.Control>
            <Button
              variant="primary"
              className="text-white"
              onClick={copyToken}
            >
              <FontAwesomeIcon icon={faCopy} className="me-1 ms-1" />
            </Button>
          </InputGroup>
        </Alert>
        <div className="mt-4">
          <Button
            type="button"
            variant="primary"
            className="text-white"
            onClick={() => setToken(undefined)}
          >
            Create another access token
          </Button>
        </div>
      </Container>
    );
  }

  if (!datasets.length) {
    return (
      <Container className="p-4">
        <Alert variant="info">
          You currently do not have access to any datasets.
        </Alert>
      </Container>
    );
  }

  function handleSelect(id: string) {
    setDataset(
      id && datasets
        ? datasets.find((dataset) => dataset.id === id && dataset.workType)
        : undefined
    );
  }

  function handleUserKey(key: string) {
    setUserKey(key);
    // validate the user key
    // (for testing, you can use MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=)
    const binKey = Buffer.from(key, "base64");
    console.log(binKey.length);
    const error =
      binKey?.length === 32
        ? null
        : "This does not seem to be a Base64 encoded Crypt4GH key.";
    setErrors({ ...errors, userKey: error });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      !(
        user?.id &&
        dataset?.id &&
        dataset.workType &&
        userKey &&
        !errors.userKey
      )
    )
      return;
    const url = `${WPS_URL}/work-packages`;
    const fileIds = (files || "").split(/[,\s]+/);
    const data = {
      dataset_id: dataset.id,
      type: dataset.workType,
      file_ids: fileIds.length ? fileIds : null,
      user_public_crypt4gh_key: userKey,
    };
    try {
      const response = await fetchJson(url, "POST", data);
      if (response.status !== 201) throw Error(response.statusText);
      const { id, token } = await response.json();
      if (!id || !token) throw Error("Token was not created");
      setToken(id + ":" + token);
    } catch (error) {
      setToken(null);
      showMessage({
        type: "error",
        title: "Cannot create token.",
      });
      console.log(error);
    }
  }

  return (
    <Container className="p-4 mb-4">
      <h2>Download or upload datasets</h2>
      <p>
        To download or upload datasets, you need to use the GHGA connector with
        a token that allows downloading or uploading the files of a dataset for
        which you have corresponding permissions.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="dataset">
            As the first step, please select a dataset:
          </Form.Label>
          <Form.Select
            id="dataset"
            onChange={(event) => handleSelect(event.target.value)}
            value={dataset?.id}
          >
            <option></option>
            {datasets.map((d) => (
              <option
                key={d.id}
                value={d.id}
                selected={dataset && d.id === dataset.id}
              >
                {d.id}: {d.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {dataset ? (
          <div className="mt-2">
            <Form.Group>
              <p>{dataset.description}</p>
              <p>
                This dataset has been selected for:{" "}
                <strong>{dataset.workType}</strong>
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fileIds">File IDs:</Form.Label>
              <Form.Control
                as="textarea"
                id="fileIds"
                rows={6}
                onChange={(event) => setFiles(event.target.value)}
              ></Form.Control>
              <Form.Text muted>
                You can restrict the {dataset.workType} to certain files only.
                To do so, enter the desired file IDs above, separated by
                whitespace or commas. Otherwise, leave the field above empty in
                order to {dataset.workType} all files of the dataset.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label htmlFor="userKey">Your Crypt4GH key:</Form.Label>
              <Form.Control
                type="text"
                id="userKey"
                onChange={(event) => handleUserKey(event.target.value)}
                isValid={!!userKey && !errors.userKey}
                isInvalid={!!userKey && !!errors.userKey}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.userKey}
              </Form.Control.Feedback>
              {userKey ? null : (
                <Form.Text muted>
                  Please enter your public Crypt4GH key (in Base64 encoded
                  format) above.
                </Form.Text>
              )}
            </Form.Group>
            {!userKey || errors.userKey ? null : (
              <div className="mt-4">
                <Button
                  type="submit"
                  variant="secondary"
                  className="text-white"
                >
                  <FontAwesomeIcon
                    icon={dataset.workType === "upload" ? faUpload : faDownload}
                    className="me-2 ms-3"
                  />
                  <span className="me-3">
                    Generate an access token for {dataset.workType}
                  </span>
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </Form>
    </Container>
  );
}

export default WorkPackage;
