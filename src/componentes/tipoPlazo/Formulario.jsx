import React from 'react'
import {Form,Row} from 'react-bootstrap';


export const Formulario = ({almacenDatos}) => {


  return(
    <Form >
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Tipo Plazo</Form.Label>
          <Form.Control type="text" id="tipo_plazo" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Factor divisor</Form.Label>
          <Form.Control type="number" min="0" id="factor_divisor" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Dias Vencimiento</Form.Label>
          <Form.Control type="number" min="0" id="dias_vencimiento" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Intereses</Form.Label>
          <Form.Control type="number" min="0" id="interes" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
      </Row>
    </Form>
  )
}