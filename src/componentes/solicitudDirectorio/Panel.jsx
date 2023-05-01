import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {Formulario as FormCliente} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';
import {ModalAlerta,ModalConfirmacion} from '../Utiles';

export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [estadoForm,setEstadoForm] = useState(false);
    const [datosForm,setDatosForm] = useState({});
    const [seleccionado,setSeleccionado] = useState(0)

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
    const mostarSolicitud = (id) =>{
        setSeleccionado(id);
        setEstadoForm(true);
    }

    useEffect(()=>{
        obtenerPanel("api/solicitud/analizado",setDatos)
    },[]);

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
                                <h1>Solicitud Directorio</h1>
                            </Row>
                            <Row>
                                <Col sm={12}>

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
                            <Tabla datos={datos}  ver= {(id)=>{mostarSolicitud(id)} }/>
                        </Row>

                    </Container>
                </Row>

            </Container>
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Solicitud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCliente cambiarModalAlerta={(a)=>{cambiarModalAlerta(a)}} idSeleccionado={seleccionado}/>
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
