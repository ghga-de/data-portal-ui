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

import FooterIcons from "./footerIcons";
import FooterNavbar from "./footerNavbar";
import { Buffer } from "buffer";

/** Website footer with secondary navigation */
const Footer = () => {
  const svgCode: string =
    '<svg width="1440" height="120" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1482 66.8182H1119.93C854.272 66.8182 592.376 0 364.5 0C136.624 0 -8 66.8182 -8 66.8182V120H1482V66.8182Z" fill="#fff"/></svg>';
  const svgEncoded: string = Buffer.from(svgCode).toString("base64");
  return (
    <footer>
      <FooterNavbar />
      <div
        style={{
          background: "url('data:image/svg+xml;base64," + svgEncoded + "')",
          height: "70px",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat no-repeat",
          backgroundPosition: "center bottom",
        }}
        className="bg-primary mw-100 w-100 mx-0"
      >
        &nbsp;
      </div>
      <div className="mx-auto">
        <FooterIcons></FooterIcons>
      </div>
    </footer>
  );
};

export default Footer;
