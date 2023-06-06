import React from 'react'
import PropTypes from 'prop-types'
import {CgEyeAlt } from "react-icons/cg";

const  Fila = (prop) => {
    const {dato,ver} = prop;
    return (
        <tr>
            <td>{dato.nombre}</td>
            <td>{dato.apellido}</td>
            <td>{dato.documento}</td>
            <td>{dato.correo}</td>
            <td>{dato.f_nacimiento.split('-')[2]+"/"+dato.f_nacimiento.split('-')[1]+"/"+dato.f_nacimiento.split('-')[0]}</td>
            { (prop.ver && <td><button onClick={()=>{ver(dato.id)}} style={{backgroundColor: "#0b5ed7", border: "solid 1px white"}}>
                                 <CgEyeAlt style={{color:'white'}} className='m-2 item'/>
                                </button>
                            </td>
            ) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila
