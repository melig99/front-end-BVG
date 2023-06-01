import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Table from 'react-bootstrap/Table';


export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {
  const [listaOpcionMenu, setListaOpcionMenu] = useState([])
  const [listaAccesos, setListaAccesos] = useState([])
  const [, guardarNuevoJson, obtenerUnicoRegistro, , endpointLibre, modificarRegistroJson] = Peticiones();
  const [isEnabled, setIsEnabled] = useState(true);
  const vacio = {
    "descripcion": "",
    "observacion": "",
    "accesos": []
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      "descripcion": e.target.descripcion.value,
      "observacion": e.target.observacion.value,
      "accesos": listaAccesos,
    }
    if (form.observacion == "") {
      delete form.observacion
    }
    console.log(form.observacion)
    if (idSelec === "") {
      guardarNuevoJson('api/perfil', form).then(
        (a) => {
          if (a.cod == 0) {
            estadoForm(false)
            // console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");
            e.target.reset();
          } else {
            // console.log(a)
            cambiarModalAlerta(a.msg);
          }
        }
      ).catch(
        (e) => {
          // console.log(e)
          cambiarModalAlerta(e.msg);
        }
      )
    } else {
      modificarRegistroJson('api/perfil', idSelec, form).then(
        (a) => {
          // console.log(a.cod, " a.cod")
          if (a.cod == 0) {
            estadoForm(false)
            // console.log(a, "Guardado correctamente")
            cambiarModalAlerta("Guardado Correctamente");

          } else {
            // console.log(a)
            cambiarModalAlerta(a.msg);
          }
        }
      ).catch(
        (a) => {
          // console.log(a)
          cambiarModalAlerta(a.msg);
        }
      )
    }
    setDatosPerfil(vacio)
  }

  const seleccionarAccesos = (e) => {
    let temp = listaAccesos;
    if (e.target.checked) {
      // console.log(e.target.value)
      let test = { "opcion_id": e.target.value, "acceso": true }
      temp.push(test);
      setListaAccesos(temp)
    } else {
      temp = temp.filter((fila) => fila.opcion_id != e.target.value);
      setListaAccesos(temp)
    }
    // console.log("listaAccesos ", listaAccesos);
  }

  console.log("idselec: ", idSelec)

  const [datosPerfil, setDatosPerfil] = useState({
    "descripcion": "",
    "observacion": "",
    "accesos": []
  })

  console.log("barrio: " + JSON.stringify(datosPerfil))

  useEffect(() => {
    if (idSelec != "") {
      cargarForm()
    }
  }, [idSelec])


  const cargarForm = async () => {
    setIsEnabled(false)
    // console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/perfil/u', idSelec)).datos[0]
    // console.log(datosCrudo, "datos crudo")
    let arrays = []
    datosCrudo.accesos.map( item => {
      if(item.acceso){
        arrays.push( { "opcion_id": item.opcion_id, "acceso": true })
      }
    })
    setListaAccesos(arrays)
    setDatosPerfil(datosCrudo)

  }

  useEffect(() => {
    cargarListas()
  }, []);

  const cargarListas = async () => {
    //Extrae Datos de la BD para Opcion Menu y Agrupadores
    let options = (await endpointLibre("api/opcionMenu", "GET")).datos
    // console.log(options)
    setListaOpcionMenu(ordenarTabla(options))
  }

  // si es que la opcion que se recorre esta como true cagar 
  const ordenarTabla = (optiones) => {
    const arrays = []
    let dscAg = 0
    for (let i in optiones) {
      if (dscAg != optiones[i].dsc_id) {
        dscAg = optiones[i].dsc_id
        arrays.unshift({ "Agrupador": optiones[i].dsc_agrupador, "cont": 1, "Opciones": [{ "descripcion": optiones[i].descripcion, "id": optiones[i].id }] })
      } else {
        arrays[0].cont++
        arrays[0].Opciones.push({ "descripcion": optiones[i].descripcion, "id": optiones[i].id })
      }
    }
    return arrays
  }


  return (
    <Tabs defaultActiveKey="perfil" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="perfil" title="Perfil">
        <Form id="formGeneral" onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md>
              <Form.Group className='mb-2'>
                <Form.Label>Nombre del perfil</Form.Label>
                <Form.Control type="text" id="descripcion" defaultValue={datosPerfil.descripcion} disabled={!isEnabled} />
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
                  defaultValue={datosPerfil.observacion} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Tab>
      <Tab eventKey="accesos" title="Accesos">
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
                        <td>
                          <Form.Check
                            type="switch"
                            id={`opcion-${filas.id}`}
                            value={filas.id}
                            onChange={seleccionarAccesos}
                            defaultChecked={datosPerfil.accesos.some(acceso => acceso.opcion_id === filas.id && acceso.acceso)}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </>
              )
            })}
          </tbody>
        </Table>
        <Row>
          <Button type='submit' variant="success" form="formGeneral" >Guardar</Button>
        </Row>
      </Tab>
    </Tabs>
  )
}
