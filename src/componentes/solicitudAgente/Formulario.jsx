import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Tab, Tabs, Table, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import { Formulario as FormularioCliente } from '../cliente/Formulario'
import { ModalAlerta, ModalConfirmacion } from '../Utiles';

export const Formulario = ({ cambiarModalAlerta, idSeleccionado  }) => {

    const NUMERICOS_VACIOS = {"ingresos":"","monto_credito":"","gastos_administrativos":"","monto_cuota":"","monto_cuota_rc":""};

    const [listaCliente, setListaCliente] = useState([])
    const [datosCuotero, setDatosCuotero] = useState({ "tipo_plazo": "", "cant_cuotas": "", "monto_credito": "" })
    const [cuotero, setCuotero] = useState([]);
    const [clienteSolicitud,setClienteSolicitud] = useState("");
    const [clienteRefPersonal,setClienteRefPersonal] = useState("");
    const [ingresosMensuales,setIngresosMensuales] = useState(0)
    const [numericos,setNumericos] = useState(NUMERICOS_VACIOS)
    const [selectedOption, setSelectedOption] = useState(null);
    const [listaTipoPlazo, setListaTipoPlazo] = useState([])
    const [, guardarNuevoJson, , , endpointLibre] = Peticiones();
    const [estadoForm, setEstadoForm] = useState(false);
    const [referenciasPersonales, setReferenciasPersonales] = useState([]);
    const [referenciasComerciales, setReferenciasComerciales] = useState([]);
    const [tabActiva,setTabActiva] = useState("solicitud")
    const [tipoPlazo, setTipoPlazo] = useState({ "tipo_plazo": "", "interes": "0.0", "id_tipo_plazo": "" });
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    const handleChange = (event) =>{
        if(event.target.id =="monto_credito"){
            handleCuotero(event)
        }
        let temp ={...numericos} ;
        temp[event.target.id] = addCommas(removeNonNumeric(event.target.value)) ;
        console.log(event.target.id , event.target.value,temp);
        setNumericos(temp);
    }

    useEffect(() => {
        cargarListas();
    }, []);

    const cargarListas = async () => {
        //Extrae Datos de la BD para CLIENTE
        let variable = []
        let options = await endpointLibre("api/cliente", "GET")
        console.log(options);
        for (let i of options.datos) {
            variable.push({ 'label': i.documento + "-" + i.nombre + " " + i.apellido, 'value': i.id })
        }
        console.log(variable)
        setListaCliente(variable)
        //Extrae Datos de la BD para TIPO DOCUMENTO
        variable = [];
        options = await endpointLibre("api/tipoPlazo", "GET")
        console.log(options)
        for (let i of options.datos) {
            variable.push({ 'label': i.descripcion, 'value': i.id, 'interes': i.interes })
        }
        console.log(variable)
        setListaTipoPlazo(variable)
    }

    const actualizarReferenciasPersonales = (e) => {
        e.preventDefault();

        console.log([e.target.cliente.value, e.target.relacion.value]);
        let temp = listaCliente.find((a) => a.value == e.target.cliente.value);
        console.log({"cliente":clienteSolicitud});
        if(e.target.cliente.value == clienteSolicitud.value){
            cambiarModalAlerta("No se puede cargar una referencia personal igual que cliente de solicitud");
            return;
        }
        setReferenciasPersonales(
            [
                ...referenciasPersonales,
                { "cliente_id": temp.value, "nombre": temp.label, "relacion_cliente": e.target.relacion.value }
            ])
        e.target.reset()
        setClienteRefPersonal("");
    }

    const actualizarReferenciasComerciales = (e) => {
        e.preventDefault();
        let campos = e.target;
        console.log("Formulario Ref Comerciales")

        console.log([e.target.entidad.value, e.target.estado.value, removeNonNumeric(e.target.monto_cuota_rc.value), e.target.cuotas_totales.value, e.target.cuotas_pendientes.value]);
        setReferenciasComerciales(
            [
                ...referenciasComerciales,
                { "entidad": campos.entidad.value, "estado": campos.estado.value, "monto_cuota": removeNonNumeric(campos.monto_cuota_rc.value),"monto_cuota_v": addCommas(removeNonNumeric(campos.monto_cuota_rc.value)), "cuotas_totales": campos.cuotas_totales.value, "cuotas_pendientes": campos.cuotas_pendientes.value }
            ])
        let temp = {...numericos};
        temp.monto_cuota_rc = "";
        setNumericos(temp);
        e.target.reset();
    }

    const actualizarTipoPlazo = (e) => {
        let temp = e.target.value;
        let elemento = listaTipoPlazo.find((fila) => { return fila.value == temp });
        setTipoPlazo(elemento);
        let cuotero = datosCuotero;
        cuotero.tipo_plazo = e.target.value;
        setDatosCuotero(cuotero);

    }

    const guardarForm = (e) => {
        e.preventDefault();
        const form = {
            'cliente_id': e.target.cliente.value,
            'ingresos_actuales': removeNonNumeric(e.target.ingresos.value),
            'monto_credito': removeNonNumeric(e.target.monto_credito.value),
            'gastos_administrativos': removeNonNumeric(e.target.gastos_administrativos.value),
            'interes': e.target.interes.value,
            'interes_moratorio': e.target.interes_moratorio.value,
            'tipo_plazo': e.target.tipo_plazo.value,
            'cant_cuotas': e.target.cant_cuotas.value,
            'inicio_cuota': e.target.inicio_cuota.value,
            'ref_personales': referenciasPersonales,
            'ref_comerciales': referenciasComerciales,
        }
        console.log(form)
        guardarNuevoJson('api/solicitud', form).then(
            (a) => {
                if (a.cod == 0) {
                    console.log(a, "Guardado correctamente")
                    cambiarModalAlerta("Guardado Correctamente");
                    e.target.reset();
                    setTabActiva("solicitud")
                    setNumericos(NUMERICOS_VACIOS);
                    setReferenciasPersonales([]);
                    setReferenciasComerciales([]);
                } else {
                    console.log(a)
                    cambiarModalAlerta(a.msg);
                }
            }
        ).catch(
            (e) => {
                console.log(e)
                cambiarModalAlerta(e.msg);
            }
        )
    }

    const handleCuotero = (e) => {
        let temp = datosCuotero;
        temp[e.target.id] = removeNonNumeric(e.target.value)

        setDatosCuotero(temp);
    }

    const actualizarCuotero = async () => {
        // /api/solicitud/cuotero/interes/4/cuotas/12/monto/5000000
        if (datosCuotero.tipo_plazo == "" || datosCuotero.cant_cuotas == "" || datosCuotero.monto_credito == "") {
            cambiarModalAlerta("No se puede actualizar cuotero , falta cargar datos [Tipo plazo , Cantidad de cuotas o Monto del credito]");
            return ""
        }
        let options = await endpointLibre(`api/solicitud/cuotero/interes/${datosCuotero.tipo_plazo}/cuotas/${datosCuotero.cant_cuotas}/monto/${datosCuotero.monto_credito}`, "GET")
        setCuotero(options.datos)

    }

    const cerrarCliente = (estado)=>{
        cargarListas();
        setEstadoForm(estado);
    }

    return (
        <>
            <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" onSelect={setTabActiva} activeKey={tabActiva} className="mb-3">
                <Tab eventKey="solicitud" title="Solicitud">
                    <Form id="formGeneral" onSubmit={guardarForm}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cliente<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Select
                                        name="cliente"
                                        id="cliente"
                                        defaultValue={listaCliente[0]}
                                        onChange={setClienteSolicitud}
                                        options={listaCliente}
                                        isClearable={true}
                                        placeholder="Buscar cliente"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Label style={{ opacity: "0" }}>.</Form.Label><br />
                                <Button variant="primary" onClick={() => setEstadoForm(!estadoForm)}>Nuevo Cliente</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Ingresos Actuales (Mensuales)<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Ingrese ingresos actuales" id="ingresos" name="ingresos" onChange={handleChange} value={numericos.ingresos} required />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Tipo Plazo<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Select defaultValue="" id="tipo_plazo" name="tipo_plazo" onChange={(e) => { actualizarTipoPlazo(e) }}>
                                        {listaTipoPlazo.map(valor => <option value={valor.value}>{valor.label}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Interés<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control id="interes" name="interes" readOnly value={tipoPlazo.interes} required />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Interés Moratorio<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Ingrese interes moratorio" id="interes_moratorio" name="interes_moratorio" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Monto Crédito<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Ingrese monto del credito" id="monto_credito" onChange={handleChange} value={numericos.monto_credito} required />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Gastos Administrativos<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Ingrese gastos administrativos" id="gastos_administrativos" name="gastos_administrativos" onChange={handleChange} value={numericos.gastos_administrativos} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cantidad Cuotas<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control id="cant_cuotas" name="cant_cuotas" placeholder="Cantidad de cuotas del credito" onChange={handleCuotero}  required />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Inicio Cuotas<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control id="inicio_cuota" name="inicio_cuota" placeholder="Fecha de inicio de cobros" required />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Tab>
                <Tab eventKey="refPersonal" title="Referencia Personal">
                    <Form id="formRefPers" onSubmit={actualizarReferenciasPersonales}>
                        <Row className="g-2">
                            <Col md={6}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cliente<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Select
                                        name="cliente"
                                        id="cliente"
                                        defaultValue={listaCliente[0]}
                                        onChange={setClienteRefPersonal}
                                        value={clienteRefPersonal}
                                        options={listaCliente}
                                        isClearable={true}
                                        placeholder="Buscar referencia personal"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Relación (con el cliente)<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Vecino,primo,pariente..." id="relacion" required />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className='mb-2'>
                                    <Form.Label style={{ opacity: "0" }}>.</Form.Label><br />
                                    <Button type='submit' form="formRefPers" variant="primary" >Agregar</Button>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>
                    <Row>
                        <Table table table-striped table-hover style={{ backgroundColor: "#ffffff" }}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Nombre</th>
                                    <th>Relación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referenciasPersonales.map((fila) => { return (<tr key={fila.cliente_id}> <td>{fila.nombre}</td><td>{fila.relacion_cliente}</td></tr>) })}
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="refComercial" title="Referencia Comercial">
                    <Form id="formRefCom" onSubmit={actualizarReferenciasComerciales}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Entidad<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Nombre de Entidad" id="entidad" required />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Estado<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Select id="estado">
                                        <option value="ACTIVO">Activo</option>
                                        <option value="INACTIVO">Inactivo</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Monto cuota<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Ingrese monto de cuota deuda" id="monto_cuota_rc" value={numericos.monto_cuota_rc}  onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Cuotas Pend.<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Pendientes" id="cuotas_pendientes" required />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Total Cuotas<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control placeholder="Totales" id="cuotas_totales" required />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className='mb-2'>
                                    <Form.Label style={{ opacity: "0" }}>.</Form.Label><br />
                                    <Button type='submit' form="formRefCom" variant="primary" style={{ width: "100%" }} >Agregar</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Table table table-striped table-hover style={{ backgroundColor: "#ffffff" }}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Entidad</th>
                                    <th>Estado</th>
                                    <th>Monto Cuota</th>
                                    <th>Cuotas </th>

                                </tr>
                            </thead>
                            <tbody>
                                {referenciasComerciales.map((fila, i) => {
                                    console.log(`rcS-${i}`)
                                    return (<tr key={`${i}-s`}><td>{fila.entidad}</td><td>{fila.estado}</td><td>{fila.monto_cuota_v}</td><td>{fila.cuotas_pendientes + "/" + fila.cuotas_totales}</td></tr>)
                                })}
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="cuotero" title="Cuotero">
                    <Row>
                        <Col md={10}>
                        </Col>
                        <Col md={2}>
                            <Form.Group className='mb-2'>
                                 <Button onClick={actualizarCuotero} variant="primary" style={{ width: "100%" }} >Actualizar</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Table table-striped table-hover style={{ backgroundColor: "#ffffff" }}>
                            <thead className="table-dark">
                                <tr >
                                    <th>N</th>
                                    <th>Cuota</th>
                                    <th>Interés</th>
                                    <th>Neto</th>
                                    <th>Capital</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuotero.map((fila) => { return (<tr key={`cuo-${fila.n_cuota}`}> <td>{fila.n_cuota}</td><td>{addCommas(fila.cuota)}</td><td>{addCommas(fila.interes)}</td><td>{addCommas(fila.neto)}</td><td>{addCommas(fila.capital)}</td><td>{fila.vencimiento}</td></tr>) })}
                            </tbody>
                        </Table>
                        <Row>
                            <Button type='submit' form="formGeneral" variant="success" >Guardar</Button>
                        </Row>
                    </Row>
                </Tab>
            </Tabs>
            <Modal show={estadoForm} size="lg" animation={false} onHide={() => cerrarCliente(!estadoForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos Personales </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioCliente cambiarModalAlerta={(a) => { cambiarModalAlerta(a) }} idSelec="" estadoForm={(a)=>{cerrarCliente(a)}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => cerrarCliente(!estadoForm)} >Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
