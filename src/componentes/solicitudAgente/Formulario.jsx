import React , { useState, useEffect }from 'react'
import {Form,Row,Col,Tab,Tabs,Table,Button,Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import {Formulario as FormularioCliente} from '../cliente/Formulario'
import {ModalAlerta,ModalConfirmacion} from '../Utiles';

export const Formulario = ({cambiarModalAlerta,idSeleccionado}) => {

    const [listaCliente,setListaCliente] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [listaTipoPlazo,setListaTipoPlazo] = useState([])
    const [,guardarNuevoJson,,,endpointLibre ] = Peticiones();
    const [estadoForm,setEstadoForm] = useState(false);

    
    useEffect(()=>{
        cargarListas();
    },[]);
    
    const cargarListas = async()=>{
        //Extrae Datos de la BD para CLIENTE
        let variable = []
        let options =  await endpointLibre("api/cliente","GET")
        for (let i of options.datos){
        variable.push({'label':i.nombre,'value':i.id})
        }
        console.log(variable)
        setListaCliente (variable)
        //Extrae Datos de la BD para TIPO DOCUMENTO
        variable = [];
        options =  await endpointLibre("api/tipoPlazo","GET")
        for (let i of options.datos){
        variable.push({'label':i.descripcion,'value':i.id})
        }
        console.log(variable)
        setListaTipoPlazo (variable)
    }


    

    return(
        <Form >
            <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="solicitud" title="Solicitud">
                  <Row className="g-2">
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cliente</Form.Label>
                              <Select
                                name="cliente"
                                id="cliente"
                                defaultValue={listaCliente[0] }
                                onChange={setSelectedOption}
                                options={listaCliente}
                                isClearable = {true}
                                placeholder="Buscar cliente"
                                />
                          </Form.Group>
                      </Col>
                      <Col md>
                           <Button variant="primary" onClick={()=>setEstadoForm(!estadoForm)}>Nuevo Cliente</Button>
                      </Col>
                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Ingresos Actuales (Mensuales)</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" />
                          </Form.Group>
                      </Col>

                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Monto Credito</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Gastos Administrativos</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" />
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Tipo Plazo</Form.Label>
                                <Form.Select defaultValue="" id="tipo_plazo">
                                   { listaTipoPlazo.map(valor => <option value={valor.value}>{valor.label}</option> ) }
                                </Form.Select>
                            </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Interes</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Interes Moratorio</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" />
                          </Form.Group>
                      </Col>
                  </Row>
              </Tab>
              <Tab eventKey="refPersonal" title="Referencia Personal">
                  <Row className="g-2">
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cliente</Form.Label>
                              <Form.Label>Cliente</Form.Label>
                              <Select
                                name="cliente"
                                id="cliente"
                                defaultValue={listaCliente[0] }
                                onChange={setSelectedOption}
                                options={listaCliente}
                                isClearable = {true}
                                placeholder="Buscar cliente"
                                />
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
                              <Form.Control placeholder="Ingrese nombres" id="nombre" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Estado</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" />
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Monto cuota</Form.Label>
                              <Form.Control  placeholder="Ingrese ingresos actuales" id="ingresos" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cuotas Pendientes</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group className='mb-2'>
                              <Form.Label>Cuotas Totales</Form.Label>
                              <Form.Control  placeholder="Ingrese apellidos" id="apellido" />
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
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Personales </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioCliente cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setEstadoForm(!estadoForm)} >Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}
