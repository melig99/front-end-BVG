import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash} from "react-icons/cg";

const  Fila = (prop) => {
    const {dato,eliminar} = prop;
    return (
        <tr key={`filaSA-${dato.id}`}>
            <td>{dato.nombre +" "+ dato.apellido}</td>
            <td>{dato.ingresos_actuales}</td>
            <td>{dato.monto_credito}</td>
            <td>{dato.interes}</td>
            { (prop.eliminar && <td><button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}><CgTrash style={{color:'white'}} className='m-2 item'/></button></td>) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila
