import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {FormularioDesembolso} from './FormularioDesembolso';
import {FormularioMovGenerico} from './FormularioMovGenerico';
import {FormularioPagoCuota} from './FormularioPagoCuota';
import {FormularioApertura} from '../caja/FormularioApertura';
import {FormularioCierre} from '../caja/FormularioCierre';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';
import {ModalAlerta,ModalConfirmacion} from '../Utiles';
import localBD from '../../helpers/localBD';

export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [estadoForm,setEstadoForm] = useState(false);
    const [datosForm,setDatosForm] = useState({});
    const [formSeleccionado,setFormSeleccionado] = useState();
    const [caja,setCaja] = useState(null);
    const {obtenerCaja} = localBD()

    const [obtenerPanel,guardarNuevoJson,,eliminarRegistro,] = Peticiones();
    const eliminarFila = async (id)=>{
        let temp = await eliminarRegistro('api/solicitud',id)
         console.log(temp)
        if(temp.cod==0){
            cambiarModalAlerta("Eliminado Correctamente")
        }else{
            cambiarModalAlerta(temp.msg);
        }
    }
    const guardarDatos=(objeto)=>{
        let temp = {...datosForm};
        temp[objeto.target.id]=objeto.target.value;
        setDatosForm(temp);
    }
    const abrirForm =()=>{
             console.log(formSeleccionado)
            if(formSeleccionado== 'apertura'){
                return (<FormularioApertura cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={""}/>)
            }else if(formSeleccionado== 'cierre'){
                return (<FormularioCierre cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={""}/>)
            }else if(formSeleccionado== 'desembolso' && caja!=null){
                return (<FormularioDesembolso cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={""}/>)
            }else if(formSeleccionado== 'cuota' && caja!=null){
                return (<FormularioPagoCuota cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={""}/>)
            }else if(formSeleccionado== 'generico' && caja!=null){
                return (<FormularioMovGenerico cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={""}/>)
            }else{
                return false
            }

    }

    const enviarForm = ()=>{
         console.log(guardarNuevoJson)
        const form = {
            'nombre':datosForm.nombre,
            'observacion':datosForm.observacion,
        }
         console.log(form);
        // guardarNuevoJson('api/barrio',form).then(
        //     async (a)=>{
        //         if(a.cod==0){
        //             cambiarModalAlerta("Guardado Correctamente");
        //             setEstadoForm(false)
        //
        //         }else{
        //             cambiarModalAlerta(a.msg);
        //         }
        //     }
        // ).catch(
        //     (e)=>{
        //          console.log(e)
        //         cambiarModalAlerta(e.msg);
        //     }
        // )


    }

    useEffect(()=>{
        obtenerPanel("api/operaciones",setDatos)
        try {
            let cajaBD = obtenerCaja()
            setCaja(cajaBD)
             console.log(cajaBD,"caja <-")
        } catch (e) {
             console.log(e)
        }
    },[]);

    useEffect(()=>{
        try {
            let cajaBD = obtenerCaja()
            setCaja(cajaBD)
             console.log(cajaBD,"caja <-")
        } catch (e) {
            setCaja(null)
             console.log(e)
        }
    },[estadoForm])

    // SECCION PARA ACTIVAR ALERTAS
    const [modalAlerta,setModalAlerta] = useState({"estado":false,"msg":""});
    const cambiarModalAlerta=(msg)=>{
        setModalAlerta({"estado":!modalAlerta.estado,"msg":msg})
         console.log(modalAlerta)
    }

    // SECCION PARA ACTIVAR ALERT CONFIRMACION
    const [modalConfirmacion,setModalConfirmacion] = useState({"estado":false,"msg":"","callback":()=>{}});
    const cambiarModalConfirmacion=(msg,id)=>{
        setModalConfirmacion({"estado":!modalConfirmacion.estado,"msg":msg,"callback":()=>eliminarFila(id)})
         console.log(modalConfirmacion)
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Movimientos</h1>
                            </Row>
                            <Row className="d-flex flex-row">
                                <Col sm={8}>

                                </Col>

                                <Col sm={1}>
                                    {(caja == null ) && <Button variant="success" style={{width:"100%"}} onClick={ ()=>{ setFormSeleccionado('apertura');setEstadoForm(!estadoForm);} }> Abrir  Caja </Button>}
                                    {(caja!=null) && <Button variant="danger" style={{width:"100%"}} onClick={ ()=>{ setFormSeleccionado('cierre');setEstadoForm(!estadoForm);} }> Cierre  Caja </Button>}

                                </Col>
                                <Col sm={1}>
                                    <Button variant="secondary" style={{width:"100%"}} onClick={ ()=>{ setFormSeleccionado('generico');setEstadoForm(!estadoForm);} }>Movimiento</Button>

                                </Col>
                                <Col sm={1}>
                                    <Button variant="success" style={{width:"100%"}} onClick={ ()=>{ setFormSeleccionado('cuota');setEstadoForm(!estadoForm);} }>Pago Cuota</Button>

                                </Col>
                                <Col sm={1} >
                                    <Button variant="primary" style={{width:"100%"}} onClick={()=>{setFormSeleccionado('desembolso');setEstadoForm(!estadoForm);}}>Desembolso</Button>
                                </Col>
                            </Row>
                            <br/>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Container fluid={true}>
                        <Row>
                            <br/>
                            <Tabla datos={datos}  eliminar = {(id)=>{cambiarModalConfirmacion("¿Esta seguro de que desea eliminar ?",id) } }/>
                        </Row>

                    </Container>
                </Row>

            </Container>
            <Modal show={estadoForm} size="lg" animation={false} scrollable={true} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Movimientos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {abrirForm()}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setEstadoForm(!estadoForm)} >Cerrar</Button>
                </Modal.Footer>
            </Modal>
            <ModalAlerta valores={modalAlerta} ></ModalAlerta>
            <ModalConfirmacion valores={modalConfirmacion} ></ModalConfirmacion>
        </>
    )
}
