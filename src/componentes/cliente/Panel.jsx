import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {Formulario as FormCliente} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';

export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [estadoForm,setEstadoForm] = useState(false);
    const [datosForm,setDatosForm] = useState({});
    const [obtenerPanel,guardarNuevoJson,,eliminarRegistro,] = Peticiones();

    const eliminarFila = async (id)=>{
        let temp = await eliminarRegistro('api/cliente/',id)
        console.log(temp)
    }

    const guardarDatos=(objeto)=>{
        let temp = {...datosForm};
        temp[objeto.target.id]=objeto.target.value;
        setDatosForm(temp);

    }
    const enviarForm = ()=>{
        console.log(guardarNuevoJson)
        const form = {
            'nombre':datosForm.nombre,
            'apellido':datosForm.apellido,
            'id_tipo_doc':datosForm.tipo_doc,
            'nro_doc':datosForm.nro_doc,
            'barrio':datosForm.barrio,
            'mail':datosForm.mail,
            'direccion':datosForm.direccion,
            'estado_civil':datosForm.estado_civil,
            'sexo':datosForm.sexo,
            'telefono':datosForm.telefono,
            'fecha_nacimiento':datosForm.f_nac,
            'observacion':datosForm.observacion,
        }
        console.log(form);
        guardarNuevoJson('api/cliente/',form)
        setEstadoForm(false)

    }
    useEffect(()=>{
        obtenerPanel("api/cliente",setDatos)
    },[]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Clientes</h1>
                            </Row>
                            <Row>
                                <Col sm={4}>

                                </Col>
                                <Col sm={8} className="d-flex flex-row-reverse">
                                    <Button variant="primary" onClick={()=>setEstadoForm(!estadoForm)}>Nuevo Cliente</Button>
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
                            <Tabla datos={datos}  eliminar = {eliminarFila}/>
                        </Row>

                    </Container>
                </Row>

            </Container>
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Personales </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCliente almacenDatos = {guardarDatos}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setEstadoForm(!estadoForm)} >Cerrar</Button>
                    <Button variant="success" onClick={()=>{enviarForm();setEstadoForm(!estadoForm)}} >Guardar</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
