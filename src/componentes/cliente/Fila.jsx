import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash} from "react-icons/cg";


const  Fila = (prop) => {
    const {dato,eliminar} = prop;
    return (
        <tr>
            <td>{dato.nombre}</td>
            <td>{dato.apellido}</td>
            <td>{dato.documento}</td>
            <td>{dato.correo}</td>
            <td>{dato.f_nacimiento}</td>
            { (prop.eliminar && <td><button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}>
                                        <CgTrash style={{color:'white'}} className='m-2 item'/>
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
