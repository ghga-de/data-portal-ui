import { Container } from 'react-bootstrap'

import HeaderNavbar from './headerNavbar'
import VersionRibbon from './versionRibbon';

/** Main header container of the site. It includes navigations. */
const Header = () => {
  return (
    <Container className='mw-100 mx-0 p-0'>
      <HeaderNavbar />
      <VersionRibbon />
    </Container>
  )
}

export default Header;
