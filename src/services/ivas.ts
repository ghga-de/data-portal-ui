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

import { fetchJson, AUTH_URL } from "../utils/utils";
import { IVA, UserWithIVA } from "../models/ivas";
import { showMessage } from "../components/messages/usage";

// Get IVAs of a given user
export async function getUserIVAs(userId: string | undefined): Promise<IVA[] | null> {
  const url = new URL(`users/${userId}/ivas`, AUTH_URL);
  try {
    const response = await fetchJson(url)
    if (!response || response.status !== 200) {
      throw new Error(response.statusText);
    }
    return await response.json() as any as IVA[];
  } catch(error) {
    console.error(error);
    showMessage({
      type: "error",
      title:
        "Could not obtain user's IVAs. Please try reopening this dialog again.",
    });
    return null;
  }
};

// Get all IVAs with the corresponding user data
export async function getAllIVAs(): Promise<UserWithIVA[] | null> {
  const url = new URL("ivas", AUTH_URL);
  try {
    const response = await fetchJson(url);
    if (!response || response.status !== 200) {
      throw new Error(response.statusText);
    }
    return await response.json() as any as UserWithIVA[];
  } catch (error) {
    console.error(error);
    showMessage({
      type: "error", title: "Cannot retrieve IVAs.",
    });
    return null;
  }
}
