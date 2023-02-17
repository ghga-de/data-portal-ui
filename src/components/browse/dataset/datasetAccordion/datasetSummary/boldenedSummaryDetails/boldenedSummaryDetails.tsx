interface BoldenedProps {
  x : string;
}

/** Split x string at ": " and render the second part in bold. */
const BoldenedSummaryDetails = (props : BoldenedProps) => {
  return (
    <div>
      {props.x.substring(0, props.x.lastIndexOf(": ") + 1)}{" "}
      <strong>{props.x.substring(props.x.lastIndexOf(": ") + 1, props.x.length)}</strong>
    </div>
  );
};

export default BoldenedSummaryDetails;
