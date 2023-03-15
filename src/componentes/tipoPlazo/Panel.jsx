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
        let temp = await eliminarRegistro('api/tipoPlazo',id)
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
            'descripcion':datosForm.tipo_plazo,
            'factor_divisor':datosForm.factor_divisor,
            'dias_vencimiento':datosForm.dias_vencimiento,
            'interes':datosForm.interes,
        }
        console.log(form);
        guardarNuevoJson('api/tipoPlazo',form)
        setEstadoForm(false)

    }
    useEffect(()=>{
        obtenerPanel("api/tipoPlazo",setDatos)
    },[]);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Tipo Plazo</h1>
                            </Row>
                            <Row>
                                <Col sm={4}>

                                </Col>
                                <Col sm={8} className="d-flex flex-row-reverse">
                                    <Button variant="primary" onClick={()=>setEstadoForm(!estadoForm)}>Nuevo Tipo Plazo</Button>
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
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                <Modal.Title>Datos Tipo Plazo</Modal.Title>
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
