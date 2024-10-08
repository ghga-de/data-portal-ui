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
import { useAuth } from "../../services/auth";
import { WPS_URL, fetchJson } from "../../utils/utils";
import { Buffer } from "buffer";
import { Errors, Dataset } from "../../models/submissionsAndRequests";

/** Work Package creation */

export function WorkPackage() {
  const [datasets, setDatasets] = useState<Dataset[] | null | undefined>(
    undefined
  );
  const [dataset, setDataset] = useState<Dataset | undefined>(undefined);
  const [files, setFiles] = useState<string | undefined>(undefined);
  const [userKey, setUserKey] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const { showMessage } = useMessages();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const url = new URL(`users/${user.id}/datasets`, WPS_URL);
        try {
          let datasets: Dataset[];
          const response = await fetchJson(url);
          datasets = await response.json();
          datasets = datasets.filter(
            (dataset) =>
              dataset.stage === "download" || dataset.stage === "upload"
          );
          setDatasets(datasets);
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
          });
          console.error(error);
        }
      }
    }
    fetchData();
  }, [showMessage, user]);

  if (!user) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in to prepare for downloading or uploading data.
        </Alert>
      </Container>
    );
  }

  if (datasets === undefined) {
    return (
      <Container className="p-4">
        Loading datasets... <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (datasets === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">Datasets could not be loaded.</Alert>
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
            variant="quinary"
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
          A token for {dataset?.stage} has been created.
        </Alert>
        <Alert variant="info">
          <Form.Text>
            Make sure to copy your {dataset?.stage} token now as you will not be
            able to see this again.
          </Form.Text>
          <InputGroup className="mb-3">
            <Form.Control value={token} readOnly></Form.Control>
            <Button variant="quinary" onClick={copyToken}>
              <FontAwesomeIcon icon={faCopy} className="me-1 ms-1" />
            </Button>
          </InputGroup>
        </Alert>
        <div className="mt-4">
          <Button
            type="button"
            variant="quinary"
            className="text-white"
            onClick={() => setToken(undefined)}
          >
            Create another download token
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
      id && datasets ? datasets.find((dataset) => dataset.id === id) : undefined
    );
  }

  function handleUserKey(key: string) {
    setUserKey(key);
    // validate the user key
    // (for testing, you can use MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=)
    let errorCode = 0;
    if (key.match(/-.*PRIVATE.*-/)) {
      errorCode = 1; // if any kind of private key has been posted
    } else {
      // allow and trim headers and footers for public keys
      key = key.replace(/-----(BEGIN|END) CRYPT4GH PUBLIC KEY-----/, "").trim();
      // Base64 decode the key
      const binKey = Buffer.from(key, "base64");
      if (binKey?.length !== 32) {
        // key does not have the right length for a Crypt4GH public key
        if (binKey.subarray(0, 5).equals(Buffer.from("c4gh-", "ascii"))) {
          errorCode = 1; // key is actually a Base64 encoded Crypt4GH private key
        } else {
          errorCode = 2; // key is something else
        }
      }
    }
    const error =
      {
        1: "Please do not paste your private key here.",
        2: "This does not seem to be a Base64 encoded Crypt4GH key.",
      }[errorCode] ?? null;
    setErrors({ ...errors, userKey: error });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      !(user?.id && dataset?.id && dataset.stage && userKey && !errors.userKey)
    )
      return;
    const url = new URL("work-packages", WPS_URL);
    const fileIds = (files || "").split(/[,\s]+/).filter((file) => file);
    const data = {
      dataset_id: dataset.id,
      type: dataset.stage,
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
      console.error(error);
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
                <strong>{dataset.stage}</strong>
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
                You can restrict the {dataset.stage} to certain files only. To
                do so, enter the desired file IDs above, separated by whitespace
                or commas. Otherwise, leave the field above empty in order to{" "}
                {dataset.stage} all files of the dataset.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label htmlFor="userKey">
                Your public Crypt4GH key:
              </Form.Label>
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
                  format) above, so that we can encrypt your data.
                </Form.Text>
              )}
            </Form.Group>
            {!userKey || errors.userKey ? null : (
              <div className="mt-4">
                <Button type="submit" variant="quinary" className="text-white">
                  <FontAwesomeIcon
                    icon={dataset.stage === "upload" ? faUpload : faDownload}
                    className="me-2 ms-3"
                  />
                  <span className="me-3">
                    Generate an access token for {dataset.stage}
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
