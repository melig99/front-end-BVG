import React , { useState, useEffect }from 'react'
import {Form,Row,Col,Tab,Tabs,Table} from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';

export const Formulario = ({almacenDatos}) => {


    return(
        <Form >
            <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="solicitud" title="Solicitud">
                  <Row className="g-2">
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cliente</Form.Label>
                              <Form.Control placeholder="Ingrese nombres" id="nombre" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>

                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Ingresos Actuales</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>

                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Monto Credito</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Gastos Administrativos</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Tipo Plazo</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Interes</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Interes Moratorio</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}} disabled/>
                          </Form.Group>
                      </Col>
                  </Row>
              </Tab>
              <Tab eventKey="refPersonal" title="Referencia Personal">
                  <Row className="g-2">
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cliente</Form.Label>
                              <Form.Control placeholder="Ingrese cedula" id="nombre" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                          <thead className="table-dark">
                              <tr >
                                  <th>Cedula</th>
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                              </tr>
                          </thead>
                          <tbody>
                          </tbody>
                      </Table>
                  </Row>
              </Tab>
              <Tab eventKey="refComercial" title="Referencia Comercial">
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Entidad</Form.Label>
                              <Form.Control placeholder="Ingrese nombres" id="nombre" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Estado</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Monto cuota</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cuotas Pendientes</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cuotas Totales</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}}/>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                          <thead className="table-dark">
                              <tr >
                                  <th>Cedula</th>
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                              </tr>
                          </thead>
                          <tbody>
                          </tbody>
                      </Table>
                  </Row>
              </Tab>
              <Tab eventKey="cuotero" title="Cuotero">

              </Tab>
            </Tabs>
        </Form>
    )
}
