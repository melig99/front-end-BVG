import React from 'react'
import {Form,Row} from 'react-bootstrap';


export const Formulario = () => {


  return(
    <Form >
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Barrio</Form.Label>
          <Form.Control  />
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Observacion</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
          />
        </Form.Group>
      </Row>
    </Form>
  )
}