import React, { useState, useEffect }  from 'react'
import {Col,Container,Row} from 'react-bootstrap';
import OpcionMenu from './OpcionMenu'
import localBD from '../../helpers/localBD';
import { useParams } from 'react-router';

const Menu = () => {
    const {obtenerMenu} = localBD();
    const params= useParams()
    let tempCliente =obtenerMenu()
     console.log(tempCliente)


    const [listaOpciones,setListaOpciones] = useState([]);
    const [opcionesMenu,setOpcionesMenu] = useState([]);

    useEffect(()=>{
        tempCliente = obtenerMenu();
        let opciones = tempCliente.find((fila)=>{ return (fila.id == params.id) }) 
        console.log(opciones, params.id ,tempCliente[0] )
        setOpcionesMenu(opciones.opciones)
        setListaOpciones(tempCliente);
    },[]);

    return (
        <>
            <Container>
                <Row>
                {
                        // listaOpciones.datos[params.id-1].opciones.map((valor,i)=>{
                            opcionesMenu.map((valor,i)=>{
                            return(
                            <Col lg={2} key={`col-${valor.id}`} >
                                <OpcionMenu key={`card-${valor.id}`} titulo={valor.descripcion} imagen={valor.dir_imagen} direccion={valor.direccion}/>
                            </Col>)
                        })
                    }
                </Row>
            </Container>

        </>
    )
}

export default Menu

//CONSTANTE PARA MENU DE CLIENTES
// let tempCliente = [
//         {
//             "descripcion": "Clientes",
//             "opciones":[
//                 {
//                     "id":"1",
//                     "descripcion":"Clientes", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"cliente"
//                 },
//                 {
//                     "id":"2",
//                     "descripcion":"Perfil Cliente", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"perfilCliente"
//                 },
//                 {
//                     "id":"3",
//                     "descripcion":"Barrio", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"barrio"
//                 },
//             ]
//         },
//         {
//             "descripcion": "Credito",
//             "opciones":[
//                 {
//                     "id":"4",
//                     "descripcion":"Tipo Plazo", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"tipoPlazo"
//                 },
//                 {
//                     "id":"6",
//                     "descripcion":"Solicitud Agente", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"solicitudAgente"
//                 },
//                 {
//                     "id":"5",
//                     "descripcion":"Solitud Analisis", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"solicitudAnalista"
//                 },
//                 {
//                     "id":"7",
//                     "descripcion":"Solicitud Directorio", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"solicitudDirectorio"
//                 },
//
//             ]
//         },
//         {
//             "descripcion": "Caja",
//             "opciones":[
//                 {
//                     "id":"8",
//                     "descripcion":"Conceptos", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"conceptosCaja"
//                 },
//                 {
//                     "id":"9",
//                     "descripcion":"Cajas", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"caja"
//                 },
//                 {
//                     "id":"10",
//                     "descripcion":"Movimientos", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"operacion"
//                 },
//
//             ]
//         },
//         {   "descripcion": "Seguridad",
//             "opciones":[
//                 {
//                     "id":"11",
//                     "descripcion":"Usuarios", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"usuario"
//                 },
//                 {
//                     "id":"12",
//                     "descripcion":"Perfiles", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"perfil"
//                 },
//                 {
//                     "id":"13",
//                     "descripcion":"Agrupadores", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"agrupador"
//                 },
//                 {
//                     "id":"14",
//                     "descripcion":"Opciones de Menu", // TITULO DE TARJETA
//                     "dir_imagen":"4.jpeg", //URL
//                     "direccion":"opcionMenu"
//                 },
//
//             ]
//         },
//     ]
