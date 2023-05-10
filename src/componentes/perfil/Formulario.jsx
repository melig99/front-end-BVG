import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Table from 'react-bootstrap/Table';


export const Formulario = ({ cambiarModalAlerta, idSelec }) => {
  const [listaOpcionMenu, setListaOpcionMenu] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [, guardarNuevoJson, obtenerUnicoRegistro, , endpointLibre, modificarRegistroJson] = Peticiones();
  const vacio = {
    "id": 0,
    "nombre": "",
    "observacion": ""
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      'nombre': e.target.nombre.value,
      'observacion': e.target.observacion.value,
    }
    console.log(form)
    if (idSelec === "") {
      guardarNuevoJson('api/barrio', form).then(
        (a) => {
          if (a.cod == 0) {
            console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");
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
      modificarRegistroJson('api/barrio', idSelec, form).then(
        (a) => {
          console.log(a.cod, " a.cod")
          if (a.cod == 0) {
            console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");

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
    e.target.reset();
    setDatosBarrio(vacio)
  }

  console.log("idselec: ", idSelec)

  const [datosBarrio, setDatosBarrio] = useState({
    "id": 0,
    "nombre": "",
    "observacion": ""
  })

  console.log("barrio: " + JSON.stringify(datosBarrio))

  useEffect(() => {
    if (idSelec != "") {
      cargarForm()
    }
  }, [idSelec])


  const cargarForm = async () => {
    console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/barrio/u', idSelec)).datos[0]
    console.log(datosCrudo, "datos solicitud")
    setDatosBarrio(datosCrudo)
  }

  useEffect(() => {
    cargarListas()
  }, []);

  const cargarListas = async () => {
    //Extrae Datos de la BD para Opcion Menu y Agrupadores
    let options = (await endpointLibre("api/opcionMenu", "GET")).datos
    setListaOpcionMenu(ordenarTabla(options))
  }


  const ordenarTabla = (optiones) => {
    const arrays = []
    let dscAg = 0
    for (let i in optiones) {
      if (dscAg != optiones[i].dsc_id) {
        dscAg = optiones[i].dsc_id
        arrays.unshift({ "Agrupador": optiones[i].dsc_agrupador, "cont": 1, "Opciones": [{ "descripcion": optiones[i].descripcion }] })
      } else {
        arrays[0].cont++
        arrays[0].Opciones.push({ "descripcion": optiones[i].descripcion })
      }
    }
    return arrays
  }

  console.log("contador", listaOpcionMenu)

  return (
    <Tabs defaultActiveKey="perfil" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="perfil" title="Perfil">
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Nombre del perfil</Form.Label>
                <Form.Control type="text" id="descripcion" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Observacion</Form.Label>
                <Form.Control
                  id="observacion"
                  as="textarea"
                  style={{ height: '100px' }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Tab>
      <Tab eventKey="accesos" title="Accesos">
        <Form onSubmit={handleSubmit}>
          <Table bordered>
            <thead>
              <tr>
                <th>Agrupadores</th>
                <th>Opcion de menu</th>
                <th>Accesos</th>
              </tr>
            </thead>
            <tbody>
              {listaOpcionMenu.map((fila) => {
                return (
                  <>
                    <tr key={fila.Agrupador} >
                      <td rowSpan={fila.cont + 1}  >{fila.Agrupador}</td>
                    </tr>
                    {fila.Opciones.map((filas) => {
                      return (
                        <tr>
                          <td>{filas.descripcion}</td>
                          <td><Form.Check type="switch" /> </td>
                        </tr>
                      )
                    })}
                  </>
                )
              })}
            </tbody>
          </Table>

          {/* <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={4}>Juan</td>
              </tr>
              <tr>
                <td>Pérez</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Gómez</td>
                <td>25</td>
              </tr>
              <tr>
                <td>González</td>
                <td>28</td>
              </tr>
            </tbody>
          </Table> */}
        </Form>
        <Row>
          <Button type='submit' variant="success" >Guardar</Button>
        </Row>
      </Tab>
    </Tabs>
  )
}
