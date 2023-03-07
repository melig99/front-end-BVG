import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {Formulario as FormCliente} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';

export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [estadoForm,setEstadoForm] = useState(false);
    const [datosForm,setDatosForm] = useState({});
    const [obtenerPanel,guardarNuevoJson,obtenerUnicoRegistro,eliminarRegistro,endpointLibre] = Peticiones();

    const eliminarFila = async (id)=>{
        let temp = await eliminarRegistro('eliminar/cliente',id)
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
            'mail':datosForm.mail,
            'nro_doc':datosForm.nro_doc,
            'telefono':datosForm.telefono,
            'fecha_nacimiento':datosForm.nombre,
            'id_tipo_doc':datosForm.tipo_doc,
            'id_nacionalidad':datosForm.nacionalidad,
            'fecha_nacimiento':datosForm.f_nac,
        }
        console.log(form);
        guardarNuevoJson('nuevo/cliente',form)
        setEstadoForm(false)

    }
    useEffect(()=>{
        obtenerPanel("listar/cliente",setDatos)
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
                            <hr/>
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
            <Modal show={estadoForm}  animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
            <Modal.Header closeButton>
            {/* <Modal.Title>Cliente </Modal.Title> */}
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
