import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import {Col,Container,Row,Modal,Button} from 'react-bootstrap'

const ModalAlerta = ({mensaje}) => {
    const [estado,setEstadoModal] = useState(true);

    return (
        <Modal show={estado} size="sm" animation={false} onHide={()=>{setEstadoModal(false);console.log(estado)}}>
            <Modal.Header closeButton>
                <Modal.Title>Aviso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{mensaje}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={()=>{setEstadoModal(false);console.log(estado)}} >Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAlerta
