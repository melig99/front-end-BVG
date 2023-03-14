import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash} from "react-icons/cg";

const  Fila = (prop) => {
    const {dato,eliminar} = prop;
    return (
        <tr>
            <td>{dato.descripcion}</td>
            <td>{dato.factor_divisor}</td>
            <td>{dato.dias_vencimiento}</td>
            <td>{dato.interes}</td>
            { (prop.eliminar && <td><button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}><CgTrash style={{color:'white'}} className='m-2 item'/></button></td>) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila