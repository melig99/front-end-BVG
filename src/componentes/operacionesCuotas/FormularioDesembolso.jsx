import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Tab, Tabs, Table, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import localBD from '../../helpers/localBD';
import { Formulario as FormularioCliente } from '../cliente/Formulario'
import { ModalAlerta, ModalConfirmacion } from '../Utiles';
import { useAsyncError } from 'react-router-dom';

export const FormularioDesembolso = ({ cambiarModalAlerta }) => {

    let idSeleccionado = "";
    const [listaCliente, setListaCliente] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [, guardarNuevoJson,obtenerUnicoRegistro , , endpointLibre] = Peticiones();
    const [estadoForm, setEstadoForm] = useState(false);
    const [solicitud, setSolicitud] = useState(false);
    const [usuario, setUsuario] = useState({ "nombre": "" })
    const { obtenerUsuario, obtenerCaja } = localBD();
    const [caja, setCaja] = useState([{"descripcion":""}]);
    const [saldoCaja,setSaldoCaja] = useState()
    const [datosCliente, setDatosCliente] = useState({ "id": "", "documento": "", "nombre_completo": "", "direccion": "" });
    const [datosSolicitud, setDatosSolicitud] = useState(
        {
            "monto_credito": "",
            "interes": "",
            "descripcion_plazo": "",
            "cant_cuotas": ""
        });

    useEffect(() => {
        cargarListas();
    }, []);
    useEffect(() => {
        try {
            let cajaBD = obtenerCaja()
            setCaja(cajaBD)
             console.log(cajaBD, "caja <-")
            obtenerSaldoCaja(cajaBD.caja);
             console.log("obt usuario")
            let temp = obtenerUsuario()
             console.log(temp);
            setUsuario(temp);
        } catch (e) {
            setCaja(null)
             console.log(e)
        }
        
    }, [])


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



    useEffect(() => {
        cargarCliente();
        cargarSolicitud();
    }, [selectedOption]);

    const cargarCliente = () => {
        const idSeleccionado = (selectedOption != null ? selectedOption.value : "")
         console.log("idCliente ", idSeleccionado)
         console.log("lista ", listaCliente)
         console.log("solicitud ", datosSolicitud)
         console.log(idSeleccionado)
        const id = listaCliente.find(item => item.value === idSeleccionado)
         console.log("holaaaaaaaa", id)
        if (id) {
            setDatosCliente({ "documento": id.documento, "nombre_completo": id.nombre_completo, "direccion": id.direccion })
        }

    }

    const cargarSolicitud = async () => {
         console.log(idSeleccionado)
        let options = await endpointLibre("api/solicitud/aprobado/cliente/" + selectedOption?.value, "GET")
         console.log("options ", options)
        if (options.cod === "00") {
            for (let i of options.datos) {
                setDatosSolicitud({ "id": i.id, "monto_credito": i.monto_credito, "interes": i.interes, "descripcion_plazo": i.descripcion_plazo, "cant_cuotas": i.cant_cuotas })
            }
            setSolicitud(false)
        } else {
             console.log("else")
            setSolicitud(true)
        }
    }

    const obtenerSaldoCaja = async (idSelec) =>{
       // const idSelec = caja.caja
         console.log(idSelec)
        let datosCrudo = (await obtenerUnicoRegistro('api/caja/u', idSelec)).datos[0]
         console.log(datosCrudo, "saldo caja")
        setSaldoCaja(datosCrudo)
    }

    const guardarForm = (e) =>{
        e.preventDefault();
        const form = {
            "caja": caja?.caja, 
            "monto": datosSolicitud?.monto_credito,
            "solicitud_id": datosSolicitud?.id,
        }
         console.log(form)
        guardarNuevoJson('api/operaciones/desembolsar',form).then(
            (a)=>{
                if(a.cod==0){
                     console.log(a,"Guardado correctamente")
                    cambiarModalAlerta("Guardado Correctamente");
                    e.target.reset();
                }else{
                     console.log(a)
                    cambiarModalAlerta(a.msg);
                }
            }
        ).catch(
            (e)=>{
                 console.log(e)
                cambiarModalAlerta(e.msg);
            }
        )
        e.target.reset();
    }


    return (
        <>
            <Tabs defaultActiveKey="nomCliente" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="nomCliente" title="Datos de la solictud">
                    <Form >
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label style={{ fontWeight: 'bold' }}>Cliente<b class="fw-bold text-danger">*</b></Form.Label>
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
                                <hr />
                                {
                                    !solicitud &&
                                    <Row>
                                        <Form.Label style={{ fontWeight: 'bold' }}>Solicitud</Form.Label>
                                        <Col md>
                                            <Form.Group className='mb-2'>
                                                <Form.Label>Monto del credito</Form.Label>
                                                <Form.Control value={datosSolicitud.monto_credito} placeholder="Ingrese gastosAdministrativos" id="monto_credito" name="monto_credito" disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className='mb-2'>
                                                <Form.Label>Intereses</Form.Label>
                                                <Form.Control value={datosSolicitud.interes} placeholder="Ingrese apellidos" id="interes" name="interes" disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className='mb-2'>
                                                <Form.Label>Cantidad de cuotas</Form.Label>
                                                <Form.Control value={datosSolicitud.cant_cuotas} placeholder="Ingrese gastosAdministrativos" id="cant_cuotas" name="cant_cuotas" disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className='mb-2'>
                                                <Form.Label>Tipo plazo</Form.Label>
                                                <Form.Control value={datosSolicitud.descripcion_plazo} placeholder="Ingrese apellidos" id="descripcion_plazo" name="descripcion_plazo" disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                }
                                {
                                    solicitud &&
                                    <div>NO POSEE SOLICITUD
                                        <h4>verique los datos</h4>
                                    </div>
                                }
                            </>
                        }

                    </Form>
                </Tab>
                {
                    solicitud === false &&
                    <Tab eventKey="refPersonal" title="Datos del desembolso">
                        <Form id="formGeneral" onSubmit={guardarForm}>
                            <Row >
                                <Col md={6}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Caja</Form.Label>
                                        <Form.Control id="caja" value={caja.descripcion} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Saldo en caja </Form.Label>
                                    <Form.Control id="saldo_caja" value={saldoCaja?.saldo_actual} disabled />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Cajero </Form.Label>
                                    <Form.Control id="usuario" value={usuario.nombre} disabled />
                                </Col >
                                <Col md={6}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Monto Desembolso</Form.Label>
                                        <Form.Control id="monto" value={datosSolicitud.monto_credito} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Button type='submit' form="formGeneral" variant="success">Guardar</Button>
                            </Row>
                        </Form>
                    </Tab>
                }

            </Tabs>
        </>
    )
}
