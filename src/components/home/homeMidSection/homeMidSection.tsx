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

import { faCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faChartColumn,
  faDna,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getMetadataSummary } from "../../../api/browse";
import { MetadataSummaryModel } from "../../../models/dataset";
import { aggregateFileStats } from "../fileStats";
import HomeMidSectionBadge from "./homeMidSectionBadge";

/** Section on the home  page where Statistics are listed in cards (badges). */
const HomeMidSection = () => {
  const [summary, setSummary] = React.useState<MetadataSummaryModel | null>(
    null
  );

  React.useEffect(() => {
    const getData = () => {
      getMetadataSummary(setSummary);
    };
    getData();
  }, []);

  const BadgeTitleGen = (
    icon: IconDefinition,
    titleString: any,
    darkBadge: boolean = false
  ) => {
    return (
      <>
        <Row
          style={{ fontSize: "36px" }}
          className={
            "p-0 col-auto mb-2 " + (darkBadge ? "" : " text-secondary")
          }
        >
          <span className="fa-layers fa-fw fa-lg">
            <FontAwesomeIcon icon={faCircle} />
            <FontAwesomeIcon icon={icon} transform="shrink-8" />
          </span>
        </Row>
        <Row className="w-bold fs-5 ps-0">
          <span
            className={"text-center " + (darkBadge ? "" : "text-secondary")}
          >
            {titleString}
          </span>
        </Row>
      </>
    );
  };

  let Badges: {
    badgeTitle: any;
    badgeBody: any;
    bodyRowClasses?: string;
    bodyColClasses?: string;
    badgeClasses?: string;
    badgeDark?: boolean;
  }[] = [];

  if (summary !== null) {
    Badges.push({
      badgeTitle: (
        <Row className="w-bold fs-5 ps-0">
          <span className="text-center">Total Datasets:</span>
        </Row>
      ),
      badgeBody: (
        <NavLink
          to="/browse"
          style={{
            borderRadius: "50%",
            width: "9rem",
            height: "9rem",
            background: "linear-gradient(#e84614 5%, #CFE7CD 70%)",
          }}
          className="mx-auto d-block text-decoration-none"
        >
          <div
            style={{
              borderRadius: "50%",
              width: "7rem",
              height: "7rem",
              top: "1rem",
              left: "1rem",
              position: "relative",
            }}
            className="bg-white d-flex align-items-center"
          >
            <span className="w-100 text-center fs-1">
              {summary?.resource_stats?.Dataset?.count || 0}
            </span>
          </div>
        </NavLink>
      ),
      bodyRowClasses: "mt-4 pt-3 fs-7 align-items-center",
      bodyColClasses: "text-center",
      badgeDark: true,
    });

    const experimentMethods = summary?.resource_stats?.ExperimentMethod;
    const protocolTypes = experimentMethods?.stats?.instrument_model || [];
    Badges.push({
      badgeTitle: BadgeTitleGen(faDna, "Platforms: " + protocolTypes.length),
      badgeBody: (
        <table className="mx-auto w-auto">
          <tbody>
            {protocolTypes.map((x) => (
              <tr key={x.value}>
                <th className="text-end pe-2">{x.count}</th>
                <td>{x.value.replace(/_/g, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
      bodyColClasses: "pt-3 fs-7 align-items-center",
    });

    const individuals = summary?.resource_stats?.Individual;
    const numIndividuals = individuals?.count || 0;
    const individualSexes = individuals?.stats?.sex || [];
    Badges.push({
      badgeTitle: BadgeTitleGen(faUser, "Individuals: " + numIndividuals, true),
      badgeBody: (
        <table className="mx-auto w-auto">
          <tbody>
            {individualSexes.map((x) => {
              return (
                <tr key={x.value}>
                  <th className="text-end pe-2">{x.count}</th>
                  <td className="text-capitalize">{x.value.toLowerCase()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ),
      badgeDark: true,
      bodyColClasses: "pt-3 fs-7 align-items-center",
    });

    const fileStats = aggregateFileStats(summary);
    Badges.push({
      badgeTitle: BadgeTitleGen(faChartColumn, "Files: " + fileStats.count),
      badgeBody: (
        <table className="mx-auto w-auto">
          <tbody>
            {fileStats.stats.format.map((x) => (
              <tr key={x.value}>
                <th className="text-end pe-2">{x.count}</th>
                <td>{x.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
      bodyColClasses: "pt-3 fs-7 align-items-center",
    });
  }

  return (
    <Col className="px-2">
      <Row className="rounded bg-primary w-100 mx-0 mb-3 pb-lg-5">
        <h2 className="fw-bold fs-3 text-white p-4 pb-4 text-center text-lg-start">
          Statistics
        </h2>
        <div className="px-sm-3 px-xl-5 d-flex justify-content-evenly flex-wrap">
          {Badges.map((x, idx) => (
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="mb-4 mb-lg-0 px-2 px-xl-4 px-xxl-5"
              key={"home_page_badge_" + idx}
            >
              <HomeMidSectionBadge
                badgeTitle={x.badgeTitle}
                badgeBody={x.badgeBody}
                bodyRowClasses={x.bodyRowClasses}
                bodyColClasses={x.bodyColClasses}
                badgeClasses={x.badgeClasses}
                badgeDark={x.badgeDark}
              />
            </Col>
          ))}
        </div>
      </Row>
    </Col>
  );
};

export default HomeMidSection;
