import React , { useState }from 'react'
import {Form,Row, Col} from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Formulario = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return(
    <Form >
      <Row className="g-2">
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nombres</Form.Label>
          <Form.Control placeholder="Ingrese nombres" />
        </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Apellidos</Form.Label>
          <Form.Control  placeholder="Ingrese apellidos"/>
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2' >
            <Form.Label className='padding-left'>Tipo Documento</Form.Label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Buscar tipo documento"
            />
          </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nro. Documento</Form.Label>
          <Form.Control  placeholder="Ingrese numero documento"/>
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col>
          <Form.Group className='mb-2'>
            <Form.Label>Barrio</Form.Label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Buscar barrio"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-2'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email"  placeholder="mail@mail.com"/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Direccion</Form.Label>
          <Form.Control placeholder="Ingrese direccion" />
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Estado Civil</Form.Label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Buscar estado civil"
           />
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
            <Form.Control placeholder="Ingrese telefono" />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha Nacimiento</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">

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
