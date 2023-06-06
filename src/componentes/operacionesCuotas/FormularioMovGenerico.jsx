import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Tab, Tabs, Table, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import localBD from '../../helpers/localBD';
import { Formulario as FormularioCliente } from '../cliente/Formulario'
import { ModalAlerta, ModalConfirmacion } from '../Utiles';
import { useAsyncError } from 'react-router-dom';

export const FormularioMovGenerico = ({ cambiarModalAlerta }) => {

    let idSeleccionado = "";
    const [listaConcepto, setListaConcepto] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [, guardarNuevoJson,obtenerUnicoRegistro , , endpointLibre] = Peticiones();
    const [estadoForm, setEstadoForm] = useState(false);
    const [solicitud, setSolicitud] = useState(false);
    const [usuario, setUsuario] = useState({ "nombre": "" })
    const [caja, setCaja] = useState([{"descripcion":""}]);
    const { obtenerCaja, obtenerUsuario } = localBD()
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
        let options = await endpointLibre("api/conceptoCaja", "GET")
         console.log(options)
        for (let i of options.datos) {
            if(i.id != 1 && i.id != 2){
                variable.push({ 'label': i.descripcion, 'value': i.id, "tipo": i.tipo});
            }
        }
         console.log(variable)
        setListaConcepto(variable)
    }

    useEffect(() => {
        cargarConceptos();
    }, [selectedOption]);

    const cargarConceptos = () => {
        const idSeleccionado = (selectedOption != null ? selectedOption.value : "")
         console.log("idCliente ", idSeleccionado)
         console.log("lista ", listaConcepto)
         console.log("solicitud ", datosSolicitud)
         console.log(idSeleccionado)
        const id = listaConcepto.find(item => item.value === idSeleccionado)
         console.log("holaaaaaaaa", id)
        if (id) {
            setDatosCliente({ "documento": id.documento, "nombre_completo": id.nombre_completo, "direccion": id.direccion })
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
            "monto": e.target.monto.value,
            "concepto":e.target.concepto.value,
        }
         console.log(form)
        guardarNuevoJson('api/operaciones/movimientoGenerico',form).then(
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
            <Form id="formGeneral" onSubmit={guardarForm}>
                <Row className="g-2">
                    <Col md>
                        <Form.Group className='mb-2'>
                            <Form.Label style={{ fontWeight: 'bold' }}>Concepto<b class="fw-bold text-danger">*</b></Form.Label>
                            <Select name="concepto" id="concepto"
                                defaultValue={listaConcepto[0]} onChange={setSelectedOption}
                                options={listaConcepto} isClearable={true}
                                placeholder="Buscar concepto"
                                //selectedOption={listaConcepto}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className='mb-2'>
                            <Form.Label>Tipo movimiento</Form.Label>
                            <Form.Control value={selectedOption?.tipo} placeholder="" id="tipoMovimietno" name="tipoMovimietno" disabled />
                        </Form.Group>
                    </Col>
                </Row>
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
                            <Form.Label>Monto Operacion<b class="fw-bold text-danger">*</b></Form.Label>
                            <Form.Control id="monto" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' form="formGeneral" variant="success">Guardar</Button>
                </Row>
            </Form>
        </>
    )
}
