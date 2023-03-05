import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


const  MenuSuperior = () => {
  return (
    <div style={{width: "100%", backgroundColor: "#154360"}}>
      <Navbar >
        <Container className="justify-content-end"  >
            <Nav  >
              <NavDropdown title="Cerrar Sesion" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Container>
      </Navbar>

    </div>
  );
}

export default MenuSuperior;