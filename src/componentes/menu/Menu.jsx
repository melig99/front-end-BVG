import React, { useState, useEffect }  from 'react'
import Card from 'react-bootstrap/Card'
import {Col,Container,Row} from 'react-bootstrap';
import OpcionMenu from './OpcionMenu'


const Menu = () => {
    //CONSTANTE PARA MENU DE CLIENTES
    let tempCliente = {
        "cod":"00",
        "msg":"aprobado",
        "datos":[
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
                "direccion":"test3"
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
                        listaOpciones.datos.map((valor,i)=>{
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
