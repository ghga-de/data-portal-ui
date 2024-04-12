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
import { IVA, IVAStatus, IVAType } from "../models/ivas";
import { showMessage } from "../components/messages/usage";

// Get user IVAs
export const getIVAs = async (userId: string, setUserIVAs: any) => {
  let url = AUTH_URL;
  url = new URL(`users/${userId}/ivas`, url);
  let method: string = "GET",
    ok: number = 200;
  const response = await fetchJson(url, method).catch(() => null);
  if (response && response.status === ok) {
    try {
      await response.json().then((x: any[]) => {
        function parseIVAStatusAndType(userIVA: any) {
          userIVA.status = userIVA.status as unknown as IVAStatus;
          userIVA.type = userIVA.type as unknown as IVAType;
        }
        let IVAs: IVA[] = x;
        IVAs.forEach(parseIVAStatusAndType);
        setUserIVAs(IVAs);
      });
    } catch {
      showMessage({
        type: "error",
        title:
          "Could not obtain user's IVAs. Please try reopening this dialog again.",
      });
    }
    return;
  }
  showMessage({
    type: "error",
    title:
      "Could not obtain user's IVAs. Please try reopening this dialog again.",
  });
  return;
};
