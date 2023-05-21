import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Select from 'react-select';
import { TiLockClosedOutline } from "react-icons/ti";


export const Formulario = ({ cambiarModalAlerta, idSelec }) => {
  const [listaPerfil, setListaPerfil] = useState([])
  const [selectedOption, setSelectedOption] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [, guardarNuevoJson, obtenerUnicoRegistro, , endpointLibre, modificarRegistroJson] = Peticiones();
  const vacio = {
    "nombre_usuario": "",
    "nombre": "",
    "apellido": "",
    "cedula": "",
    "password": "",
    "fecha_nacimiento": "",
    "email": "",
    "perfil_id": 0,
  }

  useEffect(() => {
    cargarListas();
  }, []);

  const cargarListas = async () => {
    //Extrae Datos de la BD para Perfil
    let variable = []
    let options = await endpointLibre("api/perfil", "GET")
    for (let i of options?.datos) {
      variable.push({ 'label': i.descripcion, 'value': i.id })
    }
    console.log("variable ",variable)
    setListaPerfil(variable)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      "nombre_usuario": e.target.nombre_usuario.value,
      "nombre": e.target.nombre.value,
      "apellido": e.target.apellido.value,
      "cedula": e.target.cedula.value,
      "password": e.target.pass.value,
      "fecha_nacimiento": e.target.fecha_nacimiento.value,
      "email": e.target.email.value,
      "perfil_id": e.target.perfil_id.value,
    }
    console.log(form)
    if (idSelec === "") {
      guardarNuevoJson('api/usuario', form).then(
        (a) => {
          if (a.cod == 0) {
            console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");
            e.target.reset();
          } else {
            console.log(a)
            cambiarModalAlerta(a.msg);
          }
        }
      ).catch(
        (e) => {
          console.log(e)
          cambiarModalAlerta(e.msg);
        }
      )
    } else {
      modificarRegistroJson('api/usuario', idSelec, form).then(
        (a) => {
         //  console.log(a.cod, " a.cod")
          if (a.cod == 0) {
            console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");
            e.target.reset();
          } else {
            console.log(a)
            cambiarModalAlerta(a.msg);
          }
        }
      ).catch(
        (a) => {
          console.log(a)
          cambiarModalAlerta(a.msg);
        }
      )
    }

    setDatosPerfil(vacio)
  }

  console.log("idselec: ", idSelec)


  const [datosPerfil, setDatosPerfil] = useState({
    "nombre_usuario": "",
    "nombre": "",
    "apellido": "",
    "cedula": "",
    "password": "",
    "fecha_nacimiento": "",
    "email": "",
    "perfil_id": 0,
    "restablecer_pass": true
  })

  console.log("usuario: " + JSON.stringify(datosPerfil))

  useEffect(() => {
    if (idSelec != "") {
      cargarForm()
    }
  }, [idSelec])


  const cargarForm = async () => {
    console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/usuario/u', idSelec)).datos[0]
    console.log(datosCrudo, "datos solicitud")
    setDatosPerfil(datosCrudo)
  }


  const obtenerPerfil = () => {
    for (const key in listaPerfil) {
      if ((datosPerfil.perfil_id === listaPerfil[key].value)){
        return listaPerfil[key]
        setSelectedOption(null)
      }
    }

  }

  console.log("aaaa ",obtenerPerfil())
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Nombres </Form.Label>
            <Form.Control type="text" placeholder="Ingrese sus nombres" id="nombre" defaultValue={datosPerfil.nombre} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Apellidos </Form.Label>
            <Form.Control type="text" placeholder="Ingrese sus apellidos" id="apellido" defaultValue={datosPerfil.apellido} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Cedula </Form.Label>
            <Form.Control type="text" placeholder="Ingrese una cedula" id="cedula" defaultValue={datosPerfil.cedula} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha de nacimiento </Form.Label>
            <Form.Control type="date" id="fecha_nacimiento" defaultValue={datosPerfil.fecha_nacimiento} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Correo </Form.Label>
            <Form.Control type="email" placeholder="correo@correo.com" id="email" defaultValue={datosPerfil.email} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Perfil </Form.Label>
            <Select
              name="perfil_id"
              id="perfil_id"
              onChange={setSelectedOption}
              options={listaPerfil}
              isClearable={true}
              placeholder="Buscar Perfil"

              
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Nombre de usuario </Form.Label>
            <Form.Control type="text" placeholder="Ingrese un nombre de usuario" id="nombre_usuario" defaultValue={datosPerfil.nombre_usuario} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Contraseña </Form.Label>
            <Form.Control
              type={showPass ? "text" : "password"}
              placeholder="Ingrese una contraseña"
              id="pass"
              defaultValue={datosPerfil.pass}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}
