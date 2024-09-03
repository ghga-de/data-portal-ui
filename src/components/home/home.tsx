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

import HomeBottomSection from "./homeBottomSection/homeBottomSection";
import HomeMidSection from "./homeMidSection/homeMidSection";
import HomeTopSection from "./homeTopSection/homeTopSection";
import { Col } from "react-bootstrap";

/** Home page */
const Home = () => {
  return (
    <Col className="px-lg-2">
      <h2 className="fw-bold p-lg-3 pb-0 text-center">
        The German Human Genome-Phenome Archive
      </h2>
      <Col className="px-lg-2">
        <h3 className="fw-bold pb-2 px-4 mx-2 text-quaternary">Data Portal</h3>
      </Col>
      <hr className="mx-lg-3 border-tertiary opacity-100" />
      <HomeTopSection />
      <HomeMidSection />
      <HomeBottomSection />
    </Col>
  );
};

export default Home;
