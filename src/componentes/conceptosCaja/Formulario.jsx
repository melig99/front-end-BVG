import React, { useState, useEffect } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {

  const [, guardarNuevoJson, obtenerUnicoRegistro, , , modificarRegistroJson] = Peticiones();
  const vacio = {
    "id": 0,
    "tipo": "",
    "descripcion": ""
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      'tipo': e.target.tipo.value,
      'descripcion': e.target.descripcion.value,
    }
    console.log(form)
    if (idSelec === "") {
      guardarNuevoJson('api/conceptoCaja', form).then(
        (a) => {
          if (a.cod == 0) {
            estadoForm(false)
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
      modificarRegistroJson('api/conceptoCaja', idSelec, form).then(
        (a) => {
          console.log(a.cod, " a.cod")
          if (a.cod == 0) {
            estadoForm(false)
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
    setDatosConcepto(vacio)
  }

  console.log("idselec: ", idSelec)

  const [datosConcepto, setDatosConcepto] = useState({
    "id": 0,
    "tipo": "",
    "descripcion": ""
  })

  console.log("conceptoCaja: " + JSON.stringify(datosConcepto))

  useEffect(() => {
    if (idSelec != "") {
      cargarForm()
    }
  }, [idSelec])


  const cargarForm = async () => {
    console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/conceptoCaja/u', idSelec)).datos[0]
    console.log(datosCrudo, "datos solicitud")
    setDatosConcepto(datosCrudo)
  }



  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Tipo<b className="fw-bold text-danger">*</b></Form.Label>
          <Form.Select id="tipo" defaultValue={datosConcepto.tipo}>
            <option>Seleccione Opción...</option>
            <option value="ENTRADA" selected={(datosConcepto.tipo == "ENTRADA")}>ENTRADA</option>
            <option value="SALIDA" selected={(datosConcepto.tipo == "SALIDA")}>SALIDA</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Descripción<b className="fw-bold text-danger">*</b></Form.Label>
          <Form.Control
            required
            defaultValue={datosConcepto.descripcion}
            id="descripcion"
            as="textarea"
            style={{ height: '100px' }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}
