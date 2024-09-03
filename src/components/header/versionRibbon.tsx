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

import { useState } from "react";

const VERSION = process.env.REACT_APP_VERSION || "?";
const TEXT = (process.env.REACT_APP_RIBBON_TEXT || "").replace("$v", VERSION);

/** Corner ribbon for showing staging and version info. */
const VersionRibbon = () => {
  const [show, setShow] = useState(!!TEXT);

  const click = () => setShow(false);

  return show ? (
    <div className="version-ribbon" onClick={click}>
      <span>{TEXT}</span>
    </div>
  ) : null;
};

export default VersionRibbon;
