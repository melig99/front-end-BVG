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
    const [referenciasPersonales,setReferenciasPersonales] = useState([]);
    const [referenciasComerciales,setReferenciasComerciales] = useState([]);

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

    const actualizarReferenciasPersonales=(e)=>{
        e.preventDefault();
        console.log("Formulario Ref Personales")

        console.log([e.target.cliente.value ,e.target.relacion.value]);
        let temp = listaCliente.find((a)=>a.value==e.target.cliente.value);
        let arrTemp = referenciasPersonales;
        arrTemp.push({"id":temp.value,"nombre":temp.label,"relacion":e.target.relacion.value})
        setReferenciasPersonales(arrTemp)
        console.log(arrTemp);
    }
    const actualizarReferenciasComerciales=(e)=>{
        e.preventDefault();
        let campos =e.target;
        console.log("Formulario Ref Comerciales")

        console.log([e.target.entidad.value, e.target.estado.value, e.target.monto_cuota.value, e.target.cuotas_totales.value, e.target.cuotas_pendientes.value]);
        let arrTemp = referenciasComerciales;
        arrTemp.push({"entidad":campos.entidad.value,"estado":campos.estado.value,"monto":campos.monto_cuota.value,"cuotas_totales":campos.cuotas_totales.value,"cuotas_pendientes":campos.cuotas_pendientes.value})

        setReferenciasComerciales(arrTemp)
        console.log(arrTemp);
    }
    const actualizarForm=(e)=>{
        e.preventDefault();
        console.log("Formulario 2")
        console.log(e.target)
    }


    return(
        <>
        <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="solicitud" title="Solicitud">
                <Form id="formGeneral" onSubmit={actualizarForm}>
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
                </Form>
            </Tab>
            <Tab eventKey="refPersonal" title="Referencia Personal">
                <Form id="formRefPers" onSubmit={actualizarReferenciasPersonales}>
                    <Row className="g-2">
                        <Col md={8}>
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
                        <Col md={4}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Relacion (con el cliente)</Form.Label>
                                <Form.Control  placeholder="Vecino,primo,pariente..." id="relacion" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={10}>

                        </Col>
                        <Col md={2}>
                            <Form.Group className='mb-2'>
                                <Button type='submit' form="formRefPers" variant="success" >Guardar</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                        <thead className="table-dark">
                            <tr >
                                <th>Nombre</th>
                                <th>Relacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referenciasPersonales.map((fila)=>{return ( <tr> <td>{fila.nombre}</td><td>{fila.relacion}</td></tr>)})}
                        </tbody>
                    </Table>
                </Row>
            </Tab>
            <Tab eventKey="refComercial" title="Referencia Comercial">
                <Form id="formRefCom" onSubmit={actualizarReferenciasComerciales}>
                    <Row>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Entidad</Form.Label>
                                <Form.Control placeholder="Ingrese nombres" id="entidad" />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control  placeholder="Ingrese ingresos actuales" id="estado" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Monto cuota</Form.Label>
                                <Form.Control  placeholder="Ingrese ingresos actuales" id="monto_cuota" />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Cuotas Pendientes</Form.Label>
                                <Form.Control  placeholder="Ingrese apellidos" id="cuotas_pendientes" />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Cuotas Totales</Form.Label>
                                <Form.Control  placeholder="Ingrese apellidos" id="cuotas_totales" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>

                        </Col>
                        <Col md={2}>
                            <Form.Group className='mb-2'>
                                <Button type='submit' form="formRefCom" variant="success" >Guardar</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                        <thead className="table-dark">
                            <tr >
                                <th>Entidad</th>
                                <th>Estado</th>
                                <th>Monto Cuota</th>
                                <th>Cuotas </th>

                            </tr>
                        </thead>
                        <tbody>
                            {referenciasComerciales.map((fila)=>{return (<tr>
                                <td>{fila.entidad}</td><td>{fila.estado}</td><td>{fila.monto}</td><td>{fila.cuotas_pendientes+"/"+fila.cuotas_totales}</td>
                            </tr>)})}
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
        </>
)
}
