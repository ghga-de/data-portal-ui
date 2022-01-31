import React from 'react';
import HeaderNavbar from './headerNavbar'
import { Container } from 'react-bootstrap'

const Header = () => {
  return (
    <Container className='sticky-top border-bottom mw-100 mx-0 mb-4'>
      <HeaderNavbar />
    </Container>
  )
}

export default Header;
