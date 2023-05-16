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
//
import { user } from "./data";

export let accessRequests = [
  {
    id: "TEST00004000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00003000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00003000001.",
    access_starts: "2023-05-11T15:00:00.000Z",
    access_ends: "2024-05-11T14:59:59.000Z",
    request_created: "2023-05-09T12:04:02.000Z",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },

  {
    id: "TEST00005000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00002000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00003000001.",
    access_starts: "2023-05-12T15:00:00.000Z",
    access_ends: "2024-05-12T14:59:59.000Z",
    request_created: "2023-05-11T12:04:02.000Z",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },
];

export function getAllAccessRequests() {
  return accessRequests;
}

export function setStatus(accessRequestId, status) {
  let changeIndex = accessRequests.findIndex((x) => x.id === accessRequestId);
  accessRequests[changeIndex].status = status;
  accessRequests[changeIndex].changed_by = user.id;
  accessRequests[changeIndex].status_changed = new Date().toISOString();
}
