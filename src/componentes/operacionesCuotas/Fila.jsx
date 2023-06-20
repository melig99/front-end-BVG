import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash} from "react-icons/cg";

const  Fila = (prop) => {
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const {dato,eliminar} = prop;
    return (
        <tr key={`filaSA-${dato.id}`}>
            <td>{dato.caja_descripcion }</td>
            <td>{dato.concepto_caja}</td>
            <td>{addCommas(dato.monto)}</td>
            <td>{dato.fecha_operacion.split('-')[2]+"/"+dato.fecha_operacion.split('-')[1]+"/"+dato.fecha_operacion.split('-')[0]}</td>
            <td>{dato.solicitud_id}</td>
            <td>{dato.nombre_usuario}</td>
            { (prop.eliminar && <td><button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}><CgTrash style={{color:'white'}} className='m-2 item'/></button></td>) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila
