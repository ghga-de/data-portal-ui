import React from 'react';
import HeaderNavbar from './headerNavbar'
import { Container } from 'react-bootstrap'

/** Main header container of the site. It includes navigations. */
const Header = () => {
  return (
    <Container className='mw-100 mx-0 p-0'>
      <HeaderNavbar />
    </Container>
  )
}

export default Header;
