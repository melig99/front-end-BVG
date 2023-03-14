import React, { useState, useEffect }  from 'react'
import Card from 'react-bootstrap/Card'
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
                        "direccion":"clientes"
                    },
                    {
                        "titulo":"Perfil Cliente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"test2"
                    },
                    {
                        "titulo":"Barrio", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"barrios"
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
                        "titulo":"Solitud Analasis", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"test2"
                    },
                    {
                        "titulo":"Solicitud Angente", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"barrios"
                    },
                    {
                        "titulo":"Solicitud Directorio", // TITULO DE TARJETA
                        "imagen":"4.jpeg", //URL
                        "direccion":"barrios"
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
