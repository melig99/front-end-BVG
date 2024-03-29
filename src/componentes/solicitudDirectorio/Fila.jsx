import React from 'react'
import PropTypes from 'prop-types'
import {CgEyeAlt } from "react-icons/cg";

const  Fila = (prop) => {
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const {dato,ver} = prop;
    return (
        <tr>
            <td>{dato.nombre +" "+ dato.apellido}</td>
            <td>{addCommas(dato.ingresos_actuales)}</td>
            <td>{addCommas(dato.monto_credito)}</td>
            <td>{dato.interes}</td>
            { (prop.ver && <td>
                <button onClick={()=>{ver(dato.id)}} style={{backgroundColor: "#0b5ed7", border: "solid 1px white"}}>
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
