import React , { useState }from 'react'
import {Form,Row, Col} from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Formulario = ({almacenDatos}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return(
    <Form >
      <Row className="g-2">
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nombres</Form.Label>
          <Form.Control placeholder="Ingrese nombres" id="nombre" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Apellidos</Form.Label>
          <Form.Control  placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}}/>
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2' >
            <Form.Label className='padding-left'>Tipo Documento</Form.Label>
            <Select
              defaultValue={selectedOption}
              onChange={(a)=>{setSelectedOption(a);almacenDatos(a.value)}}
              options={options}
              placeholder="Buscar tipo documento"
              id= "id_tipo_doc"
            />
          </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nro. Documento</Form.Label>
          <Form.Control  placeholder="Ingrese numero documento" id="nro_doc" onChange={(e)=>{almacenDatos(e)}}/>
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
              id= "barrio"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-2'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email"  placeholder="mail@mail.com" id="mail" onChange={(e)=>{almacenDatos(e)}}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Direccion</Form.Label>
          <Form.Control placeholder="Ingrese direccion" id="direccion" onChange={(e)=>{almacenDatos(e)}}/>
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
              id="estado_civil"
           />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Sexo</Form.Label>
            <Form.Select defaultValue="" id="sexo" onChange={(e)=>{almacenDatos(e)}}>
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
            <Form.Control placeholder="Ingrese telefono" id="telefono" onChange={(e)=>{almacenDatos(e)}}/>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha Nacimiento</Form.Label>
            <Form.Control type="date" id="fecha_nacimiento" onChange={(e)=>{almacenDatos(e)}}/>
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
            id="observacion"
            onChange={(e)=>{almacenDatos(e)}}
          />
        </Form.Group>
      </Row>
    </Form>
  )
}
