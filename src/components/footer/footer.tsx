import React from 'react';
import { Container } from 'react-bootstrap';
import FooterIcons from './footerIcons';
import FooterNavbar from './footerNavbar';

const Footer = () => {
  return (
    <>
    <FooterNavbar />
    <Container>
      <FooterIcons></FooterIcons>
    </Container>
    </>
  )
}

export default Footer;
