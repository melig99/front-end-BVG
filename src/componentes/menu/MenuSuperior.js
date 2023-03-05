import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const  MenuSuperior = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          {/* <img 
            alt=""
            src="/log.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}*/}
          <abbr><strong>B-VG </strong></abbr>
          <em>Book of Valdez Gimenez</em> 
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MenuSuperior;