import React, { useState, useEffect } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({ cambiarModalAlerta, idSelec }) => {

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
      modificarRegistroJson('api/conceptoCaja', idSelec, form).then(
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
          <Form.Label>Tipo</Form.Label>
          <Form.Select id="tipo"  value={datosConcepto.tipo}>
            <option>Seleccione Opcion...</option>
            <option>ENTRADA</option>
            <option>SALIDA</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
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
