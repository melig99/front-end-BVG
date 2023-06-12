import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Select from 'react-select';
import { TiLockClosedOutline } from "react-icons/ti";


export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {
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

  useEffect(() => {
    cargarListas();
    if (idSelec != "") {
      cargarForm()
    }
  }, []);

  const cargarListas = async () => {
    //Extrae Datos de la BD para Perfil
    let variable = []
    let options = await endpointLibre("api/perfil", "GET")
    for (let i of options?.datos) {
      variable.push({ 'label': i.descripcion, 'value': i.id })
    }
    console.log("variable ", variable)
    setListaPerfil(variable)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      "nombre_usuario": e.target.nombre_usuario.value,
      "nombre": e.target.nombre.value,
      "apellido": e.target.apellido.value,
      "cedula": e.target.cedula.value,
      "fecha_nacimiento": e.target.fecha_nacimiento.value,
      "email": e.target.email.value,
      "perfil_id": e.target.perfil_id.value,
    }
    if (idSelec == "") {
      form["password"] = e.target.pass.value,
        form["password_confirmation"] = e.target.password_confirmation.value
    }
    if(form.password !== form.password_confirmation){
			cambiarModalAlerta("Las contraseñas no coinciden");
			return
		}
    console.log(form)
    if (idSelec === "") {
      guardarNuevoJson('api/usuario', form).then(
        (a) => {
          if (a.cod == 0) {
            //estadoForm(false)
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
            //estadoForm(false)
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

  const cargarForm = async () => {
    console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/usuario/u', idSelec)).datos[0]
    console.log(datosCrudo, "datos solicitud")
    console.log({ 'label': datosCrudo.perfil.descripcion, 'value': datosCrudo.perfil.id })
    setSelectedOption({ 'label': datosCrudo.perfil.descripcion, 'value': datosCrudo.perfil.id })
    setDatosPerfil(datosCrudo)
  }


  const obtenerPerfil = () => {
    for (const key in listaPerfil) {
      if ((datosPerfil.perfil_id === listaPerfil[key].value)) {
        return listaPerfil[key]
        setSelectedOption(null)
      }
    }

  }

  return (
    <Form onSubmit={handleSubmit}>
      {idSelec != 1 &&
        <>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Nombres<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="text" placeholder="Ingrese sus nombres" id="nombre" defaultValue={datosPerfil.nombre} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Apellidos<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="text" placeholder="Ingrese sus apellidos" id="apellido" defaultValue={datosPerfil.apellido} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Cédula<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="text" placeholder="Ingrese una cedula" id="cedula" defaultValue={datosPerfil.cedula} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Fecha de nacimiento<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="date" id="fecha_nacimiento" defaultValue={datosPerfil.fecha_nacimiento} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Correo<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="email" placeholder="correo@correo.com" id="email" defaultValue={datosPerfil.email} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Perfil<b class="fw-bold text-danger">*</b></Form.Label>
                <Select
                  name="perfil_id"
                  id="perfil_id"
                  onChange={setSelectedOption}
                  options={listaPerfil}
                  value={selectedOption}
                  isClearable={true}
                  placeholder="Buscar Perfil"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Nombre de usuario<b class="fw-bold text-danger">*</b></Form.Label>
                <Form.Control type="text" placeholder="Ingrese un nombre de usuario" id="nombre_usuario" defaultValue={datosPerfil.nombre_usuario} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mb-2'>
                {idSelec == "" &&
                  <>
                    <Form.Label>Contraseña<b class="fw-bold text-danger">*</b></Form.Label>
                    <Form.Control
                      required
                      type={showPass ? "text" : "password"}
                      placeholder="Ingrese una contraseña"
                      id="pass"
                      minlength="6"
                    />
                  </>
                }
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mb-2'>
                {idSelec == "" &&
                  <>
                    <Form.Label>Confirmar contraseña<b class="fw-bold text-danger">*</b></Form.Label>
                    <Form.Control
                      required
                      type={showPass ? "text" : "password"}
                      placeholder="Confirme su contraseña"
                      id="password_confirmation"
                      name="password_confirmation"
                      minlength="6"
                    />
                  </>
                }
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button type='submit' variant="success" >Guardar</Button>
          </Row>

        </>
      }
      {
        idSelec === 1 &&
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
          <h4 style={{ color: '#333', fontSize: '18px' }}>¡No se puede editar el usuario!</h4>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>El usuario administrador es registro predeterminado del sistema</p>
        </div>
      }
    </Form>
  )
}
