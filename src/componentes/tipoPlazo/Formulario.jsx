import React, { useState, useEffect } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {
  const [, guardarNuevoJson, obtenerUnicoRegistro, , , modificarRegistroJson] = Peticiones();
  const vacio = {
    "id": 0,
    "descripcion": "",
    "factor_divisor": 0,
    "dias_vencimiento": 0,
    "interes": ""
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      'descripcion': e.target.tipo_plazo.value,
      'factor_divisor': e.target.factor_divisor.value,
      'dias_vencimiento': e.target.dias_vencimiento.value,
      'interes': e.target.interes.value,
    }
    console.log(form)
    if (idSelec === "") {
      guardarNuevoJson('api/tipoPlazo', form).then(
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
      modificarRegistroJson('api/tipoPlazo', idSelec, form).then(
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
    setDatosPlazo(vacio)
  }

  const [datosPlazo, setDatosPlazo] = useState({
    "id": 0,
    "descripcion": "",
    "factor_divisor": "",
    "dias_vencimiento": "",
    "interes": ""
  })

  useEffect(() => {
    if (idSelec != "") {
      cargarForm()
    }
  }, [idSelec])


  const cargarForm = async () => {
    console.log(idSelec);
    let datosCrudo = (await obtenerUnicoRegistro('api/tipoPlazo/u', idSelec)).datos[0]
    console.log(datosCrudo, "datos solicitud")
    setDatosPlazo(datosCrudo)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Tipo Plazo<b class="fw-bold text-danger">*</b></Form.Label>
          <Form.Control type="text" id="tipo_plazo" defaultValue={datosPlazo.descripcion} required/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Factor divisor<b class="fw-bold text-danger">*</b></Form.Label>
          <Form.Control type="text" min="0" id="factor_divisor" defaultValue={datosPlazo.factor_divisor} required/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Dias Vencimiento<b class="fw-bold text-danger">*</b></Form.Label>
          <Form.Control type="number" min="0" id="dias_vencimiento" defaultValue={datosPlazo.dias_vencimiento} required/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Intereses<b class="fw-bold text-danger">*</b></Form.Label>
          <Form.Control type="decimal" min="0" id="interes" defaultValue={datosPlazo.interes} required/>
        </Form.Group>
      </Row>
      <Row>
        <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}
