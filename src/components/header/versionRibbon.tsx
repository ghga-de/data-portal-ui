import { useState } from "react";

const VERSION = process.env.REACT_APP_VERSION || '?';
const TEXT = (process.env.REACT_APP_BANNER_TEXT || '').replace('$v', VERSION);

/** Corner ribbon for showing staging and version info. */
const VersionRibbon = () => {
  const [show, setShow] = useState(!!TEXT);

  const click = () => setShow(false);

  return show ? (
    <div className="version-ribbon" onClick={click}>
      <span>{TEXT}</span>
    </div>
  ) : null;
}

export default VersionRibbon;
