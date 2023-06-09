import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Tab, Tabs, Table, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import localBD from '../../helpers/localBD';
import { Formulario as FormularioCliente } from '../cliente/Formulario'
import { ModalAlerta, ModalConfirmacion } from '../Utiles';
import { useAsyncError } from 'react-router-dom';

export const FormularioPagoCuota = ({ cambiarModalAlerta }) => {

    let idSeleccionado = "";
    const [listaCliente, setListaCliente] = useState([])
    const [listaCuotasPagar, setlistaCuotasPagar] = useState([])
    const [totalCuotas,setTotalCuotas] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null);
    const [, guardarNuevoJson,obtenerUnicoRegistro , , endpointLibre] = Peticiones();
    const [estadoForm, setEstadoForm] = useState(false);
    const [solicitud, setSolicitud] = useState(false);
    const [usuario, setUsuario] = useState({ "nombre": "" })
    const { obtenerUsuario, obtenerCaja } = localBD();
    const [caja, setCaja] = useState([{"descripcion":""}]);
    const [saldoCaja,setSaldoCaja] = useState()
    const [datosCliente, setDatosCliente] = useState({ "id": "", "documento": "", "nombre_completo": "", "direccion": "" });
    const [datosCuota, setDatosCuota] = useState(
        []);

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
        cargarCuotas();
    }, [selectedOption]);

    const cargarCliente = () => {
        const idSeleccionado = (selectedOption != null ? selectedOption.value : "")
         console.log(idSeleccionado)
        const id = listaCliente.find(item => item.value === idSeleccionado)
        if (id) {
            setDatosCliente({ "documento": id.documento, "nombre_completo": id.nombre_completo, "direccion": id.direccion })
        }

    }

    const cargarCuotas = async () => {
         console.log(idSeleccionado)
        let cuotas = await endpointLibre("api/solicitud/cuotas/l/" + selectedOption?.value, "GET")
         console.log("cuotas ", cuotas)
        let listaCuotas = [];
        if (cuotas.cod === "00") {
            setDatosCuota(cuotas.datos);
            // setSolicitud(false)
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
            "monto": totalCuotas,
            "cuotas":[]
        }
        for (let cuota of listaCuotasPagar) {
            form.cuotas.push({"id":cuota.id,"saldo":cuota.saldo,"id_solicitud":cuota.solicitud_id});
        }
         console.log(form)

        guardarNuevoJson('api/operaciones/pagarCuotas',form).then(
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
    }

    const seleccionarCuota=(e)=>{
        let temp = listaCuotasPagar;
        if(e.target.checked){
             console.log(e.target.value)
            let test = datosCuota.find((fila )=> {return fila.id ==e.target.value});
            temp.push(test);
            setlistaCuotasPagar(temp)
        }else{
            temp = temp.filter((fila)=> fila.id != e.target.value );
            setlistaCuotasPagar(temp)
        }
        let total = 0
        temp.forEach((cuota) => {
            total+=parseInt (cuota.saldo)
        });
         console.log(total);
        setTotalCuotas(total)


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
                                            <Form.Label>Direccion</Form.Label>
                                            <Form.Control value={datosCliente.direccion} placeholder="Ingrese apellidos" id="direccion" name="direccion" disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                            }

                    </Form>
                </Tab>
                {
                    selectedOption != null &&
                    <Tab eventKey="cuotasPendientes" title="Cuotas a Pagar">
                        <Form id="formCuotas" onSubmit={guardarForm}>
                            <Row>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Total</Form.Label>
                                        <Form.Control placeholder="0" id="direccion" name="direccion" value={totalCuotas} disabled style={{textAlign:"right"}} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                                    <thead className="table-dark">
                                        <tr >
                                            <th>Cuota N.</th>
                                            <th>Fecha Venc.</th>
                                            <th>Amortizacion</th>
                                            <th>Interes</th>
                                            <th>Mora</th>
                                            <th>Saldo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datosCuota.map((fila)=>{return ( <tr> <td>{fila.n_cuota}</td><td>{fila.fec_vencimiento}</td><td>{fila.amortizacion}</td><td>{fila.interes}</td><td>{fila.mora}</td><td>{fila.saldo}</td><td><Form.Check type="checkbox" id={`cuota-${fila.id}`} value={fila.id} onChange ={seleccionarCuota} /></td></tr>)})}
                                    </tbody>
                                </Table>
                            </Row>
                        </Form>
                    </Tab>
                }
                {totalCuotas >0 &&
                    <Tab eventKey="refPersonal" title="Datos del Pago">
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
                                        <Form.Label>Monto Pago</Form.Label>
                                        <Form.Control id="monto" value={totalCuotas} disabled />
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
