import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import {useNavigate,Link} from "react-router-dom"
import image from "../../assets/estatico.png";

const OpcionMenu = ({titulo,imagen,direccion}) => {
    let navigate = useNavigate()
    console.log(direccion,"test");
    return (
        <Link to={`/home/${direccion}`} >
            <Card style={{ width: '10rem' }} onClick={() => {navigate({direccion});console.log("clickeado")}}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{titulo}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default OpcionMenu;
