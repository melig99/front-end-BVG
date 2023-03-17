import React, { useState, useEffect }  from 'react'
import {Col,Container,Row} from 'react-bootstrap';
import OpcionMenu from './OpcionMenu'
import { useParams } from 'react-router';

const Menu = () => {
    const params= useParams()
    console.log(params)
    //CONSTANTE PARA MENU DE CLIENTES
    let tempCliente = {
        "cod":"00",
        "msg":"aprobado",
        "datos":[
            {
                "agrupador": "Clientes",
                "opciones":[
                    {
                        "titulo":"Clientes", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"cliente"
                    },
                    {
                        "titulo":"Perfil Cliente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"perfilCliente"
                    },
                    {
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
                        "titulo":"Tipo Plazo", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"tipoPlazo"
                    },
                    {
                        "titulo":"Solitud Analisis", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudAnalista"
                    },
                    {
                        "titulo":"Solicitud Agente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudAgente"
                    },
                    {
                        "titulo":"Solicitud Directorio", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"solicitudDirectorio"
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
                            <Col lg={2}>
                                <OpcionMenu titulo={valor.titulo} imagen={valor.imagen} direccion={valor.direccion}/>
                            </Col>)
                        })
                    }
                </Row>
            </Container>

        </>
    )
}

export default Menu
