import React, { useState } from 'react'
import {Form,Row, Col} from 'react-bootstrap';
import DatePicker from 'react-date-picker'


export const Formulario = () => {
  const [value, onChange] = useState(new Date());

  return(
    <Form >
      <div className='App'>
        <h3>Datos Personales</h3>
      </div>
      <Row className="g-2">
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nombres</Form.Label> 
          <Form.Control  />
        </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Apellidos</Form.Label> 
          <Form.Control  />
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2' >
            <Form.Label className='padding-left'>Tipo Documento</Form.Label> 
            <Form.Select defaultValue="">
              <option>CI</option>
              <option>RUC</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nro. Documento</Form.Label> 
          <Form.Control  />
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Barrio</Form.Label> 
          <Form.Control  />
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Direccion</Form.Label> 
          <Form.Control  />
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Estado Civil</Form.Label> 
            <Form.Control  />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Sexo</Form.Label> 
            <Form.Select defaultValue="">
                <option>Femenino</option>
                <option>Masculino</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Telefono</Form.Label> 
            <Form.Control  />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha Nacimiento</Form.Label> 

          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email"  />
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


