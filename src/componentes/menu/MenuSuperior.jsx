import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CgProfile, CgKey, CgLogOff } from "react-icons/cg";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import localBD from '../../helpers/localBD';


const MenuSuperior = () => {
  const barco = useNavigate();
  const { obtenerUsuario, cerrarSesion } = localBD()
  const [usuario, setUsuario] = useState({ "nombre": "", "usuario": "", "perfil": "" })
  useEffect(() => {
    try {
      let temp = obtenerUsuario()
      console.log(temp);
      setUsuario(temp);
    } catch (e) {
      console.error("error al logueo", e)
      cerrarSesion()
      barco("/login")
    } finally {

    }
  }, [])

  const salir = async () => {
    let temp = await cerrarSesion();
    if(temp){
      barco("/login")
    }
  }

  const perfil = async () => {
    barco("/home/vistaPerfil")
  }

  const constrasenha = async () => {
    barco("/home/restablecerContrasenha")
  }
  return (
    <div style={{ width: "100%", backgroundColor: "#154360" }}>
      <Navbar >
        <Container className="justify-content-end" >
          <Nav >

            <Dropdown as={ButtonGroup} drop="start">
              <Dropdown.Toggle split variant="link" id="dropdown-custom-2" style={{ color: "white", textDecoration: "none" }} />
              <Button variant="link" style={{ color: "white", textDecoration: "none" }}>{usuario.nombre}</Button>
              <Dropdown.Menu className="super-colors">
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none" }} onClick={perfil}><CgProfile className='m-1 item' />Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none" }} onClick={constrasenha}><CgKey className='m-1 item' />Cambiar Contraseña</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item style={{ color: "#154360", textDecoration: "none" }} onClick={salir}><CgLogOff className='m-1 item' />Salir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

    </div>
  );
}

export default MenuSuperior;
