import React,{useState,useEffect, Component} from 'react';
import PropTypes from 'prop-types'
import {Col,Container,Row,Modal,Button} from 'react-bootstrap'

const ModalAlerta = ({valores}) => {
    const [estado,setEstadoModal] = useState(true);
    

    useEffect(()=>{
        console.log(valores);
        setEstadoModal(valores.estado);
    },[valores]);
    const cerrar = ()=>{
        setEstadoModal(false);
        valores.estado = false
    }

    return (
        <Modal show={estado} size="sm" animation={false} onHide={()=>{cerrar()}}>
            <Container style={{backgroundColor: "#eaecee"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Aviso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{valores.msg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>{cerrar()}} >Cerrar</Button>
                </Modal.Footer>

            </Container>
        </Modal>
    )
}

export default ModalAlerta
