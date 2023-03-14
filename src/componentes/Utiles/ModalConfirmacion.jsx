import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'

const ModalConfirmacion  = ({estadoModal,mensaje,callback}) => {
    const [estado,setEstadoModal] = useState(estadoModal);


    return (
        <Modal show={estado} size="sm" animation={false} onHide={()=>setEstadoModal(!estado)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{mensaje}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setEstadoModal(!estado)} >Cerrar</Button>
                <Button variant="success" onClick={()=>{callback();setEstadoModal(!estado)}} >Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmacion
