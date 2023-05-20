import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';
import {ModalAlerta,ModalConfirmacion} from '../Utiles';


export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [obtenerPanel,,,,] = Peticiones();

    const verFormulario=(id)=>{
        //setverFom({"callback":()=>ver(id)})
        setEstadoForm(true)
        console.log("ingresado id: ",id)
        setSelecionado(id)
    }

    useEffect(()=>{
        obtenerPanel("api/documento/{pag?}",setDatos)
    },[]);

   
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Documentos</h1>
                            </Row>
                            <br/>
                            <br/>
                        </Container>
                    </Col>

                </Row>
                <Row>
                    <Container fluid={true}>
                        <Row>
                            <br/>
                            <Tabla datos={datos}  ver = {(id)=> {verFormulario(id)}} />
                        </Row>
                    </Container>
                </Row>

            </Container>
        </>
    )
}