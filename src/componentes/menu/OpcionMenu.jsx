import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import {useNavigate,Link} from "react-router-dom"
import image from "../../assets/estatico.png";

const OpcionMenu = ({titulo,imagen,direccion}) => {
    let navigate = useNavigate()
    return (
        <Link to={`/home/${direccion}`} >
            <Card style={{ width: '10rem' }} onClick={() => {navigate({direccion}); console.log("clickeado")}}>
                <div style={{padding:"10px",width:"80%",display:"flex"}} class="container">
                    <Card.Img variant="top" src={imagen} />
                </div>
                <Card.Body>
                    <hr/>
                    <Card.Title>{titulo}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default OpcionMenu;
