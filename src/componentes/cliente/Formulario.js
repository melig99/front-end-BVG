import React, { Fragment } from 'react'
import {Form,Row} from 'react-bootstrap';


export const Formulario = () => {
    return(
     <Form >
        <div className='App'>
          <h3>Datos Personales</h3>
        </div>
        <Row>
          <Form.Group className='mb-2' >
            <Form.Label className='padding-left'>Documento</Form.Label> 
            <Form.Control/>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Nombres y Apellidos</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Barrio</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Direccion</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Estado Civil</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Sexo</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha Nacimiento</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Telefono</Form.Label> 
            <Form.Control  />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email"  />
          </Form.Group>
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


