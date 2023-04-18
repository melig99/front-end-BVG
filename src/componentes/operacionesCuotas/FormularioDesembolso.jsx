import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Tab, Tabs, Table, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import { Formulario as FormularioCliente } from '../cliente/Formulario'
import { ModalAlerta, ModalConfirmacion } from '../Utiles';

export const FormularioDesembolso = ({ cambiarModalAlerta }) => {

    const [listaCliente, setListaCliente] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [, guardarNuevoJson, , , endpointLibre] = Peticiones();
    const [estadoForm, setEstadoForm] = useState(false);
    const [datosCliente, setDatosCliente] = useState({ "documento": "", "nombre_completo": "", "direccion": "" });

    useEffect(() => {
        cargarListas();
    }, []);


    const cargarListas = async () => {
        //Extrae Datos de la BD para CLIENTE
        let variable = []
        let options = await endpointLibre("api/cliente", "GET")
        console.log(options)
        for (let i of options.datos) {
            variable.push({ 'label': i.nombre, 'value': i.id, "documento": i.documento, "nombre_completo": i.nombre + " " + i.apellido, "direccion": i.direccion })
        }
        console.log(variable)
        setListaCliente(variable)
    }

    const idSeleccionado = (selectedOption != null ? selectedOption.value : "")

    console.log("idCliente ", idSeleccionado)
    console.log("lista ", listaCliente)
    console.log("clientes ", datosCliente)

    useEffect(() => {
        cargarCliente();
    }, [idSeleccionado]);

    const cargarCliente = () => {
        console.log(idSeleccionado)
        const id = listaCliente.find(item => item.value === idSeleccionado)
        console.log("holaaaaaaaa", id)
        if (id) {
            setDatosCliente({ "documento": id.documento, "nombre_completo": id.nombre_completo, "direccion": id.direccion })
        }

    }


    return (
        <>
            <Tabs defaultActiveKey="nomCliente" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="nomCliente" title="Cliente">
                    <Form id="formGeneral" onSubmit={""}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cliente</Form.Label>
                                    <Select
                                        name="cliente"
                                        id="cliente"
                                        defaultValue={listaCliente[0]}
                                        onChange={setSelectedOption}
                                        options={listaCliente}
                                        isClearable={true}
                                        placeholder="Buscar cliente"
                                    //selectedOption={listaCliente}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {
                            selectedOption != null &&
                            <>
                                <Row>

                                    <Col md>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Documento</Form.Label>
                                            <Form.Control value={datosCliente.documento} placeholder="Ingrese ingresos actuales" id="documento" name="documento" disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Nombre y apellido</Form.Label>
                                            <Form.Control value={datosCliente.nombre_completo} placeholder="Ingrese ingresos actuales" id="nombre" disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Telefono</Form.Label>
                                            <Form.Control placeholder="Ingrese gastosAdministrativos" id="telefono" name="telefono" disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Direccion</Form.Label>
                                            <Form.Control value={datosCliente.direccion} placeholder="Ingrese apellidos" id="direccion" name="direccion" disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        }

                    </Form>
                </Tab>
                {/* <Tab eventKey="refPersonal" title="Referencia Personal">
                    <Form id="formRefPers" onSubmit={actualizarReferenciasPersonales}>
                        <Row className="g-2">
                            <Col md={8}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cliente</Form.Label>
                                    <Select
                                        name="cliente"
                                        id="cliente"
                                        defaultValue={listaCliente[0]}
                                        onChange={setSelectedOption}
                                        options={listaCliente}
                                        isClearable={true}
                                        placeholder="Buscar cliente"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Relacion (con el cliente)</Form.Label>
                                    <Form.Control placeholder="Vecino,primo,pariente..." id="relacion" />
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
                        <Table table table-striped table-hover style={{ backgroundColor: "#ffffff" }}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Nombre</th>
                                    <th>Relacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referenciasPersonales.map((fila) => { return (<tr> <td>{fila.nombre}</td><td>{fila.relacion}</td></tr>) })}
                            </tbody>
                        </Table>
                    </Row>
                    </Tab>*/}
            </Tabs>
            {/*{
                selectedOption === null &&
                <Row>
                    <Button type='submit' form="formGeneral" variant="success" >Guardar</Button>
                </Row>
            }
            <Modal show={estadoForm} size="lg" animation={false} onHide={() => setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos Personales </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioCliente cambiarModalAlerta={(a) => { cambiarModalAlerta(a) }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEstadoForm(!estadoForm)} >Cerrar</Button>
                </Modal.Footer>
        </Modal>*/}
        </>
    )
}
