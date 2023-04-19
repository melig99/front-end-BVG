import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'

const ModalConfirmacion  = ({valores}) => {
    const [estado,setEstadoModal] = useState(true);

    useEffect(()=>{
        // console.log(valores);
        setEstadoModal(valores.estado);
    },[valores]);
    const cerrar = ()=>{
        setEstadoModal(false);
        valores.estado = false
    }

    return (
        <Modal show={estado} size="sm" animation={false} onHide={()=>{cerrar()}}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{valores.msg}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{cerrar()}} >Cerrar</Button>
                <Button variant="success" onClick={()=>{valores.callback();cerrar()}} >Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmacion
