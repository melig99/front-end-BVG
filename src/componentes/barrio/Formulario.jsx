import React from 'react'
import {Form,Row} from 'react-bootstrap';


export const Formulario = ({almacenDatos}) => {


  return(
    <Form >
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Barrio</Form.Label>
          <Form.Control type="text" id="nombre" onChange={(e)=>{almacenDatos(e)}} />
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Observacion</Form.Label>
          <Form.Control
            id="observacion"
            as="textarea"
            style={{ height: '100px' }}
            onChange={(e)=>{almacenDatos(e)}}
          />
        </Form.Group>
      </Row>
    </Form>
  )
}
