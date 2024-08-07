interface BoldenedProps {
  x: { value: string; count: number };
}

/** Split x string at ": " and render the second part in bold. */
const BoldenedSummaryDetails = (props: BoldenedProps) => {
  return (
    <div>
      {props.x.value.replace(/_/g, " ")} <strong>{props.x.count}</strong>
    </div>
  );
};

export default BoldenedSummaryDetails;
