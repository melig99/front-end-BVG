import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {Formulario} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';
import {ModalAlerta,ModalConfirmacion} from '../Utiles';


export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [estadoForm,setEstadoForm] = useState(false);
    const [datosForm,setDatosForm] = useState({});
    const [obtenerPanel,guardarNuevoJson,obtenerUnicoRegistro,eliminarRegistro,] = Peticiones();
    const [state, setState] = useState(false)

    const eliminarFila = async (id)=>{
        let temp = await eliminarRegistro('api/agrupador',id)
        console.log(temp)
        if(temp.cod==0){
            cambiarModalAlerta("Eliminado Correctamente")
        }else{
            cambiarModalAlerta(temp.msg);
        }
    }

    const [selecionado,setSelecionado] = useState({"id":0});

    const verFormulario=(id)=>{
        //setverFom({"callback":()=>ver(id)})
        setEstadoForm(true)
        console.log("ingresado id: ",id)
        setSelecionado(id)
    }

    useEffect(()=>{
        obtenerPanel("api/agrupador",setDatos)
    },[]);

    // SECCION PARA ACTIVAR ALERTAS
    const [modalAlerta,setModalAlerta] = useState({"estado":false,"msg":""});
    const cambiarModalAlerta=(msg)=>{
        setModalAlerta({"estado":!modalAlerta.estado,"msg":msg})
        console.log(modalAlerta)
        recargar()
    }

    // SECCION PARA ACTIVAR ALERT CONFIRMACION
    const [modalConfirmacion,setModalConfirmacion] = useState({"estado":false,"msg":"","callback":()=>{}});
    const cambiarModalConfirmacion=(msg,id)=>{
        setModalConfirmacion({"estado":!modalConfirmacion.estado,"msg":msg,"callback":()=>eliminarFila(id)})
        console.log(modalConfirmacion)
    }

    const recargar =() =>{
        obtenerPanel("api/agrupador",setDatos)
        setState(true)
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Agrupador Menu</h1>
                            </Row>
                            <Row>
                                <Col sm={4}>

                                </Col>
                                <Col sm={8} className="d-flex flex-row-reverse">
                                    <Button variant="primary" onClick={()=>{setSelecionado("");(setEstadoForm(!estadoForm))}}>Nuevo Barrio</Button>
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
                            <Tabla datos={datos}  eliminar = {(id)=>{ cambiarModalConfirmacion("¿Esta seguro de que desea eliminar ?",id)}} ver = {(id)=> {verFormulario(id)}} />
                        </Row>

                    </Container>
                </Row>

            </Container>
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Agrupador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formulario cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSelec={selecionado} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setEstadoForm(!estadoForm)}} >Cerrar</Button>
                </Modal.Footer>
            </Modal>
            <ModalAlerta valores={modalAlerta} ></ModalAlerta>
            <ModalConfirmacion valores={modalConfirmacion} ></ModalConfirmacion>
        </>
    )
}
