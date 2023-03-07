import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {CgProfile, CgKey ,CgLogOff} from "react-icons/cg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const  MenuSuperior = () => {
  return (
    <div style={{width: "100%", backgroundColor: "#154360"}}>
      <Navbar >
        <Container className="justify-content-end" >
            <Nav >
              {/* <NavDropdown textColor="#fff" title="Cerrar Sesion" id="dropdown-button-drop-start">
                <NavDropdown.Item href="/Login" ><CgProfile className='m-2 item'/>Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Login"><CgKey className='m-2 item'/>Configuracion</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Login"><CgLogOff className='m-2 item'/>Salir</NavDropdown.Item>
              </NavDropdown> */}

              {/* <DropdownButton
                as={ButtonGroup}
                key="start"
                id={`dropdown-button-drop-start`}
                drop="start"
                variant="link"
                title={`Cerrar Sesion `}

              >
                <Button variant="info">mix it up style-wise</Button>
                <Dropdown.Item><CgProfile className='m-2 item'/>Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item ><CgKey className='m-2 item'/>Configuracion</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item ><CgLogOff className='m-2 item'/>Salir</Dropdown.Item>
              </DropdownButton> */}

             <Dropdown as={ButtonGroup}>
                <Button variant="link" style={{ color: "white", textDecoration: "none"}}>Cerrar Sesion</Button>
                <Dropdown.Toggle split variant="link" id="dropdown-custom-2" style={{ color: "white", textDecoration: "none"}}/>
                <Dropdown.Menu className="super-colors">
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none"}} href="/home"><CgProfile className='m-1 item'/>Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none"}} href="/home"><CgKey className='m-1 item' />Configuracion</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none"}} href="/home"><CgLogOff className='m-1 item'/>Salir</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
        </Container>
      </Navbar>

    </div>
  );
}

export default MenuSuperior;