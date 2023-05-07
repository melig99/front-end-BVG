import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash,CgPen} from "react-icons/cg";

const  Fila = (prop) => {
    const {dato,eliminar,ver} = prop;
    return (
        <tr>
            <td>{dato.nombre +" "+ dato.apellido}</td>
            <td>{dato.cedula}</td>
            <td>{dato.email}</td>
            <td>{dato.nombre_usuario}</td>
            <td>{dato.descripcion}</td>
            { (prop.eliminar && <td>
                                    <button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}>
                                        <CgTrash style={{color:'white'}} className='m-2 item'/>
                                    </button>
            { (prop.ver && <button onClick={()=>{ver(dato.id)}} style={{backgroundColor: "#0b5ed7", border: "solid 1px white"}}>
                                <CgPen style={{color:'white'}} className='m-2 item'/>
                            </button>   
            ) }                       
                                </td>
            ) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila
