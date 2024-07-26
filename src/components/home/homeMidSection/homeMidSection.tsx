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

    const protocolTypes =
      summary?.resource_stats?.ExperimentMethod?.stats?.instrument_model || [];
    Badges.push({
      badgeTitle: BadgeTitleGen(faDna, "Platforms: " + protocolTypes.length),
      badgeBody: protocolTypes.map((x: any) => (
        <Row key={x.value} className="text-capitalize ms-0 ps-0 mb-2 w-100">
          <Col className="ms-0 ps-0">{x.value}:</Col>
          <Col className="col-auto text-end fw-bold pe-0">{x.count}</Col>
        </Row>
      )),
      bodyRowClasses: "pt-3 fs-7",
    });

    const individuals = summary?.resource_stats?.Individual;
    const numIndividuals = individuals?.count || 0;
    const individualSexes = individuals?.stats?.sex || [];
    Badges.push({
      badgeTitle: BadgeTitleGen(faUser, "Individuals: " + numIndividuals, true),
      badgeBody: (
        <div>
          <Row className="mt-3 w-100 px-0 mx-0">
            {individualSexes.map((x, i) => {
              const sex = /FEMALE/.test(x.value) ? "Female" : "Male";
              return (
                <Col key={i} className="text-center mb-4 ps-1 text-capitalize">
                  {sex}
                  :&nbsp;
                  <strong>{x.count}</strong>
                </Col>
              );
            })}
          </Row>
        </div>
      ),
      badgeDark: true,
    });

    const fileStats = aggregateFileStats(summary);
    Badges.push({
      badgeTitle: BadgeTitleGen(faChartColumn, "Files: " + fileStats.count),
      badgeBody: (
        <table>
          <tbody>
            {fileStats.stats.format.map((x) => {
              return (
                <tr key={x.value} className="text-uppercase ms-0 ps-0">
                  <td
                    className="ms-0 ps-3 pe-4"
                    style={{ width: "1px", whiteSpace: "nowrap" }}
                  >
                    {x.value}:
                  </td>
                  <td className="fw-bold">{x.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ),
      bodyColClasses: "pt-3 fs-7 align-items-center",
    });
  }

  return (
    <Col className="px-2">
      <Row className="rounded bg-primary w-100 mx-0 mb-3 px-sm-3 px-xl-5 pb-lg-5 justify-content-evenly">
        <h4 className="fw-bold fs-2 text-white p-4 pb-4 mx-4">Statistics</h4>
        {Badges.map((x, idx) => (
          <Col
            xs={12}
            sm={6}
            lg={3}
            className="mb-4 mb-lg-0 px-xl-4 px-xxl-5"
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
      </Row>
    </Col>
  );
};

export default HomeMidSection;
