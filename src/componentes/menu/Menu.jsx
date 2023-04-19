import React, { useState, useEffect }  from 'react'
import {Col,Container,Row} from 'react-bootstrap';
import OpcionMenu from './OpcionMenu'
import { useParams } from 'react-router';

const Menu = () => {
    const params= useParams()
    // console.log(params)
    //CONSTANTE PARA MENU DE CLIENTES
    let tempCliente = {
        "cod":"00",
        "msg":"aprobado",
        "datos":[
            {
                "agrupador": "Clientes",
                "opciones":[
                    {
                        "id":"1",
                        "titulo":"Clientes", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"cliente"
                    },
                    {
                        "id":"2",
                        "titulo":"Perfil Cliente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"perfilCliente"
                    },
                    {
                        "id":"3",
                        "titulo":"Barrio", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"barrio"
                    },

                ]
            },
            {
                "agrupador": "Credito",
                "opciones":[
                    {
                        "id":"4",
                        "titulo":"Tipo Plazo", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"tipoPlazo"
                    },
                    {
                        "id":"5",
                        "titulo":"Solitud Analisis", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudAnalista"
                    },
                    {
                        "id":"6",
                        "titulo":"Solicitud Agente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudAgente"
                    },
                    {
                        "id":"7",
                        "titulo":"Solicitud Directorio", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudDirectorio"
                    },

                ]
            },
            {
                "agrupador": "Caja",
                "opciones":[
                    {
                        "id":"8",
                        "titulo":"Conceptos", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"conceptosCaja"
                    },
                    {
                        "id":"9",
                        "titulo":"Cajas", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"caja"
                    },
                    {
                        "id":"10",
                        "titulo":"Movimientos", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"operacion"
                    },

                ]
            },
        ]
    }
    const [listaOpciones,setListaOpciones] = useState(tempCliente);

    useEffect(()=>{
        setListaOpciones(tempCliente);
        console.log(listaOpciones)
    },[]);

    return (
        <>
            <Container>
                <Row>
                    {
                        listaOpciones.datos[params.id-1].opciones.map((valor,i)=>{
                            return(
                            <Col lg={2} key={`col-${valor.id}`} >
                                <OpcionMenu key={`card-${valor.id}`} titulo={valor.titulo} imagen={valor.imagen} direccion={valor.direccion}/>
                            </Col>)
                        })
                    }
                </Row>
            </Container>

        </>
    )
}

export default Menu
